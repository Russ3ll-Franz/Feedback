import { ReflectMetadata } from '@nestjs/common';

const Roles = (...roles: string[]) => ReflectMetadata('role', roles);
export {
    Roles,
};
