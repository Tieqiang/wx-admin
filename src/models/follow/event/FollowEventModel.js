import FollowEventService from "@/services/follow/event/FollowEvnentService"
export default {
  namespace:"FollowEventModel",
  state:{
    followEventPage:{
      records:[]
    }
  },
  effects:{
    *getFollowEvent({payload},{call,put}){
      let response = yield call(FollowEventService.getFollowEvents,
        payload.pageSize,payload.current,payload.eventType,payload.eventName);
      yield put({
        type:"setFollowEventPage",
        payload:response
      })
    },
    *mergeFollowEvent({payload},{call}){
      return yield call(FollowEventService.mergeFollowEvent,payload)
    },
    *deleteFollowEvent({payload},{call}){
      return yield call(FollowEventService.deleteFollowEvent,payload.id);
    }
  },
  reducers:{
    setFollowEventPage(state,{payload}){
      return {
        ...state,
        followEventPage:{
          ...payload
        }
      }
    }
  }
}