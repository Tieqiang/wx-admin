const documentTypes = () => {
  let dbTypes = [
    {
      value: '',
      key: 'all',
      name: '全部',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '标题',
        },
        {
          key: 'author',
          value: 'author',
          name: '作者',
        },
        {
          key: 'sourceName',
          value: 'sourceName',
          name: '来源名称',
        },
      ],
      filterFields: [
        {
          key: 'year',
          value: 'year',
          name: '发表时间',
        },
        {
          key: 'documentTypeId',
          value: 'documentTypeId',
          name: '数据库类别',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '标题',
          dataIndex: 'titleCn',
          key: 'titleCn',
          // width: 140,
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '发表时间',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
        {
          title: '数据库类别',
          dataIndex: 'documentTypeId',
          key: 'documentTypeId',
          width: 120,
        },
      ],
    },
    {
      value: 'document_db_type_0',
      key: 'document_db_type_0',
      name: '政策法规',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'author',
          value: 'author',
          name: '发布机关',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '标题',
        },
        {
          key: 'pubDocumentNo',
          value: 'pubDocumentNo',
          name: '发文文号',
        },
      ],
      filterFields: [
        {
          key: 'year',
          value: 'year',
          name: '发布日期',
        },
        {
          key: 'keywordIds',
          value: 'keywordIds',
          name: '关键词',
        },
        {
          key: 'subjectType',
          value: 'subjectType',
          name: '主题分类',
        },
        {
          key: 'effectivePowerLevel',
          value: 'effectivePowerLevel',
          name: '效力级别',
        },
        {
          key: 'timeliness',
          value: 'timeliness',
          name: '时效性',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '标题',
          dataIndex: 'titleCn',
          key: 'titleCn',
          width: 140,
        },
        {
          title: '发布机关',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '发布日期',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '发文文号',
          dataIndex: 'pubDocumentNo',
          key: 'pubDocumentNo',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
      ],
    },
    {
      value: 'document_db_type_1',
      key: 'document_db_type_1',
      name: '行业标准',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'author',
          value: 'author',
          name: '起草人',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '中文标准名称',
        },
      ],
      filterFields: [
        {
          key: 'stdType',
          value: 'stdType',
          name: '标准类别',
        },
        {
          key: 'stdStatus',
          value: 'stdStatus',
          name: '标准状态',
        },
        {
          key: 'subjctType',
          value: 'subjectType',
          name: '主题分类',
        },
        {
          key: 'year',
          value: 'year',
          name: '发表时间',
        },
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '英文标准名称',
          dataIndex: 'titleEn',
          key: 'titleEn',
          width: 140,
        },
        {
          title: '中文标准名称',
          dataIndex: 'titleCn',
          key: 'titleCn',
          width: 140,
        },
        {
          title: '标准状态',
          dataIndex: 'stdStatus',
          key: 'stdStatus',
          width: 140,
        },
        {
          title: '标准类别',
          dataIndex: 'stdType',
          key: 'stdType',
          width: 140,
        },
        {
          title: '发布日期',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '起草人',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
      ],
    },
    {
      value: 'document_db_type_2',
      key: 'document_db_type_2',
      name: '行业专利',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'author',
          value: 'author',
          name: '申请人',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '专利名称',
        },
        {
          key: 'applyNo',
          value: 'applyNo',
          name: '申请号',
        },
      ],
      filterFields: [
        {
          key: 'patentType',
          value: 'patentType',
          name: '专利类型',
        },
        {
          key: 'year',
          value: 'year',
          name: '公开日期',
        },
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
        {
          key: 'subjctType',
          value: 'subjectType',
          name: '主题分类',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '申请号',
          dataIndex: 'applyNo',
          key: 'applyNo',
          width: 140,
        },
        {
          title: '专利名称',
          dataIndex: 'titleCn',
          key: 'titleCn',
          width: 140,
        },
        {
          title: '申请日期',
          dataIndex: 'applyDate',
          key: 'applyDate',
          width: 140,
        },
        {
          title: '公开日期',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '申请人',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
      ],
    },
    {
      value: 'document_db_type_3',
      key: 'document_db_type_3',
      name: '发文资讯',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'authorOrg',
          value: 'authorOrg',
          name: '作者机构',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '标题',
        },
        {
          key: 'applyNo',
          value: 'applyNo',
          name: '申请号',
        },
      ],
      filterFields: [
        {
          key: 'year',
          value: 'year',
          name: '发表时间',
        },
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
        {
          key: 'subjectType',
          value: 'subjectType',
          name: '主题分类',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '标题',
          dataIndex: 'titleCn',
          key: 'titleCn',
          width: 140,
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '作者机构',
          dataIndex: 'authorOrg',
          key: 'authorOrg',
          width: 140,
        },
        {
          title: '发表时间',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
      ],
    },
    {
      value: 'document_db_type_4',
      key: 'document_db_type_4',
      name: '会议报告',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '标题',
        },
        {
          key: 'author',
          value: 'author',
          name: '作者',
        },
      ],
      filterFields: [
        {
          key: 'year',
          value: 'year',
          name: '会议时间',
        },
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
        {
          key: 'subjectType',
          value: 'subjectType',
          name: '主题分类',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '标题',
          dataIndex: 'titleCn',
          key: 'titleCn',
          width: 140,
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '作者机构',
          dataIndex: 'authorOrg',
          key: 'authorOrg',
          width: 140,
        },
        {
          title: '会议时间',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '会议地点',
          dataIndex: 'meetingAddress',
          key: 'meetingAddress',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
      ],
    },
    {
      value: 'document_db_type_5',
      key: 'document_db_type_5',
      name: '新闻事件',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'titleCn',
          value: 'titleCn',
          name: '标题',
        },
        {
          key: 'author',
          value: 'author',
          name: '作者',
        },
        {
          key: 'authorOrg',
          value: 'authorOrg',
          name: '作者机构',
        },
      ],
      filterFields: [
        {
          key: 'year',
          value: 'year',
          name: '发表时间',
        },
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
        {
          key: 'subjectType',
          value: 'subjectType',
          name: '主题分类',
        },
      ],
      columns: [
        {
          title: '序号',
          render: (text, record, index) => `${index + 1}`,
          key: 'id',
          align: 'center',
          // fixed: 'left',
          width: 60,
        },
        {
          title: '标题',
          dataIndex: 'titleCn',
          key: 'titleCn',
          width: 140,
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
          width: 140,
        },
        {
          title: '作者机构',
          dataIndex: 'authorOrg',
          key: 'authorOrg',
          width: 140,
        },
        {
          title: '发表时间',
          dataIndex: 'publishTime',
          key: 'publishTime',
          width: 140,
        },
        {
          title: '来源名称',
          dataIndex: 'sourceName',
          key: 'sourceName',
          width: 140,
        },
      ],
    },
  ];
  return dbTypes;
};
const enterpriseTypes = () => {
  let dbTypes = [
    {
      value: '',
      key: 'all',
      name: '全部',
      searchOptions: [
        {
          key: 'companyName',
          value: 'companyName',
          name: '企业名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'area',
          value: 'area',
          name: '所属地',
        },
        {
          key: 'companyAttr',
          value: 'companyAttr',
          name: '企业性质',
        },
        {
          key: 'financingTimes',
          value: 'financingTimes',
          name: '融资轮次',
        },
        {
          key: 'runType',
          value: 'runType',
          name: '企业经营类别',
        },
        {
          key: 'companyTypeId',
          value: 'companyTypeId',
          name: '企业分类',
        },
      ],
    },
    {
      value: 'company_type_1',
      key: 'company_type_1',
      name: '竞争对手',
      searchOptions: [
        {
          key: 'companyName',
          value: 'companyName',
          name: '企业名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'area',
          value: 'area',
          name: '所属地',
        },
        {
          key: 'companyAttr',
          value: 'companyAttr',
          name: '企业性质',
        },
        {
          key: 'financingTimes',
          value: 'financingTimes',
          name: '融资轮次',
        },
        {
          key: 'runType',
          value: 'runType',
          name: '企业经营类别',
        },
      ],
    },
    {
      value: 'company_type_2',
      key: 'company_type_2',
      name: '合作企业',
      searchOptions: [
        {
          key: 'companyName',
          value: 'companyName',
          name: '企业名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'area',
          value: 'area',
          name: '所属地',
        },
        {
          key: 'companyAttr',
          value: 'companyAttr',
          name: '企业性质',
        },
        {
          key: 'financingTimes',
          value: 'financingTimes',
          name: '融资轮次',
        },
        {
          key: 'runType',
          value: 'runType',
          name: '企业经营类别',
        },
      ],
    },
    {
      value: 'company_type_3',
      key: 'company_type_3',
      name: '生态企业',
      searchOptions: [
        {
          key: 'companyName',
          value: 'companyName',
          name: '企业名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'area',
          value: 'area',
          name: '所属地',
        },
        {
          key: 'companyAttr',
          value: 'companyAttr',
          name: '企业性质',
        },
        {
          key: 'financingTimes',
          value: 'financingTimes',
          name: '融资轮次',
        },
        {
          key: 'runType',
          value: 'runType',
          name: '企业经营类别',
        },
        {
          key: 'inParkFlag',
          value: 'inParkFlag',
          name: '是否入住园区',
        },
        {
          key: 'parkName',
          value: 'parkName',
          name: '园区名称',
        },
      ],
    },
  ];
  return dbTypes;
};
const orgTypes = () => {
  let dbTypes = [
    {
      value: '',
      key: 'all',
      name: '全部',
      searchOptions: [
        {
          key: 'orgName',
          value: 'orgName',
          name: '机构名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'province',
          value: 'province',
          name: '所属地',
        },
        {
          key: 'orgTypeId',
          value: 'orgTypeId',
          name: '机构分类',
        },
      ],
    },
    {
      value: 'org_db_type_1',
      key: 'org_db_type_1',
      name: '政府部门',
      searchOptions: [
        {
          key: 'orgName',
          value: 'orgName',
          name: '机构名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'province',
          value: 'province',
          name: '所属地',
        },
      ],
    },
    {
      value: 'org_db_type_2',
      key: 'org_db_type_2',
      name: '科研机构',
      searchOptions: [
        {
          key: 'orgName',
          value: 'orgName',
          name: '机构名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'researchType',
          value: 'researchType',
          name: '科研机构类别',
        },
      ],
    },
    {
      value: 'org_db_type_3',
      key: 'org_db_type_3',
      name: '医疗机构',
      searchOptions: [
        {
          key: 'orgName',
          value: 'orgName',
          name: '医院名称',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'hospGrade',
          value: 'hospGrade',
          name: '医院级别',
        },
        {
          key: 'hospLevel',
          value: 'hospLevel',
          name: '医院等级',
        },
        {
          key: 'hospType',
          value: 'hospType',
          name: '医院类型',
        },
      ],
    },
  ];
  return dbTypes;
};

