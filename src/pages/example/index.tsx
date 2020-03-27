import React, { FC } from 'react'
import { createList, createEdit, combineProviders } from '@/core/service'
import { useMount } from '@umijs/hooks'
import { Button, Card, Divider, Form, Input } from 'antd'
import { BasicTable, RemoveConfirm, Search, TableToolbar } from '@/components'
import { Edit } from '@/pages/example/Edit'

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

export { useEditContext }

export default function() {
  const Providers = combineProviders(ListProvider, EditProvider)
  return (
    <Providers>
      <Page />
    </Providers>
  )
}

const Page: FC = () => {
  const list = useListContext()
  const edit = useEditContext()
  edit.connect(list)

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

      <BasicTable
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

      <Edit />
    </Card>
  )
}
