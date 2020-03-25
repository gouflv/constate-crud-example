import './index.less'
import React, { PropsWithChildren } from 'react'
import { ListContext } from '@/core/service/useList'
import { Button, Form } from 'antd'

type SearchProps = PropsWithChildren<{
  list: ListContext
}>

export default function Search(props: SearchProps) {
  const [form] = Form.useForm()

  function onReset() {
    form.resetFields()
    props.list.onSearchReset()
  }

  return (
    <Form
      form={form}
      onFinish={props.list.onSearchSubmit}
      className={'search-form'}
      layout={'inline'}
    >
      {props.children}

      <Form.Item>
        <Button type={'primary'} htmlType={'submit'}>
          搜索
        </Button>
        <Button style={{ marginLeft: '8px' }} onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}
