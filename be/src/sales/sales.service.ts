import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from './sales.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'; 
import { hashPassword } from '../utils/hash';


@Injectable()
export class SalesService {

constructor(
    @InjectRepository(Sales)
    private readonly repo: Repository<Sales>,
  ) {}

    findAll(): Promise<Sales[]> {
      return this.repo.find();
    }

     async findOne(id: number): Promise<Sales> {
        const sales = await this.repo.findOneBy({ id });
        if (!sales) throw new NotFoundException(`sales ${id} not found`);
        return sales;
      }
    
      async create(data: Partial<Sales>): Promise<Sales> {
        if (!data.email || !data.password || !data.nama) {
    throw new Error('Nama, email, dan password wajib diisi');
  }

  const existing = await this.repo.findOne({ where: { email: data.email } });
  if (existing) {
    throw new Error('Email sudah terdaftar');
  }

  const { hash, salt } = hashPassword(data.password);

const sales = this.repo.create({
  ...data,
  password: hash.toString('hex'),       
  passwordsalt: salt.toString('hex'),  
});


  return this.repo.save(sales);
}
    
      async update(id: number, data: Partial<Sales>): Promise<Sales> {
        const sales = await this.findOne(id);
        Object.assign(sales, data);
        return this.repo.save(sales);
      }
    
      async remove(id: number): Promise<void> {
        const sales = await this.findOne(id);
        await this.repo.remove(sales);
      }

}
