import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { querydetail } from './service';
import moment from 'moment';

export interface StateType {
  code?: 200;
  data?: {};
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    detail: Effect;
  };
  reducers: {
    getDetail: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'crfDetail',

  state: {
    data: undefined,
  },

  effects: {
    *detail({ payload }, { call, put }) {
      const response = yield call(querydetail, payload);
      yield put({
        type: 'getDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getDetail(state, { payload }) {
      var patient = payload.data.Patient[0];
      patient['birthday'] = moment(patient['birthday']);
      payload.data['Patient'] = patient;
      console.log(payload.data);
      return { ...state, data: payload.data };
    },
  },
};

export default Model;
