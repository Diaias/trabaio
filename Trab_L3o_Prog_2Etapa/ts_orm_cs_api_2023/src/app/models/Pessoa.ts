import {Entity, Column, PrimaryColumn, TableInheritance} from 'typeorm';
@Entity('tb_pessoa')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Pessoa {

    @Column("varchar", { length: 50 })
    nome: string;

    @PrimaryColumn("varchar", { length: 11 })
    cpf: string;

    @Column("varchar", { length: 50 })
    endereco: string;

    @Column("varchar", { length: 50 })
    email: string;
    
    @Column("varchar", { length: 11 })
    celular: string;

    @Column("varchar", { length: 20 })
    senha: string;
}