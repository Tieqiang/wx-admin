import {
  queryPersonnelList,
  loadPersionType,
  savePersonnel,
  getPersonById,
  setPersonStatus,
  getPersonContractList,
  getPersonImportantInformList,
  savePersonImprotInformation,
  deletePersonInformation,
  savePersonContract,
  deletePersonContract,
  getPersonDbProjectsByPersonId,
  savePersonDbProjects,
  deletePersonDbProjectsById,
  getPersonDbCompanyByPersonId,
  savePersonDbCompany,
  deletePersonDbComnpanyById,
} from '@/services/sensation/personnel/';

const PersonnelModel = {
  namespace: 'personnel',
  state: {
    data: {}, // 数据详情
    loading: true,
    personType: [],
    currentPerson: {
      id: '',
      personDb: {
        birthday: '',
        birthplace: '',
        companyInCharge: '',
        contributionToCompany: '',
        createDate: 0,
        creator: '',
        degree: '',
        entryTime: '',
        graduatedSchool: '',
        handoverTime: '',
        hobby: '',
        id: '',
        jobDesc: '',
        keyWordsId: '',
        lastUpdateDate: 0,
        leaveTime: '',
        name: '',
        orgName: '',
        otherInfo: '',
        patentInfo: '',
        personGlory: '',
        personTypeId: '',
        projectInCharge: '',
        projectPerson: '',
        remark: '',
        researchDocument: '',
        researchProject: '',
        researchTitle: '',
        researchWay: '',
        resume: '',
        sex: '',
        status: '',
        subjectId: '',
        tel: '',
        title: '',
        withProjects: '',
      },
      personDbType: {
        id: '',
      },
      subjectClass: {
        id: '',
      },
    },
    personContractList: [],
    personImportantInformationList: [],
    companyInCharge: [], //负责企业
    projectInCharge: [], //负责的项目
  },
  effects: {
    *getProjectInCharge({ payload }, { call, put }) {
      let response = yield call(getPersonDbProjectsByPersonId, payload.personId);
      yield put({
        type: 'setProjectInCharge',
        payload: response,
      });
    },
    *getCompanyInCharge({ payload }, { call, put }) {
      let response = yield call(getPersonDbCompanyByPersonId, payload.personId);
      yield put({
        type: 'setCompanyInCharge',
        payload: response,
      });
    },
    *saveProjectInCharge({ payload }, { call }) {
      return yield call(savePersonDbProjects, payload);
    },
    *saveCompanyInCharge({ payload }, { call }) {
      return yield call(savePersonDbCompany, payload);
    },
    *deleteProjectInCharge({ payload }, { call }) {
      return yield call(deletePersonDbProjectsById, payload.personId);
    },
    *deleteCompanyInCharge({ payload }, { call }) {
      return yield call(deletePersonDbComnpanyById, payload.id);
    },
    *getPersonContractList({ payload }, { call, put }) {
      let response = yield call(getPersonContractList, payload.personId);
      yield put({
        type: 'setPersonContractList',
        payload: response,
      });
    },
    *savePersonContract({ payload }, { call }) {
      return yield call(savePersonContract, payload);
    },
    *getPersonImportantInfoList({ payload }, { call, put }) {
      let response = yield call(getPersonImportantInformList, payload.personId);
      yield put({
        type: 'setPersonImportantInformList',
        payload: response,
      });
    },
    *savePersonImprotInformation({ payload }, { call }) {
      return yield call(savePersonImprotInformation, payload);
    },
    *deletePersonInformation({ payload }, { call }) {
      return yield call(deletePersonInformation, payload.personId);
    },
    *deletePersonContract({ payload }, { call }) {
      return yield call(deletePersonContract, payload.personId);
    },

    *getPersonnelListData({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryPersonnelList, payload);
      yield put({
        type: 'setListData',
        payload: response,
      });
      yield put({
        //结束页面加载动画
        type: 'changeLoading',
        payload: false,
      });
    },
    *loadPersonType({ payload }, { call, put }) {
      let response = yield call(loadPersionType, payload);
      yield put({
        type: 'setPersonType',
        payload: response,
      });
    },
    *loadCurrentPerson({ payload }, { call, put }) {
      let response = yield call(getPersonById, payload.id);
      yield put({
        type: 'setCurrentPerson',
        payload: response,
      });
    },
    *saveCurrentPerson({ payload }, { call }) {
      return yield call(savePersonnel, payload);
    },
    *setPersonStatus({ payload }, { call }) {
      return yield call(setPersonStatus, payload.id, payload.status);
    },
  },
  reducers: {
    setProjectInCharge(state, { payload }) {
      return {
        ...state,
        projectInCharge: payload,
      };
    },
    setCompanyInCharge(state, { payload }) {
      return {
        ...state,
        companyInCharge: payload,
      };
    },
    setPersonContractList(state, { payload }) {
      return {
        ...state,
        personContractList: payload,
      };
    },
    setPersonImportantInformList(state, { payload }) {
      return {
        ...state,
        personImportantInformationList: payload,
      };
    },
    setListData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setPersonType(state, { payload }) {
      return {
        ...state,
        personType: payload,
      };
    },
    setCurrentPerson(state, { payload }) {
      return {
        ...state,
        currentPerson: {
          ...payload,
        },
      };
    },
  },
};
export default PersonnelModel;
