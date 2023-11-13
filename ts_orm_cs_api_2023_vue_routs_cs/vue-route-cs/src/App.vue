<template>
  <div id="app">

      <!-- navbar -->
      <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        
        <a class="navbar-brand" href="/">Vuejs+router</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">                                        
            <li class="nav-item">
              <router-link class="nav-link" to="/jogadores">Jogador</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/patentes">Patente</router-link>
            </li>
            <li class="nav-item">            
              <router-link class="nav-link" to="/" v-on:click.native="logout()" replace>Logout</router-link>
            </li>               
          </ul>
        </div>

      </div>
      <div class="container mt-3">
        <router-view/>               
      </div>
    
  </div>

</template>

<script>

export default {
    name: "App",    
    methods: {
      logout(){        
        localStorage.removeItem('authUser');
        this.$router.push({name: "login"});
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
