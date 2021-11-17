import * as Koa from "koa";
import * as json from "koa-json";
import * as Router from "koa-router"
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import * as jwt from "koa-jwt"
const morgan = require('morgan')
const fs = require('fs')
const {login} = require("./controllers/login");
const {logout} = require("./controllers/logout");
const {refreshToken} = require("./controllers/refreshToken");
const {register} = require("./controllers/register");
const {verifyAccessToken} = require("./Helpers/jwt_helpers")
require("./Helpers/init_mongodb")

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = new Koa();
const router = new Router();

// JSON PRETTIER MIDDLEWARE
app.use(json());
// BODY PARSER MIDDLEWARE
app.use(bodyParser());
// CORS POLIDY MIDDLEWARE
app.use(cors());
// ROUTE MIDDLEWARE
app.use(router.routes()).use(router.allowedMethods());
// JWT MIDDLEWARE
app.use(jwt({
  secret : process.env.ACCESS_TOKEN_SECRET
}).unless({
  path:["/\/"]
}))

router.get('/', async (ctx:Koa.Context) => {
  console.log("getFunction",ctx.request.header.authorization)
  ctx.response.body = {
    temp : "success",
  }
})
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/refresh-token" , refreshToken);
router.delete("/auth/logout" , logout);


app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

module.exports = {
    router
}