import { Controller, Get,
  Post,
  Put,
  Delete,
  Param,
  Body, } from '@nestjs/common';

  import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './ProductCategory.entity';

@Controller('product-category')
export class ProductCategoryController {
constructor(private readonly service: ProductCategoryService) {}

 @Get()
  findAll(): Promise<ProductCategory[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductCategory> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<ProductCategory>): Promise<ProductCategory> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<ProductCategory>): Promise<ProductCategory> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }


}
