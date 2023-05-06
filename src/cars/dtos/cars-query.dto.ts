import {  ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CarQueryDto{


    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        required: false,
        description: 'Brand of the car',
        example: 'Chevrolet Camaro',
      })
    brand?:string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        required: false,
        description: 'Color of the car',
        example: 'black',
      })
    color?:string

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'year of the car',
        example: 2023,
      })
    year?:number
}