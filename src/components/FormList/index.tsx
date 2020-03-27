import React, { FC, ReactNode } from 'react'
import { Button, Form } from 'antd'
import { DefaultLabelCol, DefaultWrapperCol } from '@/components'
import { PlusOutlined } from '@ant-design/icons/lib'

interface Field {
  name: number
  key: number
  fieldKey: number
}

interface FormGroupProps {
  name: string | number | (string | number)[]
  children: (
    field: Field,
    state: {
      index: number
      isFirst: boolean
      isLast: boolean
    },
    actions: {
      add: (defaultValue: any) => void
      remove: (index: number) => void
      move: (from: number, to: number) => void
    }
  ) => ReactNode
  defaultValue?: () => any
}

export const FormList: FC<FormGroupProps> = props => {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove, move }) => (
        <div>
          {fields.map((field, index) => {
            return props.children(
              (field as any) as Field,
              {
                index,
                isFirst: index === 0,
                isLast: index === fields.length - 1
              },
              { add, remove, move }
            )
          })}
          <Form.Item
            wrapperCol={{ offset: DefaultLabelCol, span: DefaultWrapperCol }}
          >
            <Button
              type={'dashed'}
              block
              onClick={() => add(props.defaultValue && props.defaultValue())}
            >
              <PlusOutlined /> 新增
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  )
}
