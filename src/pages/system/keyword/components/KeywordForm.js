import { Component } from 'react';
import { Form, Input } from 'antd';

class KeywordForm extends Component {
  constructor(props) {
    super(props);
    // this.state.formState = props.keywords.currentKeyword
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
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...this.formItemLayout} label="关键词名称">
            {getFieldDecorator('keysName', {
              rules: [
                {
                  required: true,
                  message: '关键词名称不能为空',
                },
              ],
            })(<Input placeholder="请输入关键词" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="同义词">
            {getFieldDecorator('synonym', {})(<Input placeholder="请输入关键词的同义词" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="备注信息">
            {getFieldDecorator('remark', {})(<Input.TextArea placeholder="请输入关键词的同义词" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout}>
            {getFieldDecorator('id', {})(<Input type="hidden" />)}
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
      id: Form.createFormField({
        ...props.id,
        value: props.id,
      }),
      keysName: Form.createFormField({
        ...props.keysName,
        value: props.keysName,
      }),
      remark: Form.createFormField({
        ...props.remark,
        value: props.remark,
      }),
      synonym: Form.createFormField({
        ...props.synonym,
        value: props.synonym,
      }),
    };
  },
})(KeywordForm);
