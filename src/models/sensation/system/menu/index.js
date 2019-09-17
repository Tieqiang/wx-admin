
import MenuService from "@/services/sensation/system/menu"

export  default {
  namespace:"menu",
  state: {
    menus:[]
  },
  effects:{
    loadAllMenus:function*({payload},{call,put}){
      let response = yield call(MenuService.loadAllMenus,payload.sysId) ;
      yield put({
        type:"setMenus",
        payload:response
      }) ;
    }
  },
  reducers:{
    setMenus:(state,{payload})=>{
      return {
        ...state,
        menus:payload
      }
    }
  }
}
