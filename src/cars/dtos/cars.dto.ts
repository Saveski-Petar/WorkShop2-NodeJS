import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"
import { Cars } from "../cars.entity"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CarsCreateDto{
   
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        description: 'Name of the car',
        example: 'Chevrolet Camaro',
      })
    brand:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        description: 'Model of the car',
        example: 'ZL1',
      })
    model :string
    

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Year of the car',
        example: 2023,
      })
    year:number 
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Price of the car',
        example: 67300,
      })
    price:number
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        description: 'Color of the car',
        example: 'Matt Black',
      })
    color:string
    

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        type: Boolean,
        required: true,
        description: 'Is the car in stock',
        example: true,
      })
    isAvailable:boolean
}

export class CarsResponseDto extends CarsCreateDto implements Cars{

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        type: 'uuid',
        required: true,
        description: 'id of the car',
        example: 'asd0asdasd0asda0sda0sd',
      })
    id:string

    @ApiProperty({
      type: Date,
      required: true,
      description: 'Date and time when player has been created',
      example: '2023-05-02T18:24:24.713Z',
    })
    createdAt!: Date;
  
    @ApiProperty({
      type: Date,
      required: true,
      description: 'Date and time when player has been updated',
      example: '2023-05-02T18:24:24.713Z',
    })
    updatedAt!: Date;
  
    @ApiPropertyOptional({
      type: Date,
      required: false,
      description: 'Date and time when player has been deleted',
      example: '2023-05-02T18:24:24.713Z',
    })
    deletedAt?: Date;
}

export class CarsUpdateDto extends CarsCreateDto{}