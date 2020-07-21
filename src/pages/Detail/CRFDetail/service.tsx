import request from '../../BasicComponents/request';
import {
  PatientItem,
  PastHisItem,
  TableListParams,
  ImmunohisItem,
  MoleDetecItem,
  QueryParams,
} from './data.d';

export async function Patientsave(params?: PatientItem) {
  return request('/api/Patient/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function PastHissave(params?: PastHisItem) {
  return request('/api/PastHis/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function PastHisupdate(params?: PastHisItem) {
  return request('/api/PastHis/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function Immunohissave(params?: ImmunohisItem) {
  return request('/api/Immunohis/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function MoleDetecsave(params?: MoleDetecItem) {
  return request('/api/MoleDetec/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function querydetail(params?: QueryParams) {
  return request('/api/illCase/allinfo/find', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
