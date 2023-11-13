<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Jogadores</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">NickName</th>
                    <th scope="col">Data de Cadastro</th>
                    <th scope="col">Quantidade de Pontos</th>
                    <th scope="col">Endereço</th> 
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(j, indice) in jogadores" :key ="j.nickname" :class="{ active: indice == currentIndex }">
                            <td>{{j.nickname}}</td>
                            <td>{{j.data_cadastro | formataData}}</td>
                            <td>{{j.pontos}}</td>
                            <td>{{j.endereco.cep}}</td>
                            <td v-if="j.situacao == 'A'"><input type="checkbox" checked disabled></td>
                            <td v-if="j.situacao == 'I'"><input type="checkbox" disabled></td>                     
                            <td><button v-on:click="setCurrentJogador(j, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remJogador(j, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentJogador">
                    <h4>Jogador</h4>
                    <div>
                    <label><strong>Nickname:</strong></label> {{ currentJogador.nickname }}
                    </div>
                    <div>
                    <label><strong>Data de Cadastro:</strong></label> {{ currentJogador.datacadastro }}
                    </div>
                    <div>
                    <label><strong>Stituação:</strong></label> {{ currentJogador.situacao == 'A' ? "Ativo" : "Inativo" }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/jogador/' + currentJogador.nickname"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addjogador" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import JogadorDataService from '../../services/JogadorDataService'     
 
     export default{
      name:'listJogadores',
      data() {
             return {
                 jogadores: [],
                 currentJogador: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarJogadores(){

                
                JogadorDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateJogador", response.status);

                   this.jogadores = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listjogador');
                    console.log(response);
                });
            },
            setCurrentJogador(jogador, index){

                this.currentJogador = jogador;
                this.currentIndex = index;
            },
            remJogador(jogador, index){

                JogadorDataService.delete(jogador.nickname)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarJogadores();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarJogadores();
         }
 
     }
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>