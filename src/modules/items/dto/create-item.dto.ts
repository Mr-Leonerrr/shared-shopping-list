import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  listId: number;

  @IsOptional()
  note?: string;

  @IsOptional()
  isCompleted?: boolean;
}
