import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { querydetail } from './service';

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
      return { ...state, data: payload.data };
    },
  },
};

export default Model;
