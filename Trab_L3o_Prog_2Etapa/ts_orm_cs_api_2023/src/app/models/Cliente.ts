import {Column, ChildEntity} from 'typeorm';
import Pessoa from './Pessoa';

@ChildEntity() 
export default class Cliente extends Pessoa{
    //Caso nao seja informado data, vai recebere a data atual.
    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data_cadastro: Date;
}