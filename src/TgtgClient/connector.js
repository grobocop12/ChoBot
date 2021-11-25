/* eslint-disable no-await-in-loop */
const axios = require("axios").default;
const { getItemsConfig } = require("../../config/config");

const headers = {
  "User-Agent":
    "TGTG/21.9.3 Dalvik/2.1.0 (Linux; U; Android 6.0.1; Nexus 5 Build/M4B30Z)",
  "Content-Type": "application/json",
};

const ENDPOINTS = {
  GET_ITEM: "/item/v7/",
  SIGNUP_BY_MAIL: "auth/v2/signUpByEmail",
  LOGIN: "auth/v2/loginByEmail",
  AUTH_BY_EMAIL: "auth/v3/authByEmail",
  AUTH_POLLING: "auth/v3/authByRequestPollingId",
};

const axiosInstance = axios.create({
  baseURL: "https://apptoogoodtogo.com/api",
  timeout: 1000,
  headers,
});

class TgtgConnector {
  constructor(user) {
    this.user = user;
    this.pollingId = "e738f31b-0b56-4bf2-8111-b546fcb6aa77";
    this.token =
      "e30.eyJzdWIiOiI2NjcwNzQ1NiIsImV4cCI6MTYzNzc1OTk4NiwidCI6IjJ3MHVpQmlEUjlPclZUMEU4Z1NHNGc6MDoxIn0.G4iBTIsQ7T1v3FAPuBo7jLlaQ-sMrzrwNYmIyb4Pvts";
    this.refreshToken = null;
    this.axios = axiosInstance;
  }

  async loginUser() {
    const payload = {
      email: this.user.email,
      device_type: "ANDROID",
    };

    try {
      const { data: resData } = await this.axios.post(
        ENDPOINTS.AUTH_BY_EMAIL,
        payload
      );
      if (resData.state !== "WAIT")
        throw new Error("Email address is not validated");
      this.pollingId = resData.polling_id;
      await this.pollForAuth();
    } catch (error) {
      console.error(error);
    }
  }

  async pollForAuth() {
    const payload = {
      device_type: "ANDROID",
      email: this.user.email,
      request_polling_id: this.pollingId,
    };
    const pollInterval = 15000;
    let pollCount = 0;

    while (pollCount < 10) {
      try {
        const res = await this.axios.post(ENDPOINTS.AUTH_POLLING, payload);
        if (res.status === 200) {
          this.token = res.data.access_token;
          this.refreshToken = res.data.refresh_token;
          this.user.userId = res.data.startup_data.user.user_id;
          this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
          return;
        }
        if (res.status === 202) {
          console.log("Got 202 :(");
        }
        await new Promise((resolve) => {
          setTimeout(resolve, pollInterval);
        });
        pollCount += 1;
      } catch (error) {
        console.error(error);
      }
    }
    console.error("Polling failed after 10 retries");
  }

  async getItem(id) {
    if (!this.token) await this.loginUser();

    const data = {
      user_id: this.user.userId,
      origin: this.user.origin,
    };

    try {
      const res = await this.axios.post(ENDPOINTS.GET_ITEM + id, data);
      return res.data;
    } catch (error) {
      return console.error(error);
    }
  }

  async getItems() {
    if (!this.token) await this.loginUser();

    const data = {
      user_id: this.user.userId,
      origin: this.user.origin,
      ...getItemsConfig,
    };

    try {
      const res = await this.axios.post(ENDPOINTS.GET_ITEM, data);
      return res.data;
    } catch (error) {
      return console.error(error);
    }
  }

  async addToFavourites(id) {
    if (!this.token) await this.loginUser();

    const data = {
      is_favorite: true,
    };

    try {
      await this.axios.post(`${ENDPOINTS.GET_ITEM + id}/setFavorite`, data);
      return console.log("Successfully added item to favorites.");
    } catch (error) {
      return console.error(error);
    }
  }
}
module.exports = { TgtgConnector };
