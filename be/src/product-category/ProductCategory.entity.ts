// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn,OneToMany ,
  UpdateDateColumn,} from 'typeorm';

  import { Product } from '../product/product.entity';

@Entity('ProductCategory')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;



  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  updated_at: Date;

    @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
