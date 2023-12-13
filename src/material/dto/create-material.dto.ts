import { IsNumber, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

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
