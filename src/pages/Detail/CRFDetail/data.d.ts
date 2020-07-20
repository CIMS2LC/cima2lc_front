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

export interface PatientItem {
  id: number;
  account: string;
  researchCenter: string;
  idNumber: string;
  hospitalNumber: number;
  patientName: string;
  gender: boolean;
  birthday: Date;
  phoneNumber1: number;
  phoneNumber2: number;
  psScore: number;
  updateTime: Date;
}
