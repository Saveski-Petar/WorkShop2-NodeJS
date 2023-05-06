import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { DatabaseModule } from '../database/database.module';
import { carsProvivers } from './cars.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [...carsProvivers,CarsService]
})
export class CarsModule {}
