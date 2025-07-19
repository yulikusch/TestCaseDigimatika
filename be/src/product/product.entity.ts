// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn,ManyToOne,JoinColumn ,
  UpdateDateColumn,} from 'typeorm';

  import { ProductCategory } from '../product-category/ProductCategory.entity'; 

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 18, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column()
  product_category_id: number;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  updated_at: Date;

  @ManyToOne(() => ProductCategory, (category) => category.products, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'product_category_id' }) // ini penting!
category: ProductCategory;

}
