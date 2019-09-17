import * as enterpriseService from '@/services/sensation/enterprise';
const Modal = {
  namespace: 'enterprise',
  state: {
    data: {
      records: [],
    },
    loading: false,
    companyTypeList: [],
    currentData: {},
    companyProductsList: [], // 产品/解决方案
    companyCertificateList: [], // 资质证书
    companyBiddingList: [], // 招投标列表
    companyEcologicalList: [], // 生态企业 产品/服务
    companyPartnersList: [], // 合作伙伴
    companyCompetitorList: [], // 竞争对手
    companyContractList: [], // 洽谈列表
    companyImportantInformationList: [], // 重要资料
    companyFinancingRecordList: [], // 融资历程
    companyStockholderList: [], // 股东及出资信息
    companyForeignInvestmentList: [],
    companyImportantPersonList: [], // 核心成员
    companyHistoryList: [], // 发展历史
  },
  effects: {
    *getListData({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(enterpriseService.queryEnterpriseList, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({
        //结束页面加载动画
        type: 'changeLoading',
        payload: false,
      });
    },
    *getListDataById({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryEnterpriseListById, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'saveCurrentData',
        payload: response,
      });
    },
    *getCompanyTypeList({ payload }, { call, put }) {
      const response = yield call(enterpriseService.queryCompanyTypeList, payload);
      yield put({
        type: 'saveCompanyTypeList',
        payload: response,
      });
    },
    *updateEnterpriseInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveEnterprise, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *removeOneCompany({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeCompany, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
      // return removeUser(payload);
    },
    *modifyCompanyStatus({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.setCompanyStatus, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
      // return removeUser(payload);
    },
    *getCompanyFinancingList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyFinancingList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyFinancingList',
        payload: response,
      });
    },
    *getCompanyStockholderList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyStockholderList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyStockholderList',
        payload: response,
      });
    },
    *getCompanyForeignInvestmentList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyForeignInvestmentList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyForeignInvestmentList',
        payload: response,
      });
    },
    *getCompanyImportantPersonList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyImportantPersonList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyImportantPersonList',
        payload: response,
      });
    },
    *getCompanyHistoryList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyHistoryList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyHistoryList',
        payload: response,
      });
    },
    *getCompanyEcologicalList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyEcologicalList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyEcologicalList',
        payload: response,
      });
    },
    *getCompanyPartnersList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyPartnersList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyPartnersList',
        payload: response,
      });
    },
    *getCompanyCompetitorsList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyCompetitorsList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyCompetitorsList',
        payload: response,
      });
    },
    *getCompanyContractList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyContractList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyContractList',
        payload: response,
      });
    },
    *getCompanyImportantInfoList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyImportantInfoList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyImportantInfoList',
        payload: response,
      });
    },
    *getCompanyProductsList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyProductsList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyProductsList',
        payload: response,
      });
    },
    *getCompanyCertificateList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyCertificateList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyCertificateList',
        payload: response,
      });
    },
    *getCompanyBiddingList({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.queryAllCompanyBiddingList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveCompanyBiddingList',
        payload: response,
      });
    },
    *updateEcologicalInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyEcological, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updatePartnersInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyPartners, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateCompetitorsInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyCompetitors, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateContractInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyContract, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateImportantInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyImportantInfo, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateProductsInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyProducts, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateCertificateInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyCertificate, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateBiddingInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.saveCompanyBidding, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyEcological({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyEcological, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyPartners({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyPartners, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyCompetitors({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyCompetitors, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyContract({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyContract, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyImportantInfo({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyImportantInfo, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyProducts({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyProducts, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyCertificate({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyCertificate, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneCompanyBidding({ payload, callback }, { call, put }) {
      const response = yield call(enterpriseService.removeOneCompanyBidding, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
  },
  reducers: {
    saveData(state, action) {
      return {
        ...state,
        data: action.payload, //将数据返回给页面
      };
    },
    saveCurrentData(state, action) {
      return {
        ...state,
        currentData: action.payload, //将数据返回给页面
      };
    },
    saveCompanyTypeList(state, action) {
      return {
        ...state,
        companyTypeList: action.payload, //将数据返回给页面
      };
    },
    update(state, action) {
      return {
        ...state,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCompanyFinancingList(state, action) {
      return {
        ...state,
        companyFinancingRecordList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyStockholderList(state, action) {
      return {
        ...state,
        companyStockholderList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyForeignInvestmentList(state, action) {
      return {
        ...state,
        companyForeignInvestmentList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyImportantPersonList(state, action) {
      return {
        ...state,
        companyImportantPersonList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyHistoryList(state, action) {
      return {
        ...state,
        companyHistoryList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyEcologicalList(state, action) {
      return {
        ...state,
        companyEcologicalList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyPartnersList(state, action) {
      return {
        ...state,
        companyPartnersList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyCompetitorsList(state, action) {
      return {
        ...state,
        companyCompetitorList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyContractList(state, action) {
      return {
        ...state,
        companyContractList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyImportantInfoList(state, action) {
      return {
        ...state,
        companyImportantInformationList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyProductsList(state, action) {
      return {
        ...state,
        companyProductsList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyCertificateList(state, action) {
      return {
        ...state,
        companyCertificateList: action.payload, //将数据返回给页面
      };
    },
    saveCompanyBiddingList(state, action) {
      return {
        ...state,
        companyBiddingList: action.payload, //将数据返回给页面
      };
    },
  },
};
export default Modal;
