import express from 'express';
import { FormModel } from '../Models';

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
        res.json(obj);
      })
      .catch((reason: any) => {
        res.json(reason);
      });
  }
}

export default FormController;
