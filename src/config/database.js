const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    })

    .then(() => {
      console.log("Conectado com sucesso ao bando de dados MongoDB ");
    })
    .catch((error) => {
      return console.error(
        `Erro ao conectar ao banco de dados MongoDB: ${error}`
      );
    });
}

module.exports = connectToDatabase;
