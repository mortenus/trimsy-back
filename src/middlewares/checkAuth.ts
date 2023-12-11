import express from 'express';

const checkAuth = (req: any, res: any, next: any) => {
  console.log(req.path);
  if (
    req.path === '/form' ||
    req.path === '/careers' ||
    req.path === '/blog/search' ||
    req.path === '/auth/*'
  ) {
    return next();
  }
  return next();

  return res.status(401).json({
    message: 'Unauthorized access',
  });
};

export default checkAuth;
