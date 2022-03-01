import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../dto/paginated.dto';

/**
 * Decorator: ApiPaginatedResponse
 * @param model   Type of an item in list
 * @constructor
 */
export const ApiPaginatedResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              total: {
                type: 'number',
                description: '전체 결과 수',
                example: 1,
              },
              results: {
                type: 'array',
                description: '반환 결과 목록',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
