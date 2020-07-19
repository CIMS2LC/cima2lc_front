export interface TableListItem {
  id: number;
  gender: string;
  hospitalNumber: string;
  age: number;
  idNumber: '1234';
  name: string;
  phoneNumber: string;
  patDia: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface QueryListItem {
  key: string;
  value: string;
}
