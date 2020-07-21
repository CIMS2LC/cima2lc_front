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

export interface PastHisItem {
  id: number;
  pid: number;
  CliniManifest: string;
  BasDisHis: string;
  infDisHis: string;
  tumHis: string;
  tumFamHis: string;
  smoke: boolean;
  smokingHis: string;
  drink: boolean;
  drinkingHis: string;
  hormone: boolean;
  hormoneUseHis: string;
  drug: boolean;
  drugUseHis: string;
}

export interface ImmunohisItem {
  id: number;
  pid: number;
  ALKD5F3: number;
  'ALKD5F3-N': number;
  CAIX: number;
  'CAM5.2': number;
  CD10: number;
  CD34: number;
  CD56: number;
  CD117: number;
  'CDX-2': number;
  CEA: number;
  CgA: number;
  CK: number;
  'CK5/6': number;
  CK7: number;
  'CK8/18': number;
  CK19: number;
  CK20: number;
  Cyn: number;
  DLL3: number;
  EMA: number;
  'ERCC-1': number;
  LCA: number;
  MCM2: number;
  'Napsin A': number;
  P16: number;
  P40: number;
  p53: number;
  P63: number;
  'PAX-2': number;
  'PAX-8': number;
  PCK: number;
  'PD-L1': number;
  SATB2: number;
  Syn: number;
  TTF1: number;
  'VEGF-C': number;
  Villin: number;
  VIM: number;
  其他: string;
}

export interface MoleDetecItem {
  id: number;
  pid: number;
  treNum: number;
  ALK: number;
  BIM: number;
  BRAF: number;
  cMET: number;
  EGFR: number;
  HER_2: number;
  HER_2_co: number;
  PIK3CA: number;
  ROS1: number;
  RET: number;
  UGT1A1: number;
  ALKSam: string;
  BIMSam: string;
  BRAFSam: string;
  cMETSam: string;
  EGFRSam: string;
  HER_2Sam: string;
  HER_2_coSam: string;
  PIK3CASam: string;
  ROS1Sam: string;
  RETSam: string;
  UGT1A1Sam: string;
  ALKDetMed: number;
  BIMDetMed: number;
  BRAFDetMed: number;
  cMETDetMed: number;
  EGFRDetMed: number;
  HER_2DetMed: number;
  HER_2_coDetMed: number;
  PIK3CADetMed: number;
  ROS1DetMed: number;
  RETDetMed: number;
  UGT1A1DetMed: number;
  ALKDesc: string;
  BIMDesc: string;
  BRAFDesc: string;
  cMETDesc: string;
  EGFRDesc: string;
  HER_2Desc: string;
  HER_2_coDesc: string;
  PIK3CADesc: string;
  ROS1Desc: string;
  RETDesc: string;
  UGT1A1Desc: string;
  path: string;
  MSI: number;
  PDL1: number;
  TMB: string;
}
