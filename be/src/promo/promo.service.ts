import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
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
    
      async create(data: Partial<Promo>): Promise<Promo> {
    
    const existingCode = await this.repo.findOne({
      where: { code: data.code },
    });

    if (existingCode) {
      throw new BadRequestException('Kode promo sudah digunakan.');
    }

    const promo = this.repo.create(data);
    return this.repo.save(promo);
  }
    
      async update(id: number, data: Partial<Promo>): Promise<Promo> {
    const promo = await this.findOne(id);

    if (data.code && data.code !== promo.code) {
      const duplicate = await this.repo.findOne({
        where: { code: data.code },
      });

      if (duplicate && duplicate.id !== id) {
        throw new BadRequestException('Kode promo sudah digunakan.');
      }
    }

    Object.assign(promo, data);
    return this.repo.save(promo);
  }
    
      async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.repo.remove(product);
      }

}
