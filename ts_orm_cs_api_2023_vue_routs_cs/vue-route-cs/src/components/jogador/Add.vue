<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNickname">Nickname:</label>
            <input type="text" v-model="jogador.nickname" class="form-control" id="inputNickname">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="jogador.senha" class="form-control" id="inputSenha">
        </div>            
        <div class="form-group">
                <label for="inputQtdPontos">Quantidade de Pontos:</label>
                <input type="number" v-model="jogador.quantpontos" class="form-control" id="inputQtdPontos">
        </div>
        <div class="form-group">
            <label for="inputQtdDin">Quantidade de dinheiro:</label>
            <input type="number" v-model="jogador.quantdinheiro" class="form-control" id="inputQtdDin">
        </div>
        <div class="form-group">
            <label for="inputCep">Cep:</label>
            <input type="text" v-model="jogador.endereco.cep" class="form-control" id="inputCep">
        </div>
        <div class="form-group">
            <label for="inputCom">Complemento:</label>
            <input type="text" v-model="jogador.endereco.complemento" class="form-control" id="inputCom">
        </div>
        <div class="form-group">
            <label for="selectPatente">Patentes:</label>
            <select v-model="jogador.patentes" class="form-control" id="selectPatente" multiple>                                
                <option v-for="p in patentes" :key ="p.codigo" v-bind:value="p">
                    {{ p.nome }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="saveJogador" class="btn btn-success">Salvar</button>
        <router-link to="/jogadores" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newJogador">Novo</button>
        <router-link to="/jogadores" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import JogadorDataService from '../../services/JogadorDataService'
    import PatenteDataService from '../../services/PatenteDataService'

    export default {
        name: "addJogador",
        data(){
            return {
                jogador: {indice: '', 
                                    nickname: '', 
                                    senha: '',
                                    pontos: 0, 
                                    quantdinheiro: 0,                                                                        
                                    situacao: true,  
                                    endereco: {codigo: 0, cep: '', complemento: ''},
                                    patentes: []},
                submitted: false,
                patentes: []
            }            
        },
        methods: {

            saveJogador(){

                var jgd = jQuery.extend({}, this.jogador);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.
                var end = jQuery.extend({}, this.jogador.endereco);//clona o this.novo_jogador.endereco                        
                jgd.endereco = end;                                                

                if (jgd.nickname.trim().length > 0 && jgd.senha.trim().length > 0 && 
                        jgd.quantpontos > -1 && jgd.quantdinheiro > -1 && 
                        jgd.endereco.cep.length > 0) {
                
                    JogadorDataService.create(jgd)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newJogador(){

                this.submitted = false;
                this.jogador = {};
            },
            listPatentes(){

                PatenteDataService.list().then(response =>{

                console.log("Retorno do seviço PatenteDataService.list", response.status);

                for(let j of response.data){

                    this.patentes.push(j);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PatenteDataService.list');
                console.log(response);
                });               
            }

        },
        mounted() {                        
            this.listPatentes();
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>