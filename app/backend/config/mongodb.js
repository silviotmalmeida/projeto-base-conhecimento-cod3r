// arquivo para conexão com o mongodb através do mongoose

// importando o mongoose
const mongoose = require("mongoose");

// carregando os dados do objeto dbMongo do arquivo .env
const { dbMongo } = require("../.env");

// conectando ao mongodb
mongoose
  // realizando a conexão com os dados do .env
  .connect(`mongodb://${dbMongo.host}:${dbMongo.port}/${dbMongo.database}`, {
    useNewUrlParser: true,
  })

  // em caso de insucesso:
  .catch((e) => {
    // envia uma mensagem de erro pelo console, estilizada com o fundo vermelho
    const msg = "ERRO! Não foi possível conectar com o MongoDB!";
    console.log("\x1b[41m%s\x1b[37m", msg, "\x1b[0m");
  });
