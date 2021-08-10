// o objetivo deste arquivo é configurar o Vue toasted, para permitir a exibição de mensagens ao usuário

// importando as dependências
import Vue from "vue";
import Toasted from "vue-toasted"; // permite a exibição de mensagens na tela

// carregando o vue-toasted
Vue.use(Toasted, {
  // definindo a biblioteca de ícones do fontawesome
  iconPack: "fontawesome",

  // definindo a duração das mensagens
  duration: 3000,
});

// definindo o padrão para mensagens de sucesso
Vue.toasted.register(
  // definindo o nome
  "defaultSuccess",

  // se não receber a mensagem via atributo, usa o default "Operação realizada com sucesso!"
  (obj) => (!obj.msg ? "Operação realizada com sucesso!" : obj.msg),

  // definindo o tupo e o ícone
  { type: "success", icon: "check" }
);

Vue.toasted.register(
  // definindo o nome
  "defaultError",

  // se não receber a mensagem via atributo, usa o default "Oops.. Erro inesperado."
  (obj) => (!obj.msg ? "Oops.. Erro inesperado." : obj.msg),

  // definindo o tupo e o ícone
  { type: "error", icon: "times" }
);
