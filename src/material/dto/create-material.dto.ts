import { IsNumber, IsString } from "class-validator";

export class CreateMaterialDto {

    @IsString()
    codigo: string;

    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsString()
    unit: string;
    
    
}
