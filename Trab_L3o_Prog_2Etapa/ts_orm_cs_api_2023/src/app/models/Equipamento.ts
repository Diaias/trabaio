import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import Pecas from './Pecas';

@Entity('tb_equipamento')

class Equipamento {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { length: 200 })
    nome: string;
    
    @Column("varchar", { length: 100 })
    marca: string;

    @Column("varchar", { length: 100 })
    descricao: string;

    @ManyToMany(() => Pecas)
    @JoinTable({name : "tb_equipamento_peca", 
                joinColumn: {name: "equipamento_id", 
                             referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "peca_id", 
                                    referencedColumnName: "id"}})
    pecas: Pecas[];
}
export default Equipamento;