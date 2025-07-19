import { Controller, Get,
  Post,
  Put,
  Delete,
  Param,
  Body, } from '@nestjs/common';

  import { PromoService } from './promo.service';
import { Promo } from './promo.entity';

@Controller('promo')
export class PromoController {
constructor(private readonly service: PromoService) {}

 @Get()
  findAll(): Promise<Promo[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Promo> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Promo>): Promise<Promo> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Promo>): Promise<Promo> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }


}
