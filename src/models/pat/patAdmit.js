import AdmitService from '@/services/pat/AdmitService'

export default {
  namespace: "patAdmitModel",
  state: {
    pats: {
      records: []
    }
  },
  effects: {
    * searchPats({payload}, {call, put}) {
      let response = yield call(AdmitService.searchPats, payload);
      console.log(response);
      yield put({
        type: "setPats",
        payload: response
      })
    },
    * savePat({payload}, {call}) {
      return yield call(AdmitService.savePat, payload);
    },
    * deletePat({payload}, {call}) {
      return yield call(AdmitService.deletePat, payload.id);
    }
  },
  reducers: {
    setPats(state, {payload}) {
      return {
        ...state,
        pats: payload
      }
    }
  }
}