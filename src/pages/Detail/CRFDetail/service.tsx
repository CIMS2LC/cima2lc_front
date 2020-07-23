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
