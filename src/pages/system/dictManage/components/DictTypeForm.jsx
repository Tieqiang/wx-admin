import React, {Component} from "react";
import {Form, Input} from "antd";

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
          {getFieldDecorator("id",{})(<Input hidden={true}/>)}
        </Form>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props){
    let {currentDictType} = props ;
    return {
      name:Form.createFormField({
        ...currentDictType.name,
        value:currentDictType.name.value
      }),
      id:Form.createFormField({
        ...currentDictType.id,
        value:currentDictType.id.value
      })
    }

  }
})(DictTypeForm);