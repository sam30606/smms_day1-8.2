import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'decimal' })
  price: number;
}
