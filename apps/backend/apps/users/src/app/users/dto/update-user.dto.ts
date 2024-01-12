import { RegisterDto } from '../../auth/dto/register.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(RegisterDto) {}
