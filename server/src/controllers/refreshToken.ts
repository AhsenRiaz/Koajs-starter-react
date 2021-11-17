import { Context } from "koa";
import * as createError from "http-errors"
const {verifyRefreshToken , signRefreshToken, signAccessToken  } = require("../Helpers/jwt_helpers")
const refreshToken = async (ctx:Context) => {
  try {
    const {refreshToken} =  ctx.request.body;
    if(!refreshToken)  throw new createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId)
    ctx.response.body = {
      accessToken,
      refreshToken : refToken 
    }

  } catch (error) {
    console.log(error)

  }
};


module.exports = {refreshToken}