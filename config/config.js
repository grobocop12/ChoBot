const joi = require("joi");
require("dotenv").config();

const schema = joi
  .object()
  .keys({
    EMAIL: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const userData = {
  origin: {
    latitude: "50.4433737",
    longitude: "18.8583384",
  },
  email: envVars.EMAIL,
};

const getItemsConfig = {
  radius: 30,
  page_size: 60,
  page: 1,
  discover: false,
  favorites_only: false,
  item_categories: null,
  diet_categories: null,
  pickup_earliest: null,
  pickup_latest: null,
  search_phrase: null,
  with_stock_only: false,
  hidden_only: false,
  we_care_only: false,
};

module.exports = { userData, getItemsConfig };
