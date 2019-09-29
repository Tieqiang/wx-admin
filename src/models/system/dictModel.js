import DictManagerService from '@/services/system/DictManagerService'

export default {
  namespace: "dictModel",
  state: {
    dictTypePage: {
      records: [],
    },
    currentKeyValue: []
  },
  effects: {
    * getDictTypeByPage({payload}, {call, put}) {
      let response = yield call(DictManagerService.getDictTypeByPage, payload.typeName, payload.pageSize, payload.current);
      yield put({
        type: "saveDictTypePage",
        payload: response
      })
    },
    * getDictValues({payload}, {call, put}) {
      let response = yield call(DictManagerService.getDictValues,payload.dictType) ;
      yield put({
        type:"saveCurrentKeyValues",
        payload:response
      })
    },
    removeDict({payload},{call}){
      return call(DictManagerService.removeDict,payload.id) ;
    },
    removeDictType({payload},{call}){
      return call(DictManagerService.removeDictType,payload.id);
    },
    saveDictType({payload},{call}){
      return call(DictManagerService.saveDictType,payload)
    }
  },
  reducers: {
    saveDictTypePage(state, {payload}) {
      return {
        ...state,
        dictTypePage: {
          ...payload
        }
      }
    },
    saveCurrentKeyValues(state, {payload}) {
      return {
        ...state,
        currentKeyValue: payload
      }
    }

  }
}