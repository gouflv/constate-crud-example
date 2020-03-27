import { Rule } from 'antd/es/form'
import { FormProps } from 'antd/lib/form'

export type FormLayoutPros = Pick<FormProps, 'labelCol' | 'wrapperCol'>

export const RequiredRule: Rule = { required: true, message: '请填写' }
export const SelectRequiredRule: Rule = { required: true, message: '请选择' }
