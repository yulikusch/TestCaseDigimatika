// src/sales-detail/sales-detail.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesDetail } from './salesdetail.entity';
import { SalesDetailService } from './sales-detail.service';
import { SalesDetailController } from './sales-detail.controller';
import { TransaksiModule } from '../transaksi/transaksi.module'; 
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([SalesDetail]),
TransaksiModule,ProductModule],
  providers: [SalesDetailService],
  controllers: [SalesDetailController],
  exports: [SalesDetailService], 
})
export class SalesDetailModule {}
