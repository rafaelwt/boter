const fs = require("fs");
const axios = require("axios");

const token = "";
const getFile = (ctx, urlpath, subType) => {
  axios
    .get(urlpath)
    .then(function (response) {
      // handle success
      console.log("urlpath response", response.data);
      if (response.data) {
        const { ok, result } = response.data;
        if (ok == true) {
          const { file_path } = result;

          const urlFile = `https://api.telegram.org/file/bot${token}/${file_path}`;
          // Guardar imagen
          axios({
            method: "get",
            url: urlFile,
            responseType: "stream",
          }).then(async function (response) {
            await response.data.pipe(fs.createWriteStream(`file/${file_path}`));

            // TODO: enviar whatsapp
            // const mensaje = `${ctx.from.first_name} ha enviado una publicacion`;

            const urlFileLocal = `http://localhost:3001/${file_path}`;
            // urlImagen = `http://localhost:3001/photos/file_12.jpg`;
            enviarWhatsapp(urlFileLocal, subType);
          });
        } else {
          ctx.reply("No se encontro el archivo");
        }
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

const enviarWhatsapp = (message, subType) => {
  let method = "";
  switch (subType) {
    case "photo":
      method = "sendImage";
      break;
    case "text":
      method = "sendText";
      break;
    case "video":
      method = "sendFile";
      break;

    default:
      break;
  }
  if (method.length > 0) {
    // http://localhost:3000/sendImage
    const url = `http://localhost:3000/${method}`;
    axios
      .post(url, {
        args: ["591xxxxxxxx-xxxxxxxxxx@g.us", message],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // Grupo 2

    axios
      .post(url, {
        args: ["591xxxxxxxx-xxxxxxxxxx@g.us", message],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

module.exports = {
  getFile: getFile,
  enviarWhatsapp,
};
