import { UserRole } from '@core';
import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: UserRole[]) => SetMetadata(UserRole, roles);
//okk
