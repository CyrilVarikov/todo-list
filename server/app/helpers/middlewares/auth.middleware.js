import jwt from 'express-jwt';

export const auth = jwt({
  secret: process.env.JWT_KEY,
  userProperty: 'payload'
});