import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { Promo  } from './promo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PromoService],
  controllers: [PromoController],
  imports: [TypeOrmModule.forFeature([Promo])],
})
export class PromoModule {}
