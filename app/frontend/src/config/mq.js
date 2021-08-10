// o objetivo deste arquivo é configurar a reponsividade da aplicação

// importando as dependências
import Vue from "vue";
import VueMq from "vue-mq"; // biblioteca que define os breakpoints de responsividade da aplicação

// definindo os breakpoints em px
Vue.use(VueMq, {
  breakpoints: {
    // dispositivos extra-pequenos
    xs: 576,

    // dispositivos pequenos
    sm: 768,

    // dispositivos médios
    md: 960,

    // dispositivos grandes
    lg: 1140,

    // dispositivos extra-grandes
    xl: Infinity,
  },
});