const personalTypes = () => {
  let dbTypes = [
    {
      value: '',
      key: 'all',
      name: '全部',
      searchOptions: [
        {
          key: 'name',
          value: 'name',
          name: '姓名',
        },
        {
          key: 'orgName',
          value: 'orgName',
          name: '所属单位',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [
        {
          key: 'personTypeId',
          value: 'personTypeId',
          name: '人员类别',
        },
      ],
    },
    {
      value: 'person_db_type_01',
      key: 'person_db_type_01',
      name: '政府官员',
      searchOptions: [
        {
          key: 'name',
          value: 'name',
          name: '姓名',
        },
        {
          key: 'orgName',
          value: 'orgName',
          name: '所属单位',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [],
    },
    {
      value: 'person_db_type_02',
      key: 'person_db_type_02',
      name: '专家学者',
      searchOptions: [
        {
          key: 'name',
          value: 'name',
          name: '姓名',
        },
        {
          key: 'orgName',
          value: 'orgName',
          name: '所属单位',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [],
    },
    {
      value: 'person_db_type_03',
      key: 'person_db_type_03',
      name: '企业领导',
      searchOptions: [
        {
          key: 'name',
          value: 'name',
          name: '姓名',
        },
        {
          key: 'orgName',
          value: 'orgName',
          name: '所属单位',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [],
    },
    {
      value: 'person_db_type_04',
      key: 'person_db_type_04',
      name: '销售/市场人员',
      searchOptions: [
        {
          key: 'name',
          value: 'name',
          name: '姓名',
        },
        {
          key: 'orgName',
          value: 'orgName',
          name: '所属单位',
        },
        {
          key: 'responsiblePerson',
          value: 'responsiblePerson',
          name: '负责人员',
        },
      ],
      filterFields: [],
    },
  ];
  return dbTypes;
};

const innerTypes = () => {
  let dbTypes = [
    {
      value: '',
      key: 'all',
      name: '全部',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
        {
          key: 'resourceType',
          value: 'resourceType',
          name: '资源类别',
        },
      ],
    },
    {
      value: 'inner_information_type_0',
      key: 'inner_information_type_0',
      name: '行业简报',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
    },
    {
      value: 'inner_information_type_1',
      key: 'inner_information_type_1',
      name: '会议报告',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
    },
    {
      value: 'inner_information_type_2',
      key: 'inner_information_type_2',
      name: '产品介绍',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
    },
    {
      value: 'inner_information_type_3',
      key: 'inner_information_type_3',
      name: '数据报告',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
    },
    {
      value: 'inner_information_type_4',
      key: 'inner_information_type_4',
      name: '部门报告',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
    },
    {
      value: 'inner_information_type_5',
      key: 'inner_information_type_5',
      name: '其他',
      searchOptions: [
        {
          value: 'text',
          key: 'text',
          name: '主题',
        },
        {
          key: 'title',
          value: 'title',
          name: '标题',
        },
        {
          key: 'writer',
          value: 'writer',
          name: '撰稿人',
        },
      ],
      filterFields: [
        {
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
      ],
    },
  ];
  return dbTypes;
};

export { documentTypes, enterpriseTypes, orgTypes, personalTypes, innerTypes };
