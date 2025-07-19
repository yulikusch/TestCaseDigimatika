// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn,ManyToOne,JoinColumn ,
  UpdateDateColumn,} from 'typeorm';


@Entity('users')
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

 @Column({ type: 'varchar', length: 255, nullable: true })
email: string;

@Column({ type: 'varchar', length: 255 })
password: string;

@Column({ type: 'varchar', length: 255 })
passwordsalt: string;


  @Column({ type: 'text', nullable: true })
  level: string;


}
