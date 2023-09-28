import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsMobilePhone,
  IsEnum,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { UserType, Role, Gender } from '../../enums';
import { PartialType } from '@nestjs/swagger';

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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsMobilePhone()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsEnum(Role, { each: true })
  @IsArray()
  roles?: Role[];

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  avatarImg?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
