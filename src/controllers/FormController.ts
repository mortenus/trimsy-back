import express from 'express';
import { FormModel } from '../Models';

require('dotenv').config();

class FormController {
  submit(req: express.Request, res: express.Response) {
    const postData = {
      fullname: req.body.fullname,
      email: req.body.email,
      text: req.body.description,
    };

    const form = new FormModel(postData);

    form
      .save()
      .then((obj: any) => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: 'morten.mathers@gmail.com', // Change to your recipient
          from: 'support@trimsy.org', // Change to your verified sender
          subject: `${obj.fullname} - New Application. Trimsy Careers`,
          text: `New Application form has been received from Trimsy Careers!:
          Info:
          FullName: ${obj.fullname}
          Email: ${obj.email}
          Text: ${obj.text}`,
          html: `<p>New Application form has been received from Trimsy Careers!:</p><br />
          <span>FullName: ${obj.fullname}</span><br />
          <span>Email: ${obj.email}</span><br />
          <span>Text: ${obj.text}</span>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
          })
          .catch((error: any) => {
            console.error(error);
          });
        res.json(obj);
      })
      .catch((reason: any) => {
        res.json(reason);
      });
  }
}

export default FormController;
