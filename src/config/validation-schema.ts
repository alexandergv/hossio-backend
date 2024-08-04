// src/config/validation-schema.ts

import * as Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET_KEY: Joi.string().required(),
  MONGODB_URI: Joi.string().uri().required(),
});
