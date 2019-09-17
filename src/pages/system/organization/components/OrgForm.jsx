import { Component } from 'react';
import { Form, Input, TreeSelect } from 'antd';
import { connect } from 'dva';

const { TreeNode } = TreeSelect;

@connect(({ orgaManage, userManage }) => ({ orgaManage, userManage }))
class OrgForm extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  getTreeData(orgAllList) {
    let target = [];
    target = orgAllList.filter(item => item.parentId === '0');
    (target = target.map(value => {
      return {
        ...value,
        key: value.id,
        title: value.orgName,
        value: value.id,
        children: [],
      };
    })),
      target.forEach(item => {
        orgAllList.forEach(item1 => {
          if (item1.parentId == item.key) {
            let obj = {
              ...item1,
              key: item1.id,
              title: item1.orgName,
              value: item1.id,
            };
            item.children.push(obj);
          }
        });
      });
    return target;
  }

  getTreePareData(orgAllList) {
    let targetPare = orgAllList.filter(item => item.parentId === '0');
    targetPare = targetPare.map(value => {
      return {
        // ...value,
        key: value.id,
        title: value.orgName,
        value: value.id,
        children: [],
      };
    });
    return targetPare;
  }

  handleOrgChange(value) {
    console.log('value');
    console.log(value);
    return value;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form, orgaManage } = this.props;
    const { orgAllList } = orgaManage;
    let target = this.getTreeData(orgAllList);
    // let targetPare = this.getTreePareData(orgAllList);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...this.formItemLayout} label="机构名称">
            {getFieldDecorator('orgName', {
              rules: [
                {
                  required: true,
                  message: '机构名称不能为空',
                },
              ],
            })(<Input placeholder="请输入机构名称" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="机构编码">
            {getFieldDecorator('orgCode', {
              rules: [
                {
                  required: true,
                  message: '机构编码不能为空',
                },
              ],
            })(<Input placeholder="请输入机构编码" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="父分类">
            {getFieldDecorator('parentId')(
              <TreeSelect treeData={target} dropdownStyle={{ maxHeight: 400, overflow: 'scroll' }}>
                onChange={this.handleOrgChange.bind(this)}
              </TreeSelect>,
            )}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="备注信息">
            {getFieldDecorator('remark', {})(<Input.TextArea placeholder="请输入备注信息" />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: props => {
    console.log('mapPropsToFields', props);
    return {
      orgName: Form.createFormField({
        ...props.orgName,
        value: props.orgName,
      }),
      parentId: Form.createFormField({
        ...props.parentId,
        value: props.parentId,
      }),
      remark: Form.createFormField({
        ...props.remark,
        value: props.remark,
      }),
    };
  },
})(OrgForm);
