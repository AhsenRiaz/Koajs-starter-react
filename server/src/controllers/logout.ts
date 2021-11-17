import { Context } from "koa"

const logout = async (ctx:Context) => {
    try {
      ctx.response.body = "logout func"
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {logout}