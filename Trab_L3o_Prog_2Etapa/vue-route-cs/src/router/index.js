import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'
import listJogadores from  '@/components/jogador/List'
import editJogador   from  '@/components/jogador/Edit'
import novoJogador   from  '@/components/jogador/Add'

import listPatentes from  '@/components/patente/List'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/jogadores',
      name: 'jogadores-list',
      component: listJogadores    
    },
    {
      path: '/jogador/:nickname',
      name: "jogador-edit",
      component: editJogador
    },
    {
      path: '/addjogador',
      name: "jogador-add",
      component: novoJogador
    },
    {
      path: '/patentes',
      name: 'patentes-list',
      component: listPatentes   
    }
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;