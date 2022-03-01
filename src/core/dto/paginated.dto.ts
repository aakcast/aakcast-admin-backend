/**
 * DTO: Paginated
 */
export class PaginatedDto<TData, TSrc = any> {
  /**
   * Constructor
   * @param cls       TData class constructor
   * @param response  protobuf response
   */
  constructor(cls: { new (item: TSrc): TData }, response: { total: number; results: TSrc[] }) {
    this.total = response.total ?? 0;
    this.results = (response.results ?? []).map((item) => new cls(item));
  }

  readonly total: number;

  readonly results: TData[];
}
