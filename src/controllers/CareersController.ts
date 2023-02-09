import express from 'express';
import { CareersModel } from '../Models';

class FormController {
  submit(req: express.Request, res: express.Response) {
    const postData = {
      fullname: req.body.fullname,
      email: req.body.email,
      type: req.body.type,
    };

    const careers = new CareersModel(postData);

    careers
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
