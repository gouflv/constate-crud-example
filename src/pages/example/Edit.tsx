import React, { FC } from 'react'
import { useEditContext } from '@/pages/example/index'
import {
  DefaultLabelCol,
  DefaultWrapperCol,
  EditModel,
  FormList
} from '@/components'
import { Button, Form, Input, Select } from 'antd'
import { FormLayoutPros, RequiredRule } from '@/components/EditModel/utils'

export const Edit: FC = () => {
  const edit = useEditContext()

  const innerLayout: FormLayoutPros = {
    labelCol: { span: DefaultLabelCol },
    wrapperCol: { span: 24 - DefaultLabelCol }
  }

  return (
    <EditModel edit={edit}>
      <Form.Item label={'用户名'} name={'name'} rules={[RequiredRule]}>
        <Input />
      </Form.Item>
      <Form.Item label={'选择器'} name={'select'}>
        <Select />
      </Form.Item>

      <FormList name={'group'}>
        {(field, { index, isFirst, isLast }, { remove }) => (
          <Form.Item
            label={isFirst && '对象组'}
            key={index}
            wrapperCol={{
              span: DefaultWrapperCol,
              offset: isFirst ? 0 : DefaultLabelCol
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
            <div style={{ textAlign: 'right' }}>
              <Button
                type={'danger'}
                size={'small'}
                onClick={() => remove(field.name)}
              >
                删除
              </Button>
            </div>
          </Form.Item>
        )}
      </FormList>
    </EditModel>
  )
}
