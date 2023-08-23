import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserType, Role, Gender } from 'src/core/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsMobilePhone()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  avatarImg?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
