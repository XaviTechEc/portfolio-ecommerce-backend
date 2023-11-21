import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Gender, UserType } from '../../enums';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';
import { IRole } from 'src/roles/domain/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsUUID('all', { each: true })
  roles?: any;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsMobilePhone()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  avatarImg?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsDate()
  lastConnection?: Date;
}
