import React, { FC } from 'react'
import { useEditContext } from '@/pages/example/index'
import { BasicEdit } from '@/components'
import { Input, Select, Form } from 'antd'

export const Edit: FC = () => {
  const edit = useEditContext()

  return (
    <BasicEdit edit={edit} formProps={{}}>
      <Form.Item label={'用户名'} name={'name'} required>
        <Input />
      </Form.Item>
      <Form.Item label={'选择器'} name={'select'} required>
        <Select />
      </Form.Item>
    </BasicEdit>
  )
}
