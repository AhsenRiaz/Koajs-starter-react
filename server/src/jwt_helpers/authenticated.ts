import JWT = require("jsonwebtoken");
import * as createErrors from "http-errors";
import { Context } from "koa";

module.exports = async (ctx , next) => {
  if(!ctx.headers.authorization) ctx.throw(403 , "no token");
  console.log("token available" , ctx.headers.authorization);
  const token = ctx.headers.authorization.split(' ')[1];

  try {
    ctx.request.jwtPayload = JWT.verify(token , process.env.ACCESS_TOKEN_SECRET);
    console.log('verified token');
  }
  catch(err){
    ctx.throw(err.status || 403 , err.text);
  }
  await next();

}



import * as Koa from "koa";
// import * as json from "koa-json";
// import * as Router from "koa-router";
// import * as bodyParser from "koa-bodyparser";
// import * as cors from "@koa/cors";
// import * as jwtVerify from "koa-jwt";
// import * as JWT from "jsonwebtoken";
// const authenticated = require("./jwt_helpers/authenticated");
// import { Context } from "koa";
// require("dotenv").config();

// const port = process.env.PORT || 5000;
// const app = new Koa();
// const router = new Router();

// // JWT MIDDLEWARE
// app.use(
//   jwtVerify({
//     secret: process.env.ACCESS_TOKEN_SECRET,
//   }).unless({
//     path: ["/", "/api/login", "/api/refresh"],
//   })
// );
// // JSON PRETTIER MIDDLEWARE
// app.use(json());
// // BODY PARSER MIDDLEWARE
// app.use(bodyParser());
// // CORS POLIDY MIDDLEWARE
// app.use(cors());
// // ROUTE MIDDLEWARE
// app.use(router.routes()).use(router.allowedMethods());

// router.get("/", async (ctx: Koa.Context) => {
//   ctx.response.body = {
//     temp: "success",
//   };
// });

// const users = [
//   {
//     id: "1",
//     username: "john",
//     password: "John0908",
//     isAdmin: true,
//   },
//   {
//     id: "2",
//     username: "jane",
//     password: "Jane0908",
//     isAdmin: false,
//   },
// ];

// let refreshTokens = [];

// router.post("/api/refresh", (ctx: Context) => {
//   //take the refresh token from the user
//   const refreshToken = ctx.request.body.token;

//   //send error if there is no token or it's invalid
//   if (!refreshToken) return ctx.throw(401 , "You are nto authenticated");
//   if (!refreshTokens.includes(refreshToken)) {
//     return ctx.throw(403,'Refresh token is not valid')
//   }
//   JWT.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
//     err && console.log(err);
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);

//     refreshTokens.push(newRefreshToken);

//     ctx.response.body = {
//       accessToken : newAccessToken,
//       refreshToken : newRefreshToken
//     }
//   });

//   //if everything is ok, create new access token, refresh token and send to user
// });

// const generateAccessToken = (user) => {
//   return JWT.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
//     expiresIn: "5s",
//   });
// };

// const generateRefreshToken = (user) => {
//   return JWT.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
// };

// router.post("/api/login", (ctx: Context) => {
//   const { username, password } = ctx.request.body;
//   const user = users.find((u) => {
//     return u.username === username && u.password === password;
//   });
//   if (user) {
//     //Generate an access token
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);
//     refreshTokens.push(refreshToken);
//     // res.json({
//     //   username: user.username,
//     //   isAdmin: user.isAdmin,
//     //   accessToken,
//     //   refreshToken,
//     // });
//     ctx.response.body = {
//       username : user.username,
//       isAdmin : user.isAdmin,
//       accessToken,
//       refreshToken
//     }
//   } else {
//     ctx.throw(403, "Username or password incorrect!");

//   }
// });

// const verify = (ctx: Context, next) => {
//   const authHeader = ctx.request.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     JWT.verify(token, "mySecretKey", (err, user) => {
//       if (err) {
//         ctx.throw(403, "Token is not valid!");

//       }

//       ctx.request.user = user;
//       next();
//     });
//   } else {
//     ctx.throw(200, "You are not authenticated!");
//   }
// };

// router.delete("/api/users/:userId", verify, (ctx: Context) => {
//   if (
//     ctx.request.user.id === ctx.request.params.userId ||
//     ctx.request.user.isAdmin
//   ) {
//     ctx.throw(200, "User has been deleted.");
//   } else {
//     ctx.throw(403, "You are not allowed to delete this user!");
//   }
// });

// router.post("/api/logout", verify, (ctx: Context) => {
//   const refreshToken = ctx.request.body.token;
//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//   ctx.throw(200, "You logged out of successfully");
// });

// app.listen(port, () => console.log(`Server started on port ${port}`));

// module.exports = {
//   router,
// };


      
        
// const urlParamsId = ctx.url.slice(11);
// const { username, password, id, isAdmin } = ctx.request.body;
// const payload = ctx.request.jwtPayload;