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
export async function Patientupdate(params?: PatientItem) {
  return request('/api/Patient/update', {
    method: 'PUT',
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
export async function Immunohisupdate(params?: ImmunohisItem) {
  return request('/api/Immunohis/update', {
    method: 'PUT',
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
export async function MoleDetecupdate(params?: MoleDetecItem) {
  return request('/api/MoleDetec/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function IniDiaProsave(params?: any) {
  return request('http://localhost:8001/api/IniDiaPro/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function IniDiaupdate(params?: any) {
  return request('http://localhost:8001/api/IniDiaPro/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function treRecsave(params?: any) {
  return request('http://localhost:8001/api/treRec/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function treRecupdate(params?: any) {
  return request('http://localhost:8001/api/treRec/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function sideEffectsave(params?: any) {
  return request('http://localhost:8001/api/sideEffect/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function sideEffectupdate(params?: any) {
  return request('http://localhost:8001/api/sideEffect/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function signssave(params?: any) {
  return request('http://localhost:8001/api/signs/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function signsupdate(params?: any) {
  return request('http://localhost:8001/api/signs/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function follInfosave(params?: any) {
  return request('http://localhost:8001/api/FollInfo/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function follInfoupdate(params?: any) {
  return request('http://localhost:8001/api/FollInfo/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function follInfodelete(params?: any) {
  return request('http://localhost:8001/api/FollInfo/delete', {
    method: 'DELETE',
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

export async function excelDownload(url, options) {
  options.body = JSON.stringify({
    method: options.method,
    pid: options.body.pid,
  });

  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    token:
      'eyJhbGciOiJIUzUxMiIsImlhdCI6MTU5NTU4MjY3OSwiZXhwIjoxNTk4MTc0Njc5fQ.eyJ1c2VyX2lkIjo1NCwic2NvcGVzIjpbIklucHV0Q1JGIiwiQ2hlY2tDUkYiLCJFeHBvcnQiLCJTdGF0c0FuYWx5c2lzIiwiQ2hlY2tBbGxTYW1wbGVzIl0sInJlc2VhcmNoX2NlbnRlcl9pZCI6MTd9.eAnmXQdWBr04zDVsNGqDKxb-5900BzI-c9nJLsATA_psT3biiGwzd_bqrYblJTAxXRsDjMCWfJOwFCMUt3uZsQ',
    ...options.headers,
  };

  fetch(url, options)
    .then(response => response.blob())
    .then(blobData => {
      download(blobData, 'result.xis');
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
