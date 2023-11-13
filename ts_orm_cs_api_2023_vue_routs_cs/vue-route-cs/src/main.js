// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.filter('formataData', function (value) {                
  //yyyy-mm-dd
  var data = new Date(value);
  data.setDate(data.getDate()+1); //incrementa a data em um dia para mostrar corretamente (pode nao ser necessário)              
  let dia  = (data.getDate()).toString().padStart(2, '0');
  let mes  = (data.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.                
  let ano  = data.getFullYear();                
  return dia+"/"+mes+"/"+ano;                
})


new Vue({
  el: '#app',
  router,  
  components: { App },
  template: '<App/>'

})