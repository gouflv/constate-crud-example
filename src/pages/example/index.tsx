import React, { FC } from 'react'
import createList from '@/core/service/useList'
import { useMount } from '@umijs/hooks'
import { Button, Card, Divider, Form, Input } from 'antd'
import StandardTable from '@/components/StandardTable'
import TableToolbar from '@/components/TableToolbar'
import Search from '@/components/Search'

const { ListProvider, useListContext } = createList({
  url: () => '/list2'
})

export default function() {
  return (
    <ListProvider>
      <List />
    </ListProvider>
  )
}

const List: FC = () => {
  const list = useListContext()

  useMount(() => {
    list.fetch()
  })

  return (
    <Card>
      <Search list={list}>
        <Form.Item label={'用户名'} name={'name'}>
          <Input allowClear />
        </Form.Item>
      </Search>

      <TableToolbar>
        <Button type={'primary'}>新增</Button>
      </TableToolbar>

      <StandardTable
        list={list}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Type', dataIndex: 'type' },
          {
            title: 'Actions',
            key: 'actions',
            render: (t, r) => (
              <span>
                <a>编辑</a>
                <Divider type={'vertical'} />
                <a className={'mute'}>删除</a>
              </span>
            )
          }
        ]}
      />
    </Card>
  )
}
