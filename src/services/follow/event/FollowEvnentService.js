import request from '@/utils/request';
import { async } from 'q';

const BASE_URL = "/api/wx/follow-event";

export default {
  /**
   * 获取事件类型分页信息
   * @param {每页的数量} pageSize 
   * @param {当前页码} current 
   * @param {事件类型} eventType 
   * @param {事件名称} eventName 
   */
  getFollowEvents: async function (pageSize = 10, current = 1, eventType, eventName) {
    return request(BASE_URL, {
      method: 'get', params: {
        eventType:eventType,
        eventName:eventName
      }
    })
  },
  mergeFollowEvent:async (followEvent)=>{
    return request(BASE_URL,{
      method:"post",
      data:{
        ...followEvent
      }
    })
  },
  deleteFollowEvent:async (id)=>{
    return request(BASE_URL,{
      method:"delete",
      params:{
        id:id
      }
    })
  }
}