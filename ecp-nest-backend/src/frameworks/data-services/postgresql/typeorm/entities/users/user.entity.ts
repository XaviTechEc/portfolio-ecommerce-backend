import { IUser } from 'src/core/interfaces';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
