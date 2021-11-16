import * as Koa from "koa";
import * as json from "koa-json";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";

const port: number = 5000;
const app = new Koa();
const router = new Router();

const things = [{ name: "Football" }, { name: "Cricket" }];
// JSON PRETTIER MIDDLEWARE
app.use(json());
// BODY PARSER MIDDLEWARE
app.use(bodyParser());
// CORS POLIDY MIDDLEWARE
app.use(cors());

// SIMPLE MIDDLEWARE IF NO ROUTE IS DEFINED
// app.use(async ctx => (ctx.body = {msg:"Hello world"} ));

router.get("/", index);
router.post("/add", add);

async function index(ctx: any) {
  ctx.body = {
    message: "hello Response",
  };
}

// Add thing
async function add(ctx: any) {
  const task = await ctx.request.body.name;
  things.push({name:task});
  ctx.body = {
      data : things
  }
}

// Get thing

// ROUTER MIDDLEWARE
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log("Server started..."));
