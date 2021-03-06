'use strict';

import express from 'express';

const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
import oauth from './lib/oauth.js';

// These routes should support a redirect instead of just spitting out the token ...
authRouter.post('/signup', (req, res, next) => {
  res.send('POST SIGNUP');
  // let user = new User(req.body);
  // user.save()
  //   .then((user) => {
  //     req.token = user.generateToken();
  //     req.user = user;
  //     res.cookie('auth', req.token);
  //     res.send(req.token);
  //   }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

// Added a route to handle the oauth route
authRouter.get('/oauth', (req, res, next) => {
  console.log('OAUTHHHHHHH');
  oauth.authorize(req)
    .then(token => {
      res.send(token);
    })
    .catch(next);


});

authRouter.get('/oauth', (req, res, next) => {
  oauth.authorize(req)
    .then((token) => {
      res.cookie('auth', token);
      res.send(token);
    })
    .catch(next);
});

export default authRouter;
