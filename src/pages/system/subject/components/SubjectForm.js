import { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { connect } from 'dva';
@connect(({ subject }) => ({ subject }))
class SubjectForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    AllSubject: {
      records: [],
    },
  };
  componentDidMount() {
    let { currentSubject } = this.props;
    if (currentSubject.typeId) {
      this.getSubjectsByDbType(currentSubject.typeId);
    }
  }

  getSubjectsByDbType(dbTypeId) {
    let { dispatch } = this.props;
    dispatch({
      type: 'subject/loadSubjectPageByDbType',
      payload: {
        orgDbTypeId: dbTypeId,
        page: 1,
        pageSize: 100000,
      },
    }).then(res => {
      this.setState({
        ...this.state,
        AllSubject: res,
      });
    });
  }

  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  render() {
    let { dbTypes } = this.props;
    const { getFieldDecorator } = this.props.form;
    let options = [];
    let subjectOptions = [];
    dbTypes.forEach(item => {
      let option = (
        <Select.Option value={item.id} key={item.id}>
          {item.typeName}
        </Select.Option>
      );
      options.push(option);
    });

    this.state.AllSubject.records.forEach(item => {
      let options = (
        <Select.Option value={item.id} key={item.id}>
          {item.subjectClass.subjectName}
        </Select.Option>
      );
      subjectOptions.push(options);
    });

    return (
      <div>
        <form>
          <Form.Item {...this.formItemLayout} label="主题名称">
            {getFieldDecorator('subjectClass.subjectName', {
              rules: [
                {
                  required: true,
                  message: '主题分类名称不能为空',
                },
              ],
            })(<Input placeholder="请输入主题分类名称" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="数据库分类">
            {getFieldDecorator('subjectClass.orgDbTypeId', {
              rules: [
                {
                  required: true,
                  message: '数据库分类不能为空！',
                },
              ],
            })(
              <Select
                onChange={value => {
                  this.getSubjectsByDbType(value);
                }}
                filterOption={true}
                showSearch={true}
                optionFilterProp={'children'}
              >
                {options}
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="父分类">
            {getFieldDecorator('subjectClass.parentId', {})(<Select>{subjectOptions}</Select>)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="同义词">
            {getFieldDecorator('subjectClass.synonym', {})(<Input />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout} label="备注说明">
            {getFieldDecorator('subjectClass.remark', {})(<Input.TextArea></Input.TextArea>)}
          </Form.Item>
          <Form.Item {...this.formItemLayout}>
            {getFieldDecorator('subjectClass.id', {})(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item {...this.formItemLayout}>
            {getFieldDecorator('id', {})(<Input type="hidden" />)}
          </Form.Item>
        </form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: function(props) {
    let { currentSubject } = props;
    return {
      id: Form.createFormField({
        ...currentSubject.id,
        value: currentSubject.id,
      }),

      'subjectClass.id': Form.createFormField({
        ...currentSubject.subjectClass.id,
        value: currentSubject.subjectClass.id,
      }),
      'subjectClass.subjectName': Form.createFormField({
        ...currentSubject.subjectClass.subjectName,
        value: currentSubject.subjectClass.subjectName,
      }),
      'subjectClass.orgDbTypeId': Form.createFormField({
        ...currentSubject.subjectClass.orgDbTypeId,
        value: currentSubject.subjectClass.orgDbTypeId,
      }),
      'subjectClass.parentId': Form.createFormField({
        ...currentSubject.subjectClass.parentId,
        value: currentSubject.subjectClass.parentId,
      }),
      'subjectClass.synonym': Form.createFormField({
        ...currentSubject.subjectClass.synonym,
        value: currentSubject.subjectClass.synonym,
      }),
      'subjectClass.remark': Form.createFormField({
        ...currentSubject.subjectClass.remark,
        value: currentSubject.subjectClass.remark,
      }),
    };
  },
})(SubjectForm);
