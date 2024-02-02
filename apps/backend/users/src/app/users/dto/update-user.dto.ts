import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from '../../auth/dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
