import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './ProductCategory.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductCategoryService {

constructor(
    @InjectRepository(ProductCategory)
    private readonly repo: Repository<ProductCategory>,
  ) {}

    findAll(): Promise<ProductCategory[]> {
      return this.repo.find();
    }

     async findOne(id: number): Promise<ProductCategory> {
        const product = await this.repo.findOneBy({ id });
        if (!product) throw new NotFoundException(`Product ${id} not found`);
        return product;
      }
     
      async create(data: Partial<ProductCategory>): Promise<ProductCategory> {
    
    const nameExist = await this.repo.findOne({
      where: { name: data.name },
    });

    if (nameExist) {
      throw new BadRequestException('Nama kategori sudah digunakan.');
    }

    const product = this.repo.create(data);
    return this.repo.save(product);
  }
    
       async update(id: number, data: Partial<ProductCategory>): Promise<ProductCategory> {
    const existing = await this.findOne(id);

    if (data.name && data.name !== existing.name) {
      const nameUsed = await this.repo.findOne({
        where: { name: data.name },
      });

      if (nameUsed && nameUsed.id !== id) {
        throw new BadRequestException('Nama kategori sudah digunakan.');
      }
    }

    Object.assign(existing, data);
    return this.repo.save(existing);
  }
    
      async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.repo.remove(product);
      }

}
