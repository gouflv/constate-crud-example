import React, { FC } from 'react'
import { useEditContext } from '@/pages/example/index'
import { BasicEdit, DefaultLabelCol, DefaultWrapperCol } from '@/components'
import { Input, Select, Form, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { MinusCircleOutlined } from '@ant-design/icons/lib'
import { FormLayoutPros, RequiredRule } from '@/components/Edit/utils'

export const Edit: FC = () => {
  const edit = useEditContext()

  const innerLayout: FormLayoutPros = {
    labelCol: { span: DefaultLabelCol },
    wrapperCol: { span: 24 - DefaultLabelCol }
  }

  return (
    <BasicEdit edit={edit} formProps={{}}>
      <Form.Item label={'用户名'} name={'name'} rules={[RequiredRule]}>
        <Input />
      </Form.Item>
      <Form.Item label={'选择器'} name={'select'}>
        <Select />
      </Form.Item>

      <Form.List name={'group'}>
        {(fields, { add, remove, move }) => (
          <div>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 && '对象组'}
                key={index}
                wrapperCol={{
                  span: DefaultWrapperCol,
                  offset: index === 0 ? 0 : DefaultLabelCol
                }}
              >
                <Form.Item
                  label={'名称'}
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name'] as any}
                  rules={[RequiredRule]}
                  {...innerLayout}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={'类型'}
                  name={[field.name, 'type']}
                  fieldKey={[field.fieldKey, 'type'] as any}
                  rules={[RequiredRule]}
                  {...innerLayout}
                >
                  <Input />
                </Form.Item>
                <a href='#' onClick={() => remove(field.name)}>
                  删除
                </a>
              </Form.Item>
            ))}
            <Form.Item
              wrapperCol={{ offset: DefaultLabelCol, span: DefaultWrapperCol }}
            >
              <Button type={'dashed'} block onClick={() => add()}>
                <PlusOutlined /> 新增
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </BasicEdit>
  )
}
