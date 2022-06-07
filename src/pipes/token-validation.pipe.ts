import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Token } from '@prisma/client';

const ERROR_INVALID_TOKEN = 'Invalid Token';

@Injectable()
export class TokenValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      !value?.token ||
      typeof value.token !== 'string' ||
      !(value.token.toUpperCase() in Token)
    ) {
      throw new BadRequestException(ERROR_INVALID_TOKEN);
    }
    const token = value.token.toUpperCase() as Token;
    return metadata.type === 'param'
      ? token
      : {
          ...value,
          token,
        };
  }
}
