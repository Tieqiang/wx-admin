import React, {Component} from "react";
import {Form, Input} from "antd";

class DictForm extends Component{

  render() {
    let {getFieldDecorator} = this.props.form ;
    return (
      <div>
        <Form labelCol={{span:6}} wrapperCol={{span:17}}>
          <Form.Item label={"键名"}>
            {getFieldDecorator("name",{
              rules:[
                {
                  required:true,
                  message:'键名不能为空'
                }
              ]
            })(<Input/>)}
          </Form.Item>
          <Form.Item label={"键值"}>
            {getFieldDecorator("value",{
              rules:[
                {
                  required:true,
                  message:'键值不能为空'
                }
              ]
            })(<Input/>)}
          </Form.Item>
          {getFieldDecorator("id",{})(<Input hidden={true}/>)}
          {getFieldDecorator("typeId",{})(<Input hidden={true}/>)}
        </Form>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props){
    let {currentDict,currentDictType} = props ;
    return {
      id:Form.createFormField({
        ...currentDict.id,
        value:currentDict.id
      }),
      name:Form.createFormField({
        value:currentDict.name
      }),
      typeId:Form.createFormField({
        value:currentDictType.id
      }),
      value:Form.createFormField({
        value:currentDict.value
      })
    }

  }
})(DictForm) ;