import React, { Component } from 'react';
import { Tree, Icon } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { TreeNode } = Tree;

class treeComponent extends Component {
  componentDidMount() {}
  onSelectChange = (selectedKeys, { node }) => {
    this.props.onchangeTree(node.props);
  };
  render() {
    return (
      <Tree onSelect={this.onSelectChange}>
        <TreeNode title="文献资讯" key="document" href="/document" isAll={true}>
          <TreeNode title="政策法规" key="document_db_type_0" href="/document"></TreeNode>
          <TreeNode title="行业标准" key="document_db_type_1" href="/document"></TreeNode>
          <TreeNode title="行业专利" key="document_db_type_2" href="/document"></TreeNode>
          <TreeNode title="发文资讯" key="document_db_type_3" href="/document"></TreeNode>
          <TreeNode title="会议报告" key="document_db_type_4" href="/document"></TreeNode>
          <TreeNode title="新闻事件" key="document_db_type_5" href="/document"></TreeNode>
        </TreeNode>
        <TreeNode title="人员信息" key="personal" href="/personal" isAll={true}>
          <TreeNode title="政府官员" key="person_db_type_01" href="/personal"></TreeNode>
          <TreeNode title="专家学者" key="person_db_type_02" href="/personal"></TreeNode>
          <TreeNode title="企业领导" key="person_db_type_03" href="/personal"></TreeNode>
          <TreeNode title="销售/市场人员" key="person_db_type_04" href="/personal"></TreeNode>
        </TreeNode>
        <TreeNode title="机构信息" key="org" href="/org" isAll={true}>
          <TreeNode title="政府部门" key="org_db_type_1" href="/org"></TreeNode>
          <TreeNode title="科研机构" key="org_db_type_2" href="/org"></TreeNode>
          <TreeNode title="医疗机构" key="org_db_type_3" href="/org"></TreeNode>
        </TreeNode>
        <TreeNode title="企业信息" key="enterprise" href="/enterprise" isAll={true}>
          <TreeNode title="竞争对手" key="company_type_1" href="/enterprise"></TreeNode>
          <TreeNode title="合作企业" key="company_type_2" href="/enterprise"></TreeNode>
          <TreeNode title="生态企业" key="company_type_3" href="/enterprise"></TreeNode>
        </TreeNode>
        <TreeNode title="内部信息" key="inner" href="/inner" isAll={true}>
          <TreeNode title="行业简报" key="inner_information_type_0" href="/inner"></TreeNode>
          <TreeNode title="会议报告" key="inner_information_type_1" href="/inner"></TreeNode>
          <TreeNode title="产品介绍" key="inner_information_type_2" href="/inner"></TreeNode>
          <TreeNode title="数据报告" key="inner_information_type_3" href="/inner"></TreeNode>
          <TreeNode title="部门报告" key="inner_information_type_4" href="/inner"></TreeNode>
          <TreeNode title="其他" key="inner_information_type_5" href="/inner"></TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}
export default treeComponent;
