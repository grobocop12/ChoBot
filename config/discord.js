const joi = require("joi");
require("dotenv").config();

const schema = joi
  .object()
  .keys({
    DISCORD_TOKEN: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  token: envVars.DISCORD_TOKEN,
  streamAddress: envVars.STREAM_ADDRESS
};
