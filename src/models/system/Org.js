import OrgService from "@/services/system/OrgService"
const Org = {
  namespace: 'org',
  state:{
    orgs:[]
  },
  effects: {
    loadAllOrg:function* ({payload},{call,put}){
      let response = yield call(OrgService.loadAllOrg,payload.sysId,payload.orgName) ;
      yield put({
        type:"setOrgs",
        payload:response
      })
    }
  },
  reducers: {
    setOrgs(state,{payload}){
      return {
        ...state,
        orgs:payload
      }
    }
  }

};
export default Org;
