import ResourceService from '@/services/sensation/resource/';

const ResourceModel = {
  namespace: 'resource',
  state: {
    innerInformation: {
      records: [],
    },
    resourceTypes: [],
  },
  effects: {
    loadAllInnerInformation: function*({ payload }, { call, put }) {
      let response = yield call(
        ResourceService.loadAllInnerInformation,
        payload.resourceType,
        payload.status,
        payload.title,
        payload.uploadTime,
        payload.page,
        payload.pageSize,
      );
      yield put({
        type: 'setInnerInformation',
        payload: response,
      });
    },
    loadResourceType: function*({ payload }, { call, put }) {
      let response = yield call(ResourceService.loadResourceType);
      yield put({
        type: 'setResourceTypes',
        payload: response,
      });
    },
    saveResourceType: function*({ payload }, { call }) {
      return yield call(ResourceService.saveResourceType, payload);
    },
  },
  reducers: {
    setInnerInformation(state, { payload }) {
      return {
        ...state,
        innerInformation: payload,
      };
    },
    setResourceTypes(state, { payload }) {
      return {
        ...state,
        resourceTypes: payload,
      };
    },
  },
};
export default ResourceModel;
