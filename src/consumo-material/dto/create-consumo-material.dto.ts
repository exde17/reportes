import { IsArray, IsJSON, IsString, IsUUID } from 'class-validator';

export class CreateConsumoMaterialDto {
  // @IsString()
  // readonly name: string;

  @IsString()
  readonly document: string;

  @IsArray()
//   @IsJSON()
  readonly materials: any[];

  @IsString()
  readonly city: string;

  @IsString()
  readonly store: string;

}
