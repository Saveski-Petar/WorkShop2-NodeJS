import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe, Delete, Query, Patch, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CarsCreateDto, CarsResponseDto, CarsUpdateDto } from './dtos/cars.dto';
import { CarQueryDto } from './dtos/cars-query.dto';


@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 200,
        description: 'Cars Found',
    })
    getAllCars(@Query() query: CarQueryDto): Promise<CarsResponseDto[]> {
        return this.carsService.getAllCars(query)
    }

    @Get(':id')
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 200,
        description: 'Car Found',
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Car not found',
    })
    getCarByID(@Param('id') carId: string): Promise<CarsResponseDto> {
        return this.carsService.getCarByID(carId)
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 201,
        description: 'Car Added',
    })
    addCar(@Body() carInfo: CarsCreateDto): Promise<CarsResponseDto> {
        return this.carsService.addCar(carInfo)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 200,
        description: 'Car Updated',
    })
    updateCar(@Param('id') carId: string, @Body() carUpdatedInfo: CarsUpdateDto): Promise<CarsResponseDto> {
        
        return this.carsService.updateCar(carId, carUpdatedInfo)
    }

    @Patch(':id/price/:price')
    updateCarPrice(@Param('id') id:string , @Param('price', ParseIntPipe) price:number):Promise<CarsResponseDto>{
        return this.carsService.updateCarPrice(id,price)
    }

    @Patch(':id/availability/:avaliable')
    updateCarAvailability(@Param('id') id: string, @Param('avaliable', ParseBoolPipe) carAvailability: boolean): Promise<CarsResponseDto> {
        return this.carsService.updateCarAvailability(id, carAvailability)
    }

    @Delete('/soft-delete/:id')
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 200,
        description: 'Car Deleted',
    })
    softDeleteCar(@Param('id') carId: string): Promise<void> {
        return this.carsService.softDeleteCar(carId)
    }

    @Delete('/hard-delete/:id')
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 200,
        description: 'Car Deleted',
    })
    hardDeleteCar(@Param('id') carId: string): Promise<void> {
        return this.carsService.hardDeleteCar(carId)
    }


}
