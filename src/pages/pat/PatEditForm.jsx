import React, {Component} from "react";
import {Form, Input} from "antd";

class PatEditForm extends Component {

  render() {
    let {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form labelCol={{span:6}} wrapperCol={{span:16}}>
          {getFieldDecorator("id",{})(<Input hidden={true}/>)}
          <Form.Item label={"病人姓名"}>
            {getFieldDecorator("patName",{
              rules:[
                {
                  required:true,
                  message:"病人姓名不能为空！"
                }
              ]
            })(<Input onPressEnter={e=>{
              // this.refs.idNoInput.focus()
              console.log(this.refs)
            }} placeholder={"请输入姓名"}/>)}
          </Form.Item>
          <Form.Item label={"身份证号"}>
            {getFieldDecorator("idNo",{
              rules:[
                {
                  required:true,
                  message:"身份证号！"
                }
              ]
            })(<Input placeholder={"请输入姓名"}/>)}
          </Form.Item>
          <Form.Item label={"病人ID"}>
            {getFieldDecorator("patId",{
              rules:[
                {
                  required:true,
                  message:"病人ID不能为空！"
                }
              ]
            })(<Input placeholder={"请输入病人你ID"}/>)}
          </Form.Item>
          <Form.Item label={"联系电话"}>
            {getFieldDecorator("phoneNum",{
              rules:[
                {
                  required:true,
                  message:"联系电话不能为空！"
                }
              ]
            })(<Input placeholder={"请输入联系电话"}/>)}
          </Form.Item>
          <Form.Item label={"住院号"}>
            {getFieldDecorator("inpNo",{})(<Input placeholder={"请输入住院号"}/>)}
          </Form.Item>
          <Form.Item label={"通讯地址"}>
            {getFieldDecorator("address",{})(<Input placeholder={"请输入通讯地址"}/>)}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields: props => {
    let {currentPat} = props;
    return {
      patName:Form.createFormField({
        ...currentPat.patName,
        value:currentPat.patName
      }),
      id:Form.createFormField({
        ...currentPat.id,
        value:currentPat.id
      }),
      phoneNum:Form.createFormField({
        ...currentPat.phoneNum,
        value:currentPat.phoneNum
      }),
      inpNo:Form.createFormField({
        ...currentPat.inpNo,
        value:currentPat.inpNo
      }),
      address:Form.createFormField({
        ...currentPat.address,
        value:currentPat.address
      }),
      patId:Form.createFormField({
        ...currentPat.patId,
        value:currentPat.patId
      }),
      idNo:Form.createFormField({
        ...currentPat.idNo,
        value:currentPat.idNo
      }),
    }
  }
})(PatEditForm);