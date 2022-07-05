import { applyDecorators, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function UserEndpoint(
  controller: string,
  version = '',
  outputSchema: Function | string,
  type: 'array' | 'string' | 'integer' | 'object' = 'object',
) {
  return applyDecorators(Version(version), ApiTags(`${controller}, User`));
}
