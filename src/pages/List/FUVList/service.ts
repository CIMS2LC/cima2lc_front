import request from '../../BasicComponents/request';
import { QueryListItem, TableListParams } from './data.d';

export async function query(params?: QueryListItem) {
  return request('/api/illCase/find', {
    params,
  });
}

export async function queryRule(params?: TableListParams) {
  return request('/api/list', {
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
