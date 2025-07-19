// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn,
  UpdateDateColumn,} from 'typeorm';


@Entity('Customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  phone: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  updated_at: Date;



}
