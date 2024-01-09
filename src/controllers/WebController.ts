import express from 'express';
import { WebModel } from '../Models';

require('dotenv').config();

interface IOrder {
  productType: string;
  purpose: string;
  seo: string;
}

interface TValues {
  fullname: string;
  email: string;
  //   description: string;
  order: IOrder;
  ip: string | string[] | undefined;
  userAgent: string | undefined;
}

class FormController {
  submit(req: express.Request, res: express.Response) {
    const userIp = req.ip || req.headers['x-forwarded-for'];

    const userAgent = req.headers['user-agent'];

    const postData: TValues = {
      fullname: req.body.fullname,
      email: req.body.email,
      order: {
        productType: req.body.order.productType,
        purpose: req.body.order.purpose,
        seo: req.body.order.seo,
      },
      ip: userIp,
      userAgent,
    };

    const form = new WebModel(postData);

    form
      .save()
      .then((obj: any) => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: 'morten.mathers@gmail.com', // Change to your recipient
          from: 'support@trimsy.org', // Change to your verified sender
          subject: `${obj.fullname} - New Application. Trimsy Web`,
          text: `New Application form has been received from Trimsy Web!:
          Info:
          FullName: ${obj.fullname}
          Email: ${obj.email}
          Order: {
              Product Type: ${obj.order.productType},
              Purpose: ${obj.order.purpose},
              SEO: ${obj.order.seo}
          }
          IP Address: ${obj.ip}
          User Agent: ${obj.userAgent}`,
          html: `<p>New Application form has been received from Trimsy Web!:</p><br />
          <span>FullName: ${obj.fullname}</span><br />
          <span>Email: ${obj.email}</span><br />
          <span>Order: {
            <span>Product Type: ${obj.order.productType}</span>,
            <span>Purpose: ${obj.order.purpose}</span>,
            <span>SEO: ${obj.order.seo}</span>
            }
        </span><br />
          <span>IP Address: ${obj.ip}</span><br />
          <span>User Agent: ${obj.userAgent}</span>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
          })
          .catch((error: any) => {
            console.error(error);
          });

        res.json({ message: 'success' });
      })
      .catch((reason: any) => {
        res.status(400).json(reason);
      });
  }
}

export default FormController;
