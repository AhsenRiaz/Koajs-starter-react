import JWT = require("jsonwebtoken");
import * as createErrors from "http-errors";
import { VerifyErrors } from "jsonwebtoken";
module.exports = {
  signAccessToken: async () => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "yourstruly.com",
        audience: "abc",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyAccessToken: async (req, res, next) => {
    console.log("verifyaccess__token");
    if (!req.headers["authorization"])
      return next(new createErrors.Unauthorized());
    console.log("running2");
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    console.log(bearerToken);
    const token = bearerToken[1];
    JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: VerifyErrors, payload) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            return new createErrors.Unauthorized(err.message);
          } else {
            return new createErrors.Unauthorized(err.message);
          }
        }
        req.payload = payload;
        console.log("reqPayload", payload);
      }
    );
  },

  signRefreshToken: async () => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "yourstruly.com",
        audience: "abc",

      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(new createErrors.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyRefreshToken : async (refreshToken) => {
    return new Promise((resolve , reject) => {
      JWT.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET , (err , payload) => {
        if(err) return reject(new createErrors.Unauthorized());
        const userId = payload.id;
        resolve(userId)
        console.log(userId)
      } )
    })
  }
};
