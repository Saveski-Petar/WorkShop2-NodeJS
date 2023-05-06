import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository ,ILike} from 'typeorm';
import { Cars } from './cars.entity';
import { CarsCreateDto, CarsResponseDto, CarsUpdateDto } from './dtos/cars.dto';
import { CarQueryDto } from './dtos/cars-query.dto';

@Injectable()
export class CarsService {

    constructor(@Inject('CARS_REPOSITORY')
    private readonly carsRepository:Repository<Cars>
    ){}

    async getAllCars(query:CarQueryDto):Promise<CarsResponseDto[]>{

let whereQuery={}
if(query?.brand){
 whereQuery={...whereQuery, brand: ILike(`%${query.brand}%`)}
 }
if(query?.color){
  whereQuery={...whereQuery, color: ILike(`%${query.color}%`)}
 }
if(query?.year){
 whereQuery={...whereQuery, year: ILike(`%${query.year}%`)}
                }
                
        return await this.carsRepository.find({
            where:whereQuery,
            order:{
                year:'ASC'
            }
        })
    }
    async getCarByID(carsId:string):Promise<CarsResponseDto>{
        const car= await this.carsRepository.findOne({where:{id:carsId}})

        if(!car)throw new NotFoundException(`Car with the id of ${carsId} is not found`)

        return car
    }

    async addCar(carInfo:CarsCreateDto):Promise<CarsResponseDto>{
        return await this.carsRepository.save(carInfo)
    }

    async updateCar(carId:string, carUpdatedInfo:CarsUpdateDto):Promise<CarsResponseDto>{

        await this.getCarByID(carId)

        return await this.carsRepository.save({

            id:carId,
            ...carUpdatedInfo

        })
    }

    async updateCarPrice(carId:string, newCarPrice:number):Promise<CarsResponseDto>{

        await this.getCarByID(carId)

        return await this.carsRepository.save({
         id:carId,
         price:newCarPrice

        })
    }

    async updateCarAvailability(carId:string, carAvailability:boolean):Promise<CarsResponseDto>{
        await this.getCarByID(carId)

        return await this.carsRepository.save({
            id:carId,
            isAvailable:carAvailability
        })
    }

    async softDeleteCar(carId:string):Promise<void>{

        await this.carsRepository.softDelete(carId)
    }

    async hardDeleteCar(carId:string):Promise<void>{
        await this.carsRepository.delete(carId)
    }
}
