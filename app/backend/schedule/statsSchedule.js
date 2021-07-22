// agendador responsável pela integração entre os dados do postgresql e mongodb
// provê a inserção de dados de estatísticas no mongodb a partir dos dados do postgresql
// sincroniza estes dados de 1 em 1 minuto

// importando o agendador
const schedule = require("node-schedule");

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // configurando o agendador para rodar a cada 1 minuto
  schedule.scheduleJob("*/1 * * * *", async function () {
    // consultando o somatório dos usuários cadastrados
    // iniciando processamento síncrono
    const usersCount = await app

      // consultando na tabela users
      .db("users")

      // realizando o somatório dos registros
      .count("id")

      // retornando somente o primeiro registro
      .first();
    // finalizando processamento síncrono

    // consultando o somatório das categorias cadastradas
    // iniciando processamento síncrono
    const categoriesCount = await app

      // consultando na tabela categories
      .db("categories")

      // realizando o somatório dos registros
      .count("id")

      // retornando somente o primeiro registro
      .first();
    // finalizando processamento síncrono

    // consultando o somatório dos artigos cadastrados
    // iniciando processamento síncrono
    const articlesCount = await app

      // consultando na tabela articles
      .db("articles")

      // realizando o somatório dos registros
      .count("id")

      // retornando somente o primeiro registro
      .first();
    // finalizando processamento síncrono

    // definindo o modelo de objeto de estatísticas
    const { Stat } = app.api.stat;

    // consultando o objeto de estatísticas mais recente do mongodb
    // iniciando processamento síncrono
    const lastStat = await Stat

      // pesquisando objeto mais recente
      .findOne({}, {}, { sort: { createdAt: -1 } });
    // finalizando processamento síncrono

    // criando o novo objeto de estatísticas a ser inserido no mongodb
    const stat = new Stat({
      users: usersCount.count,
      categories: categoriesCount.count,
      articles: articlesCount.count,
      createdAt: new Date(),
    });

    // verificando se houve alguma alteração na contagem de usuários cadastrados
    // retorna true se não houver estatística anterior ou a contagem está diferente da verificação atual
    const changeUsers = !lastStat || stat.users !== lastStat.users;

    // verificando se houve alguma alteração na contagem de categorias cadastradas
    // retorna true se não houver estatística anterior ou a contagem está diferente da verificação atual
    const changeCategories =
      !lastStat || stat.categories !== lastStat.categories;

    // verificando se houve alguma alteração na contagem de artigos cadastrados
    // retorna true se não houver estatística anterior ou a contagem está diferente da verificação atual
    const changeArticles = !lastStat || stat.articles !== lastStat.articles;

    // se não houver estatística anterior ou houver alguma alteração nas contagens:
    if (changeUsers || changeCategories || changeArticles) {
      // insere o novo objeto no mongodb e envia mensagem de sucesso
      stat.save().then(() => console.log("[Stats] Estatíticas atualizadas!"));
    }
  });
};
