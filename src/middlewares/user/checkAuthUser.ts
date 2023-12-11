import express from 'express';
import verifyJWTToken from '../../utils/verifyJWTToken';

const checkAuth = (req: any, res: any, next: any) => {
  const token = req.headers.token;

  verifyJWTToken(token)
    .then((user: any) => {
      req.user = user.data._doc;
      //   console.log(user.data._doc);
      next();
    })
    .catch(() => {
      res.status(403).json({
        message: 'Invalid auth token provided.',
      });
    });
};

export default checkAuth;
