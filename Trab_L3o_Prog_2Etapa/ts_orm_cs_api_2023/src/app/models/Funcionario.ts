import {Column, ChildEntity} from 'typeorm';
import Pessoa from './Pessoa';

@ChildEntity() 
export default class Funcionario extends Pessoa{
    @Column('text')
    funcao: string;

    @Column('text')
    cargo: string;
}