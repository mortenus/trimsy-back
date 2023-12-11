import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { AdminModel } from '../Models';
import createJWTToken from '../utils/createJWTToken';

function isValidDepartment(status: string): boolean {
  const validStatusValues = ['development', 'careers'];
  return validStatusValues.includes(status);
}

class AdminController {
  // constructor() {
  //     io.on("connection", function(socket: any) {
  //         socket.on('', function(obj: any) {
  //             ...
  //         })
  //     })
  // }

  //   show = (req: express.Request, res: express.Response) => {
  //     const id: string = req.params.id;
  //     AdminModel.findById(id, (err: any, user: any) => {
  //       if (err) {
  //         return res.status(404).json({
  //           message: 'User not found',
  //         });
  //       }
  //       res.json(user);
  //     });
  //   };

  getMe = (req: any, res: express.Response) => {
    const id: string = req.user._id;
    AdminModel.findById(id, (err: any, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: `User not found ${req.user._id}, ${id}, ${req.user}`,
        });
      }
      res.json(user);
    });
  };

  updateDepartment = (req: any, res: express.Response) => {
    const { department } = req.body;

    const id: string = req.user._id;
    const user = AdminModel.findById(id, (err: any, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: `Wrong user ID, it is recommended to reload the page.`,
        });
      }

      // Validate department
      if (department && !isValidDepartment(department)) {
        return res.status(400).json({ error: 'Invalid department value' });
      }

      // Update departmnet
      user.defaultDepartment = department;

      // Save the updated document
      user.save();

      res.json(user);
    });
  };

  //   findUsers = (req: any, res: express.Response) => {
  //     const query: string = req.query.query;
  //     console.log(query);
  //     AdminModel.find()
  //       .or([{ fullname: new RegExp(query, 'i') }, { email: new RegExp(query, 'i') }])
  //       .then((users: any) => res.json(users))
  //       .catch((err: any) => {
  //         return res.status(404).json({
  //           status: 'error',
  //           message: err,
  //         });
  //       });
  //   };

  delete = (req: express.Request, res: express.Response) => {
    const adminPass = req.body.admin;

    if (!adminPass || adminPass !== process.env.ADMIN) {
      return res.status(422).json({ message: 'Rejected' });
    }

    const id: string = req.params.id;
    AdminModel.findOneAndRemove({ _id: id })
      .then((user) => {
        if (user) {
          res.json({
            message: `User ${user.fullname} deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: `User not found`,
        });
      });
  };

  create = (req: express.Request, res: express.Response) => {
    const adminPass = req.body.admin;

    if (!adminPass || adminPass !== process.env.ADMIN) {
      return res.status(422).json({ message: 'Rejected' });
    }

    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      imageUrl: req.body.imageUrl,
      companyPosition: req.body.companyPosition,
      defaultDepartment: req.body?.defaultDepartment,
      password: req.body.password,
    };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const admin = new AdminModel(postData);

    admin
      .save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((reason) => {
        res.status(500).json({
          status: 'error',
          message: reason,
        });
      });
  };

  //   verify = (req: express.Request, res: express.Response) => {
  //     const hash = req.query.hash;

  //     if (!hash) {
  //       return res.status(422).json({ errors: 'Invalid hash' });
  //     }

  //     AdminModel.findOne({ confirm_hash: hash }, (err: any, admin: any) => {
  //       if (err || !admin) {
  //         return res.status(404).json({
  //           status: 'error',
  //           message: 'Hash not found',
  //         });
  //       }

  //       admin.confirmed = true;
  //       admin.save((err: any) => {
  //         if (err) {
  //           return res.status(404).json({
  //             status: 'error',
  //             message: err,
  //           });
  //         }

  //         res.json({
  //           status: 'success',
  //           message: 'Account successfully confirmed',
  //         });
  //       });
  //     });
  //   };

  login = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    AdminModel.findOne({ email: postData.email }, (err: any, admin: any) => {
      if (err || !admin) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      if (bcrypt.compareSync(postData.password, admin.password)) {
        const token = createJWTToken(admin);

        return res.json({
          status: 'success',
          token,
        });
      } else {
        return res.status(403).json({
          status: 'error',
          message: 'Incorrect password or email',
        });
      }
    });
  };
}

export default AdminController;
