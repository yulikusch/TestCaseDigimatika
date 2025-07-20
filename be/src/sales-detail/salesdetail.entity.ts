
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,
  JoinColumn,} from 'typeorm';
import { Product } from '../product/product.entity'; 

@Entity('SalesDetail')
export class SalesDetail {
  @PrimaryGeneratedColumn()
  id: number;

     @Column({ type: 'int' })
  sales_id: number;

  @Column({ type: 'int' })
product_id: number;


  @Column({ type: 'int', default: 0 })
  qty: number;

  @Column('decimal', { precision: 18, scale: 2 })
  price: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discount: number;

  @Column({ type: 'int', nullable: true, insert: false, update: false })
subtotal: number;




 @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'product_id' }) // menghubungkan ke kolom product_id
  product: Product;


}
