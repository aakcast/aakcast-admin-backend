import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FindDto } from '../dto/find.dto';

/**
 * Pipe: Find
 */
@Injectable()
export class FindPipe implements PipeTransform {
  /**
   * Implement PipeTransform.transform
   * @param value     find query
   * @param metadata  argument metadata
   */
  transform(value: any, metadata: ArgumentMetadata) {
    const transformers: Record<string, (val: string) => any> = {
      limit: (val) => Number(val) ?? 10,
      offset: (val) => Number(val) ?? 0,
      sortField: (val) => val ?? 'createdAt',
      sortOrder: (val) => val ?? 'asc',
    };

    if (metadata.data) {
      return transformers[metadata.data]?.(value as string) ?? value;
    }

    const query: Record<string, string> = value;
    const plain = Object.entries(query).reduce<Record<string, any>>((obj, [k, v]) => {
      obj[k] = transformers[k]?.(v) ?? v;
      return obj;
    }, {});
    return plainToClass(FindDto, plain);
  }
}
