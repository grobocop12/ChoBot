const joi = require("joi");
require("dotenv").config();

const schema = joi
  .object()
  .keys({
    DISCORD_TOKEN: joi.string().required(),
    GUILD_ID: joi.string().required(),
    CLIENT_ID: joi.string().required(),
    DEV_GUILD_ID: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  token: envVars.DISCORD_TOKEN,
  clientId: envVars.CLIENT_ID,
  guildId: envVars.GUILD_ID,
  devGuildId: envVars.DEV_GUILD_ID,
};
