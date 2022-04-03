export interface PaginationInterface {
  page: number;
  page_size: number;
  total_pages: number;
  total: number;
}

export interface PaginationDataResult<Record> {
  data: Record[];
  metadata: PaginationInterface;
}
