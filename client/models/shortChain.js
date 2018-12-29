
import { message } from 'antd';
import { shortChainCreate, shortChainList, shortChainDestroy, shortChainRemoves,upDatashortChain } from '../services/api';
export default {
  namespace: 'shortChain',
  state: {
    code: -1,
    data: {},
    msg:'',
    visible:false,
    // 查询条件
    query:{
      pageSize:10,
      currentPage:1
    }
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(shortChainCreate, payload);
      if(response.code === 0){
        const res = yield call(shortChainList, payload.query);
        yield put({
          type: 'setModelVisible',
          payload: false 
        })
        yield put({
          type: 'queryList',
          payload: res 
        })

      }
      
    },
    *update({ payload }, { call, put }){
      const res = yield call(upDatashortChain, payload)
      if(res.code === 0){
        yield put({
          type: 'setModelVisible',
          payload: false 
        })
        const response = yield call(shortChainList, payload.query);
        if(response.code === 0){
          yield put({
            type: 'queryList',
            payload: response 
          })
        } 
      }
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(shortChainList, payload);
      if(response.code === 0){
        yield put({
          type: 'queryList',
          payload: response 
        })
      }
    
    },
    *remove({payload }, { call, put }) {
      const res =  yield call(shortChainDestroy,payload)
      if(res.code === 0){
        const response = yield call(shortChainList, payload.query)
        if(response.code === 0){
          yield put({
            type: 'queryList',
            payload: response 
          })
        }
      }
    },
    *removes({payload }, { call, put }) {
      const res = yield call(shortChainRemoves,payload)
      if(res.code === 0){
        const response = yield call(shortChainList, payload.query)
        if(response.code === 0){
          yield put({
            type: 'queryList',
            payload: response 
          })
        }
      }
    }
  },

  reducers: {
    setModelVisible(state, action){
      return {
        ...state,
        visible:action.payload
      }
    },
    setQuery(state, action){
      return {
        ...state,
        query:action.payload
      }
    },
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    
  },
};
