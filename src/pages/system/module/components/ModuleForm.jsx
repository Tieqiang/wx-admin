import { Component } from 'react';
import { Form, Input, Table } from 'antd';
import { connect } from 'dva';

@connect(({ moduleManage }) => ({ moduleManage }))
class ModuleForm extends Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...this.formItemLayout} label="模块名称">
            {getFieldDecorator('moduleName', {
              rules: [
                {
                  required: true,
                  message: '模块名称不能为空',
                },
              ],
            })(<Input placeholder="请输入模块名称" />)}
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
      moduleName: Form.createFormField({
        ...props.moduleName,
        value: props.moduleName,
      }),
      remark: Form.createFormField({
        ...props.remark,
        value: props.remark,
      }),
    };
  },
})(ModuleForm);
