// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesDetail } from './salesdetail.entity';

@Injectable()
export class SalesDetailService {
  constructor(
    @InjectRepository(SalesDetail)
    private readonly repo: Repository<SalesDetail>,
  ) {}

  findAll(): Promise<SalesDetail[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<SalesDetail> {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  create(data: Partial<SalesDetail>): Promise<SalesDetail> {
  console.log('Received data:', data);
  
   if (!data.product_id) throw new Error('product_id is required');
  if (!data.sales_id) throw new Error('sales_id is required');
  if (!data.qty) throw new Error('qty is required');
  if (!data.price) throw new Error('price is required');

  const { subtotal, ...safeData } = data;
  const product = this.repo.create(safeData);
  return this.repo.save(product);
}



  async update(id: number, data: Partial<SalesDetail>): Promise<SalesDetail> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.repo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.repo.remove(product);
  }
}
