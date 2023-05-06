import { DataSource } from 'typeorm';
import { Cars } from './cars.entity';


export const carsProvivers = [
  {
    provide: 'CARS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cars),
    inject: ['DATA_SOURCE'],
  },
];