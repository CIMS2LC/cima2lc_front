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
  return request('/api/IniDiaPro/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function IniDiaupdate(params?: any) {
  return request('/api/IniDiaPro/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function treRecsave(params?: any) {
  return request('/api/treatment/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function treRecupdate(params?: any) {
  return request('/api/treatment/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function sideEffectsave(params?: any) {
  return request('/api/SideEffect/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function sideEffectupdate(params?: any) {
  return request('/api/SideEffect/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function signssave(params?: any) {
  return request('/api/Signs/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function signsupdate(params?: any) {
  return request('/api/Signs/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function follInfosave(params?: any) {
  return request('/api/FollInfo/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function follInfoupdate(params?: any) {
  return request('/api/FollInfo/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function follInfodelete(params?: any) {
  return request('/api/FollInfo/delete', {
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
export async function illCaseFind(params?: any) {
  return request('/api/illCase/find', {
    params,
  });
}
export async function imageExamsupdate(params?: any) {
  return request('/api/ImageExams/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function otherExamsupdate(params?: any) {
  return request('/api/OtherExams/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function lungupdate(params?: any) {
  return request('/api/Lung/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function tumorMarkerupdate(params?: any) {
  return request('/api/TumorMarker/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function urineRoutineupdate(params?: any) {
  return request('/api/UrineRoutine/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function lymSubsetsupdate(params?: any) {
  return request('/api/LymSubsets/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function cytokinesupdate(params?: any) {
  return request('/api/Cytokines/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function myocardialEnzymeupdate(params?: any) {
  return request('/api/MyocardialEnzyme/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function coagulationupdate(params?: any) {
  return request('/api/Coagulation/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function thyroidupdate(params?: any) {
  return request('/api/Thyroid/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function bloodBioupdate(params?: any) {
  return request('/api/BloodBio/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function bloodRoutineupdate(params?: any) {
  return request('/api/BloodRoutine/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
