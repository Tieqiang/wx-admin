import SubjectService from '@/services/sensation/system/subject/SubjectService';

const SubjectModel = {
  namespace: 'subject',
  state: {
    SubjectPage: {},
    DbTypes: [],
    AllSubject: []
  },
  effects: {
    * loadSubjectPage({ payload }, { call, put }) {
      let response = yield call(SubjectService.findSubjectsByPage, payload.subjectName, payload.orgDbTypeId, payload.page, payload.pageSize);
      yield put({
        type: 'setSubjectPage',
        payload: {
          ...response
        }
      });
    },
    *loadSubjectPageByDbType({payload},{call}){
      let response = yield call(SubjectService.findSubjectsByPage, payload.subjectName, payload.orgDbTypeId, payload.page, payload.pageSize);
      return response ;
    },
    getDbTypes: function* ({ payload }, { call, put }) {
      let response = yield call(SubjectService.findSubjectDbTypes);
      yield put({
        type: 'setSubjectDbTypes',
        payload: response
      });
    },
    getDBTypeById: function* ({ payload }, { call }) {
      let response = yield call(SubjectService.findSubjectById, payload.id);
      return response;
    },
    getAllSubject: function* ({ payload }, { call, put }) {
      let response = yield call(SubjectService.findAllSubject,payload);
      yield put({
        type: 'setAllSubject',
        payload: response
      });
    },
    removeSubject: function* ({ payload }, { call }) {
      let response  = yield call(SubjectService.removeSubject,payload) ;
      return response ;
    },
    saveSubject:function*({payload},{call}){
      let response = yield call(SubjectService.saveSubject,payload)
      return response ;
    }
  },
  reducers: {
    setSubjectPage(state, { payload }) {
      return {
        ...state,
        SubjectPage: payload
      };
    },
    setSubjectDbTypes(state, { payload }) {
      return {
        ...state,
        DbTypes: payload
      };
    },
    setAllSubject(state, { payload }) {
      return {
        ...state,
        AllSubject: payload
      };
    }
  }
};
export default SubjectModel;
