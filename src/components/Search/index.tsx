import './index.less'
import React, { FC } from 'react'
import { ListContext } from '@/core/service/useList'
import { Button, Form } from 'antd'

interface SearchProps {
  list: ListContext
}

const Search: FC<SearchProps> = props => {
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

export default Search
