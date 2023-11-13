<template>
    <div id="tab_aut">
     
       <div v-if="currentJogador" class="edit-form">
            <h3>Jogador</h3>
            <form>
                <div class="form-group">
                    <label for="inputNickname">Nickname:</label>
                    <input type="text" v-model="currentJogador.nickname" class="form-control" id="inputNickname">
                </div>
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="currentJogador.senha" class="form-control" id="inputSenha">
                </div>
                <div class="form-group">
                        <label for="inputDtCad">D. Cadastro:</label>
                        <input type="text" v-model="currentJogador.data_cadastro" class="form-control" id="inputDtCad" disabled>
                </div>
                <div class="form-group">
                    <label for="inputDtLast">D. Último Acesso:</label>
                    <input type="text" v-model="currentJogador.data_ultimo_login" class="form-control" id="inputDtLast" disabled>
                </div>
                <div class="form-group">
                        <label for="inputQtdPontos">Quantidade de Pontos:</label>
                        <input type="number" v-model="currentJogador.pontos" class="form-control" id="inputQtdPontos">
                </div>
                <div class="form-group">
                    <label for="inputQtdDin">Quantidade de dinheiro:</label>
                    <input type="number" v-model="currentJogador.quantdinheiro" class="form-control" id="inputQtdDin">
                </div>
                <div class="form-group">
                    <label for="checkSituacao">Situação:</label>
                    <input type="checkbox" v-model="currentJogador.situacao" id="checkSituacao">
                </div>
                <div class="form-group">
                    <label for="inputCep">Cep:</label>
                    <input type="text" v-model="currentJogador.endereco.cep" class="form-control" id="inputCep">
                </div>
                <div class="form-group">
                    <label for="inputCom">Complemento:</label>
                    <input type="text" v-model="currentJogador.endereco.complemento" class="form-control" id="inputCom">
                </div>
                <div class="form-group">
                    <label for="selectPatente">Patentes:</label>
                    <select v-model="currentJogador.patentes" class="form-control" id="selectPatente" multiple>                                
                        <option v-for="p in patentes" :key ="p.codigo" v-bind:value="p">
                            {{ p.nome }}
                            </option>
                    </select>
                    
                </div>                        
            </form>
            <button class="badge badge-success" @click="updateJogador">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteJogador">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Jogador...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import JogadorDataService from '../../services/JogadorDataService'
     import PatenteDataService from '../../services/PatenteDataService'
 
     export default{
      name:'editJogadores',
      data() {
             return {                
                 currentJogador: null,
                 message: '',
                 patentes: []
             }
         },
         methods: {

            getJogador(nickname){

                JogadorDataService.get(nickname)
                .then(response => {
                    console.log(response.data);
                    this.currentJogador = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listPatentes(){

                PatenteDataService.list().then(response =>{

                    console.log("Retorno do seviço PatenteDataService.list", response.status);

                    this.patentes = response.data;                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PatenteDataService.list');
                console.log(response);
                });               
            },
            updateJogador(){

                JogadorDataService.update(this.currentJogador)
                .then(response => {
                    console.log('JogadorDataService.update');
                    this.message = 'Jogador alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteJogador(){

                JogadorDataService.delete(this.currentTutorial.nickname)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "jogadores-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "jogadores-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listPatentes();
            this.getJogador(this.$route.params.nickname);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>