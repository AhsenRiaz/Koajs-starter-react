import { Context } from "koa";
import * as createError from "http-errors";
import { User } from "../Models/User.models";
const {signAccessToken , signRefreshToken } = require("../Helpers/jwt_helpers") 


const login = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new createError.NotFound("User not registered");
    // const isMatch = await user.isValidPassword(password);
    const accessToken = await signAccessToken(user.id)
    const refreshToken = await signRefreshToken(user.id)
    ctx.response.body = {
      accessToken,
      refreshToken
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login };
