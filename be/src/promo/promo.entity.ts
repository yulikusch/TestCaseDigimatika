// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn,
  UpdateDateColumn,} from 'typeorm';


@Entity('Promo')
export class Promo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 18, scale: 2 })
  discount: number;

   @Column({ type: 'datetime', default: () => 'GETDATE()' })
  start_date: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  end_date: Date;

  @Column({ type: 'tinyint', width: 1, default: 1 })
 is_active: boolean;


  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  updated_at: Date;

 
}
