import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; 
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { PromoModule } from './promo/promo.module';
import { CustomerModule } from './customer/customer.module';
import { SalesModule } from './sales/sales.module';
import { SalesDetailModule } from './sales-detail/sales-detail.module';

// import modul-modul lain jika ada

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'mssql',
  host: '202.10.42.85',
  port: 1433,
  username: 'sa',
  password: 'Pdc123456',
  database: 'Market',
  // entities: [User,Product,ProductCategory],
   entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  extra: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
}),

     TypeOrmModule.forFeature([User]),

    AuthModule,
    UsersModule,
    ProductModule,
    ProductCategoryModule,
    PromoModule,
    CustomerModule,
    SalesModule,
    SalesDetailModule, 
  ],
})
export class AppModule {} // <<=== penting: EXPORT di sini
