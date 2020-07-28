import request from '../../BasicComponents/request';
import getCookie from '../../BasicComponents/request';
import { QueryListItem, TableListParams } from './data.d';

export async function query(params?: QueryListItem) {
  return request('/api/illCase/find', {
    params,
  });
}
export async function deletelist(params?: any) {
  return request('/api/illCase/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function excelDownload(url, options) {
  options.body = JSON.stringify({
    method: options.method,
    pid: options.body.pid,
  });

  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    token: getCookie('token'),
    ...options.headers,
  };

  fetch(url, options)
    .then(response => response.blob())
    .then(blobData => {
      download(blobData, 'result.xls');
    });
}

function download(blobData: Blob, forDownLoadFileName: string | null): any {
  const aLink = document.createElement('a');
  document.body.appendChild(aLink);
  aLink.style.display = 'none';
  aLink.href = window.URL.createObjectURL(blobData);
  aLink.setAttribute('download', forDownLoadFileName);
  aLink.click();
  document.body.removeChild(aLink);
}

export async function exportExcel(params) {
  return excelDownload('http://localhost:8001/api/export', {
    method: 'POST',
    body: params,
  });
}

export async function queryRule(params?: TableListParams) {
  return request('/api/list', {
    params,
  });
}

export async function screen(params: any) {
  return request('/api/illCase/screen', {
    method: 'POST',
    data: {
      ...params,
    },
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
