import createErrors = require("http-errors");
import { Context } from "koa";
import { User } from "../Models/User.models";
const {signAccessToken , signRefreshToken } = require("../Helpers/jwt_helpers")

const register = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body;
    console.log(email)
    if (!email || !password) {
      throw new createErrors.BadGateway();
    }
    const doesExist = await User.findOne({
      email: email,
      password: password,
    });
    if(doesExist){
        throw new createErrors.Conflict(`${email} is already registered`)
    }

    const user = new User({email , password});
    console.log(user)
    const savedUser = user.save()
    const accessToken = await signAccessToken(savedUser.id)
    const refreshToken = await signRefreshToken(savedUser.id);
    console.log(accessToken)

    ctx.response.body = {
      accessToken,
      refreshToken
    };

  } catch (error) {
    console.log(error);
  }
};

module.exports = { register };
