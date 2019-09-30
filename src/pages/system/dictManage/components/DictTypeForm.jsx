import React, {Component} from "react";
import {Form, Input} from "antd";
import {Promise} from "q";

import DictManagerService from "@/services/system/DictManagerService"

class DictTypeForm extends Component{

  render() {
    let {getFieldDecorator} = this.props.form ;
    return (
      <div>
        {/*<h1>字典类型编辑</h1>*/}
        <Form labelCol={{span:6}} wrapperCol={{span:16}}>
          <Form.Item label={"字典名称"}>
            {getFieldDecorator('name',{
              rules:[{
                required:true,
                message:"字典名称不能为空！"
              },{
                validator:(rule,value,callback)=>{
                  // return message();
                  return callback();
                }
              }]
            })(<Input/>)}
          </Form.Item>
          <Form.Item label={"字典编码"} required={true}>
            {
              getFieldDecorator('typeCode',{
                rules:[{
                  validator: async (rule, value, callback) => {
                    if (!value) {
                      callback(new Error("字典编码不能为空！"));
                    }
                    await DictManagerService.getDictTypeByCode(value).then(res => {
                      if (res) {
                        callback(new Error("字典编码已经存在了,请确认！"));
                      }
                    });
                    callback();
                  }
                }]
              })(<Input/>)
            }
          </Form.Item>
          {getFieldDecorator("id",{})(<Input hidden={true}/>)}
        </Form>

      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props){
    console.log(props)
    let {currentDictType} = props ;
    return {
      name:Form.createFormField({
        ...currentDictType.name,
        value:currentDictType.name
      }),
      id:Form.createFormField({
        ...currentDictType.id,
        value:currentDictType.id
      }),
      typeCode:Form.createFormField({
        ...currentDictType.typeCode,
        value:currentDictType.typeCode
      })
    }

  }
})(DictTypeForm);