const { Telegraf } = require('telegraf')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
// or


const menuTemplate = new MenuTemplate(ctx => `Hey ${ctx.from.first_name}!`)


menuTemplate.interact('I am excited!', 'a', {
  do: async ctx => ctx.reply('As am I!')
})
const token = "token";
const bot = new Telegraf(token)

const menuMiddleware = new MenuMiddleware('/', menuTemplate)
bot.command('start', ctx => menuMiddleware.replyToContext(ctx))
bot.use(menuMiddleware)

bot.launch()