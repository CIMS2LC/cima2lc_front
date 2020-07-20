import request from 'umi-request';
import { PatientItem, TableListParams } from './data.d';

export async function Patientsave(params?: PatientItem) {
  return request('/patient/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function querydetail(params?: TableListParams) {
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
