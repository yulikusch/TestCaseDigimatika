// src/product/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SalesDetailService } from './sales-detail.service';
import { SalesDetail } from './salesdetail.entity';

@Controller('salesdetail')
export class SalesDetailController {
  constructor(private readonly service: SalesDetailService) {}

  @Get()
  findAll(): Promise<SalesDetail[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SalesDetail> {
    return this.service.findOne(id);
  }

  @Post()
async create(@Body() body: any): Promise<any> {
  const { sales_id, details } = body;

  const results: SalesDetail[] = [];

  for (const detail of details as Partial<SalesDetail>[]) {
    const savedDetail = await this.service.create({
      sales_id: sales_id,
      product_id: detail.product_id,
      qty: detail.qty,
      price: detail.price,
      discount: 0,
    });

    results.push(savedDetail);
  }

  return { message: 'Sales details created', data: results };
}



  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<SalesDetail>): Promise<SalesDetail> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }
}
