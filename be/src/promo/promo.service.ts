import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promo } from './promo.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PromoService {

constructor(
    @InjectRepository(Promo)
    private readonly repo: Repository<Promo>,
  ) {}

    findAll(): Promise<Promo[]> {
      return this.repo.find();
    }

     async findOne(id: number): Promise<Promo> {
        const product = await this.repo.findOneBy({ id });
        if (!product) throw new NotFoundException(`Product ${id} not found`);
        return product;
      }
    
      create(data: Partial<Promo>): Promise<Promo> {
        const product = this.repo.create(data);
        return this.repo.save(product);
      }
    
      async update(id: number, data: Partial<Promo>): Promise<Promo> {
        const product = await this.findOne(id);
        Object.assign(product, data);
        return this.repo.save(product);
      }
    
      async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.repo.remove(product);
      }

}
