<template>
   <div id="tab_aut">
            <h3>Autenticacação</h3>
            <form>
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputANickname">Nickname:</label>
                    <input class="form-control" type="text" v-model="jogador.nickname" id="inputANickname">
                    </div>
                
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputASenha">Senha:</label>
                    <input class="form-control" type="password" v-model="jogador.password" id="inputASenha">
                </div>
                
                <button class="btn btn-primary" @click='createJogadorForm()' type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </form>                                      
        </div>
</template>
<script>

    import JogadorDataService from '../services/JogadorDataService'

    export default{
     name:'login',
     data() {
            return {
                jogador: {nickname: '', password: ''}
            }
        },
        methods: {
            createJogadorForm(){

                console.log('chamou o createJogadorForm');

                const j = {nickname: this.jogador.nickname,
                           senha: this.jogador.password
                        }                                    

                JogadorDataService.authenticate(j).then(response =>{

                    console.log("Retorno do seviço authenticateJogador", response.status);
                    if(response.status == 201 || response.status == 200){

                        alert('Jogador '+ response.data.nickname + ' authenticate com sucesso');       
                        
                        this.setAuthenticated({nickname: response.data.nickname})
                        
                        this.$router.push({name: "home"});

                    }else if(response.status == 204){

                        alert('Nickname ou senha inválidos ! ');
                    }

                    this.clearForm();
                }
                ).catch(response => {

                    // error callback
                    alert('Não conectou no serviço authenticateJogador '+ response);
                   // console.log(response);
                });


            },
            clearForm(){
                this.jogador.nickname = "";
                this.jogador.password = "";
            },
            setAuthenticated(jogador){

                localStorage.setItem('authUser', JSON.stringify(jogador));
                
            }

        }

    }
</script>
   
<style scoped>
    
</style>