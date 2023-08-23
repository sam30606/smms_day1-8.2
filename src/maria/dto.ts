import { ApiProperty } from '@nestjs/swagger';
export class FindOneQuery {
  @ApiProperty({ example: '0', required: false })
  id: number;
  @ApiProperty({ example: 'apple', required: false })
  name: string;
  @ApiProperty({ example: '1', required: false })
  price: number;
}
export class InsertQuery {
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
export class UpdateQuery {
  @ApiProperty({ example: '0' })
  id: number;
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
export class DeleteQuery {
  @ApiProperty({ example: '1' })
  id: number;
}
export class OKInsert {
  @ApiProperty({ example: '0' })
  id: number;
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
export class OKUpdate {
  @ApiProperty({ example: '0' })
  id: number;
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
export class OKFindAll {
  @ApiProperty({ example: '0' })
  id: number;
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
export class OKFindOne {
  @ApiProperty({ example: '0' })
  id: number;
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
export class OKDelete {
  @ApiProperty({ example: '0' })
  id: number;
  @ApiProperty({ example: 'apple' })
  name: string;
  @ApiProperty({ example: '1' })
  price: number;
}
