import React, { Component } from 'react';
import { Breadcrumb, Icon, Col, Row } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import Link from 'umi/link';

class FooterBox extends Component {
  getCopyright() {
    const { hasCopyRight } = this.props;
    if (hasCopyRight) {
      return (
        <div className={styles.footerCopyright}>
          公司地址：中国北京市海淀区知春路7号（致真大厦C座） Copyright 2005- CEC版权所有 All Rights
          Reserved 京ICP备15015975号
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    return (
      <div className={styles.footerBox}>
        <div className={styles.footerContent}>
          <Row>
            <Col span={4}>
              <img src="assets-front/logo@1x.png" />
            </Col>
            <Col span={4}>
              <ul className={styles.typeList}>
                <li className={styles.typeTitle}>
                  <div>文献咨询</div>
                  <hr />
                </li>
                <li>
                  <Link to="/document?typeName=政策法规&dbTypeId=document_db_type_0">
                    &gt; 政策法规
                  </Link>
                </li>
                <li>
                  <Link to="/document?typeName=行业标准&dbTypeId=document_db_type_1">
                    &gt; 行业标准
                  </Link>
                </li>
                <li>
                  <Link to="/document?typeName=行业专利&dbTypeId=document_db_type_2">
                    &gt; 行业专利
                  </Link>
                </li>
                <li>
                  <Link to="/document?typeName=发文资讯&dbTypeId=document_db_type_3">
                    &gt; 发文资讯
                  </Link>
                </li>
                <li>
                  <Link to="/document?typeName=会议报告&dbTypeId=document_db_type_4">
                    &gt; 会议报告
                  </Link>
                </li>
                <li>
                  <Link to="/document?typeName=新闻事件&dbTypeId=document_db_type_5">
                    &gt; 新闻事件
                  </Link>
                </li>
              </ul>
            </Col>
            <Col span={4}>
              <ul className={styles.typeList}>
                <li className={styles.typeTitle}>
                  <div>人员信息</div>
                  <hr />
                </li>
                <li>
                  <Link to="/personal?typeName=政府官员&dbTypeId=person_db_type_01">
                    &gt; 政府官员
                  </Link>
                </li>
                <li>
                  <Link to="/personal?typeName=专家学者&dbTypeId=person_db_type_02">
                    &gt; 专家学者
                  </Link>
                </li>
                <li>
                  <Link to="/personal?typeName=企业领导&dbTypeId=person_db_type_03">
                    &gt; 企业领导
                  </Link>
                </li>
                <li>
                  <Link to="/personal?typeName=销售人员&dbTypeId=person_db_type_04">
                    &gt; 销售人员
                  </Link>
                </li>
              </ul>
            </Col>
            <Col span={4}>
              <ul className={styles.typeList}>
                <li className={styles.typeTitle}>
                  <div>机构信息</div>
                  <hr />
                </li>
                <li>
                  <Link to="/org?typeName=政府部门&dbTypeId=org_db_type_1">&gt; 政府部门</Link>
                </li>
                <li>
                  <Link to="/org?typeName=科研机构&dbTypeId=org_db_type_2">&gt; 科研机构</Link>
                </li>
                <li>
                  <Link to="/org?typeName=医疗机构&dbTypeId=org_db_type_3">&gt; 医疗机构</Link>
                </li>
              </ul>
            </Col>
            <Col span={4}>
              <ul className={styles.typeList}>
                <li className={styles.typeTitle}>
                  <div>企业信息</div>
                  <hr />
                </li>
                <li>
                  <Link to="/enterprise?typeName=竞争对手&dbTypeId=company_type_1">
                    &gt; 竞争对手
                  </Link>
                </li>
                <li>
                  <Link to="/enterprise?typeName=合作企业&dbTypeId=company_type_2">
                    &gt; 合作企业
                  </Link>
                </li>
                <li>
                  <Link to="/enterprise?typeName=生态企业&dbTypeId=company_type_3">
                    &gt; 生态企业
                  </Link>
                </li>
              </ul>
            </Col>
            <Col span={4}>
              <ul className={styles.typeList}>
                <li className={styles.typeTitle}>
                  <div>内部信息</div>
                  <hr />
                </li>
                <li>
                  <Link to="/inner?typeName=行业简报&dbTypeId=inner_information_type_0">
                    &gt; 行业简报
                  </Link>
                </li>
                <li>
                  <Link to="/inner?typeName=会议报告&dbTypeId=inner_information_type_1">
                    &gt; 会议报告
                  </Link>
                </li>
                <li>
                  <Link to="/inner?typeName=产品介绍&dbTypeId=inner_information_type_2">
                    &gt; 产品介绍
                  </Link>
                </li>
                <li>
                  <Link to="/inner?typeName=数据报告&dbTypeId=inner_information_type_3">
                    &gt; 数据报告
                  </Link>
                </li>
                <li>
                  <Link to="/inner?typeName=部门报告&dbTypeId=inner_information_type_4">
                    &gt; 部门报告
                  </Link>
                </li>
                <li>
                  <Link to="/inner?typeName=其他&dbTypeId=inner_information_type_5">&gt; 其他</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
        {this.getCopyright()}
      </div>
    );
  }
}

export default FooterBox;
