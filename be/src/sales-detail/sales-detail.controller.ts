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

import { TransaksiService } from '../transaksi/transaksi.service'; 
import { Transaksi } from '../transaksi/transaksi.entity';

import { ProductService } from '../product/product.service'; 
import { Product } from '../product/product.entity';

@Controller('salesdetail')
export class SalesDetailController {
  constructor(
    private readonly service: SalesDetailService,
    private readonly transaksiService: TransaksiService,
    private readonly productService: ProductService,
  
  ) {}

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
  const { customer_id, sales_id, details } = body;

  const totalAmount = (details as Partial<SalesDetail>[]).reduce((sum, item) => {
    return sum + (item.qty || 0) * (item.price || 0);
  }, 0);

  // Validasi stok sebelum membuat transaksi
  for (const detail of details) {
    const product = await this.productService.findById(detail.product_id); 

    if (!product) {
      throw new Error(`Produk dengan ID ${detail.product_id} tidak ditemukan.`);
    }

    if ((product.stock || 0) < (detail.qty || 0)) {
      throw new Error(
        `Stok produk "${product.name}" tidak mencukupi. Stok tersedia: ${product.stock}, diminta: ${detail.qty}`
      );
    }
  }

  // Semua validasi lulus -> buat transaksi
  const transaksiBaru: Partial<Transaksi> = {
    sales_id: sales_id,
    customer_id: customer_id,
    total_amount: totalAmount,
    date: new Date(),
  };

  let transaksi;
try {
  transaksi = await this.transaksiService.create(transaksiBaru);
} catch (error) {
  console.error("❌ Gagal membuat transaksi:", error);
  throw new Error("Gagal membuat transaksi. Periksa log server.");
}
  const results: SalesDetail[] = [];

  // Simpan detail & update stok produk
  for (const detail of details as Partial<SalesDetail>[]) {
    // Simpan sales detail
    const savedDetail = await this.service.create({
      sales_id: sales_id,
      product_id: detail.product_id,
      qty: detail.qty,
      price: detail.price,
      discount: 0,
    });

    // Update stok
    const product = await this.productService.findById(detail.product_id!);

if (!product) {
  throw new Error(`Produk dengan ID ${detail.product_id} tidak ditemukan.`);
}

const updatedStock = (product.stock || 0) - (detail.qty || 0);

await this.productService.update(detail.product_id!, {
  stock: updatedStock,
});

    results.push(savedDetail);
  }

  return {
    message: 'Transaksi dan Sales details berhasil dibuat',
    transaksi,
    salesDetails: results,
  };
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
