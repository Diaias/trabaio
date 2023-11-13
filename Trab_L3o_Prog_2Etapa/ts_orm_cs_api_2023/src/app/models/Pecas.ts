import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tb_peca')

class Pecas {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { length: 200 })
    nome: string;
    
    @Column("varchar", { length: 100 })
    marca: string;

    @Column("varchar", { length: 100 })
    preco: string;
    
}
export default Pecas;