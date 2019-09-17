let obj = {
  doucment: [
    {
      dbType: 'all',
      dbTypeName: '夸库',
      searchFields: [
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
          key: 'dbType',
          value: 'dbType',
          name: '数据库类别',
        },
      ],
    },
    {
      dbType: 'document_db_type_0',
      dbTypeName: '政策法规',
      searchFields: [
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
          key: 'keyWords',
          value: 'keyWords',
          name: '关键词',
        },
        {
          key: 'subjectType',
          value: 'subjctType',
          name: '主题分类',
        },
        {
          key: 'effectivePowerLevel',
          value: 'effectivePowerLevel',
          name: '效力级别',
        },
        {
          key: 'timelines',
          value: 'timelines',
          name: '时效性',
        },
      ],
    },
    {
      dbType: 'document_db_type_1',
      dbTypeName: '行业标准',
      searchFields: [
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
          key: 'subjectType',
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
    },
    {
      dbType: 'document_db_type_2',
      dbTypeName: '行业专利',
      searchFields: [
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
          key: 'subjectType',
          value: 'subjectType',
          name: '主题分类',
        },
      ],
    },
    {
      dbType: 'document_db_type_3',
      dbTypeName: '发文咨询',
      searchFields: [
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
    },
    {
      dbType: 'document_db_type_4',
      dbTypeName: '会议报告',
      searchFields: [
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
    },
    {
      dbType: 'document_db_type_5',
      dbTypeName: '新闻事件',
      searchFields: [
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
    },
  ],
  orgDb: [
    {
      dbType: 'type_all',
      dbTypeName: '机构夸库',
      searchFields: [
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
          key: 'orgType',
          value: 'orgType',
          name: '机构分类',
        },
      ],
    },
    {
      dbType: 'org_db_type_1',
      dbTypeName: '政府部门',
      searchFields: [
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
      dbType: 'org_db_type_2',
      dbTypeName: '医疗机构',
      searchFields: [
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
    {
      dbType: 'org_db_type_3',
      dbTypeName: '科研机构',
      searchFields: [
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
  ],
  companyDb: [
    {
      dbType: 'db_all',
      dbTypeName: '企业数据库',
      searchFields: [
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
      dbType: 'company_type_1',
      dbTypeName: '竞争对手',
      searchFields: [
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
      dbType: 'company_type_2',
      dbTypeName: '合作企业',
      searchFields: [
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
      dbType: 'company_type_3',
      dbTypeName: '生态企业',
      searchFields: [
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
  ],
  personDb: [
    {
      dbType: 'db_type_all',
      dbTypeName: '人员库夸库',
      searchFields: [
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
      dbType: 'person_db_type_01',
      dbTypeName: '政府官员',
      searchFields: [
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
      dbType: 'person_db_type_02',
      dbTypeName: '专家学者',
      searchFields: [
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
      dbType: 'person_db_type_03',
      dbTypeName: '企业领导',
      searchFields: [
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
      dbType: 'person_db_type_04',
      dbTypeName: '销售/市场人员',
      searchFields: [
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
  ],
  innerResourceDb: [
    {
      dbType: 'type_all',
      dbTypeName: '内部资源',
      searchFields: [
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
  ],
};
