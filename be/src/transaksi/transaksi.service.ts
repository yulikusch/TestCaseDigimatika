// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaksi } from './transaksi.entity';

@Injectable()
export class TransaksiService {
  constructor(
    @InjectRepository(Transaksi)
    private readonly repo: Repository<Transaksi>,
  ) {}

  findAll(): Promise<Transaksi[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Transaksi> {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  create(data: Partial<Transaksi>): Promise<Transaksi> {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: Partial<Transaksi>): Promise<Transaksi> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.repo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.repo.remove(product);
  }
}
