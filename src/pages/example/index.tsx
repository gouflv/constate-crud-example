import React, { FC } from 'react'
import createList from '@/core/service/useList'
import { useMount } from '@umijs/hooks'
import { Button, Card, Divider, Form, Input } from 'antd'
import Table from '@/components/Table'
import TableToolbar from '@/components/TableToolbar'
import Search from '@/components/Search'
import createEdit from '@/core/service/useEdit'
import combineProviders from '@/utils/warpWithProvider'
import Edit from '@/components/Edit'
import RemoveConfirm from '@/components/Table/RemoveComfirm'

const { ListProvider, useListContext } = createList({
  url: () => '/list'
})

const { EditProvider, useEditContext } = createEdit({
  fetchOptions: {
    url: '/item'
  },
  submitOptions: {
    url: '/item'
  },
  removeOptions: {
    url: '/item'
  }
})

export default function() {
  const Providers = combineProviders([ListProvider, EditProvider])
  return (
    <Providers>
      <Page />
    </Providers>
  )
}

const Page: FC = () => {
  const list = useListContext()
  const edit = useEditContext()

  useMount(() => {
    list.fetch()
  })

  return (
    <Card>
      <Search list={list}>
        <Form.Item label={'用户名'} name={'name'}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label={'用户名'} name={'name2'}>
          <Input allowClear />
        </Form.Item>
      </Search>

      <TableToolbar rightContent={() => <Button>更多</Button>}>
        <Button type={'primary'} onClick={() => edit.onAdd()}>
          新增
        </Button>
      </TableToolbar>

      <Table
        list={list}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Type', dataIndex: 'type' },
          {
            title: 'Actions',
            key: 'actions',
            render: (t, r) => (
              <span>
                <a onClick={() => edit.onEdit(r)}>编辑</a>
                <Divider type={'vertical'} />
                <RemoveConfirm edit={edit} data={r} />
              </span>
            )
          }
        ]}
      />

      <Edit edit={edit}>
        <Form.Item label={'用户名'} name={'name'} required>
          <Input />
        </Form.Item>
      </Edit>
    </Card>
  )
}
