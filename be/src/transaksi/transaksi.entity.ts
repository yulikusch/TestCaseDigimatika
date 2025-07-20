// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity('Sales')
export class Transaksi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  customer_id: number;
  @Column({ type: 'int' })
  sales_id: number;

  @Column({ type: 'int' })
  promo_id: number;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  date: Date;

   @Column({ type: 'int' })
  total_amount: number;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  updated_at: Date;


}
