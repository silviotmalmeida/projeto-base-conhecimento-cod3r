// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // definindo o modelo de objeto de estatísticas
  const Stat = app.mongoose.model("Stat", {
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date,
  });

  // método para obtenção das estatísticas mais recentes
  const get = (req, res) => {
    // utilizando o modelo definido
    Stat
      // pesquisando objeto mais recente
      .findOne({}, {}, { sort: { createdAt: -1 } })
      // em caso de sucesso, prossegue:
      .then((stat) => {
        // definindo um objeto default para ser usado em caso de ausência de registros no bd
        const defaultStat = {
          users: 0,
          categories: 0,
          articles: 0,
        };

        // caso o objeto do banco caso exista retorna o mesmo, senão retorna o objeto default
        res.json(stat || defaultStat);
      });
  };

  // disponibiliza as funções para uso do app (padrão consign)
  return { Stat, get };
};
