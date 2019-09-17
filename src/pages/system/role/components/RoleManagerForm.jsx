import * as React from 'react';
import { Form, Col, Input, Row, Button } from 'antd';
import { connect } from 'dva';
import MenuTable from './MenuTable';

@connect(({ menu }) => ({ menu }))
class RoleManagerForm extends React.Component {
  state = {};
  menuTable = undefined;
  componentDidMount() {
    this.loadAllMenu();
  }

  constructor(props) {
    super(props);
    props.setRef(this);
  }
  loadAllMenu() {
    let { dispatch } = this.props;
    dispatch({
      type: 'menu/loadAllMenus',
      payload: {
        sysId: 1,
      },
    });
  }

  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  getRoleVsMenuList() {
    let { currentRole } = this.props;
    this.menuTable.roleVsMenuList.forEach(item => {
      if (!item.roleId) {
        item.roleId = currentRole.id;
      }
    });
    return this.menuTable.roleVsMenuList;
  }

  render() {
    let { getFieldDecorator } = this.props.form;
    let { currentRole } = this.props;
    return (
      <div>
        <Form style={{ maxHeight: 200, overflow: scroll }}>
          <Row>
            <Col span={12}>
              <Form.Item label={'角色名称：'} {...this.formItemLayout}>
                {getFieldDecorator('roleName', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'物理名：'} {...this.formItemLayout} style={{ marginLeft: -100 }}>
                {getFieldDecorator('roleCode', {})(<Input />)}
              </Form.Item>
              <Form.Item>{getFieldDecorator('id', {})(<Input type={'hidden'} />)}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label={'描述:'}
                {...this.formItemLayout}
                style={{ width: 1360, marginLeft: -205, marginTop: '-30px' }}
              >
                {getFieldDecorator('remark', {})(<Input.TextArea></Input.TextArea>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <MenuTable
                ref={'menuTable'}
                setRef={menuTable => {
                  this.menuTable = menuTable;
                }}
                currentRole={currentRole}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    let { currentRole } = props;
    return {
      roleName: Form.createFormField({
        ...currentRole.roleName,
        value: currentRole.roleName,
      }),
      roleCode: Form.createFormField({
        ...currentRole.roleCode,
        value: currentRole.roleCode,
      }),
      id: Form.createFormField({
        ...currentRole.id,
        value: currentRole.id,
      }),
      remark: Form.createFormField({
        ...currentRole.remark,
        value: currentRole.remark,
      }),
    };
  },
})(RoleManagerForm);
