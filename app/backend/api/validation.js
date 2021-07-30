// implementação de algumas validações de dados

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // função que valida determinado valor, lançando uma mensagem de erro na falha da validação
  function existsOrError(value, msg) {
    // se o valor não estiver setado lança uma mensagem de erro
    if (!value) throw msg;

    // se o valor for um array vazio lança uma mensagem de erro
    if (Array.isArray(value) && value.length === 0) throw msg;

    // se o valor for uma string de espaços em branco lança uma mensagem de erro
    if (typeof value === "string" && !value.trim()) throw msg;
  }

  // função que valida determinado valor, lançando uma mensagem de erro no sucesso da validação
  function notExistsOrError(value, msg) {
    try {
      // valida determinado valor
      existsOrError(value, msg);
    } catch (msg) {
      // caso falhe a validação, não faz nada
      return;
    }

    // caso a validação seja bem sucedida, lança mensagem de erro
    throw msg;
  }

  // função que valida se dois valores são estritamente iguais, lançando uma mensagem de erro na falha da validação
  function equalsOrError(valueA, valueB, msg) {
    // se os valores não forem estritamente iguais lança uma mensagem de erro
    if (valueA !== valueB) throw msg;
  }

  // função que valida se dois valores são estritamente diferentes, lançando uma mensagem de erro na falha da validação
  function notEqualsOrError(valueA, valueB, msg) {
    // se os valores não forem estritamente diferentes lança uma mensagem de erro
    if (valueA == valueB) throw msg;
  }

  function notUndefinedOrError(valueA, msg) {
    if (valueA === undefined) throw msg;
  }

  // disponibiliza as funções para uso do app (padrão consign)
  return {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    notEqualsOrError,
    notUndefinedOrError,
  };
};
