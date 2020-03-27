import React, { FC } from 'react'
import { Table } from 'antd'
import { ListContext } from '@/core/service/useList'
import { TableProps } from 'antd/es/table'
import { PaginationProps } from 'antd/lib/pagination/Pagination'

export interface BasicTableProps<T = any> extends TableProps<T> {
  list: ListContext
  selectedRows?: T[]
  onSelectRow?: (row: any) => void
}

export const BasicTable: FC<BasicTableProps> = props => {
  const { list, columns, selectedRows, onSelectRow, ...tableProps } = props

  function getColumns() {
    return [
      {
        title: '#',
        key: 'index',
        render: (text, row, index) => list.indexMethod(index),
        width: '6em'
      },
      ...(columns as any)
    ]
  }

  const paginationProps: PaginationProps = {
    current: list.index,
    total: list.total,
    pageSize: list.size,
    showQuickJumper: true,
    hideOnSinglePage: true,
    showTotal: total => `共${total}条`,
    onChange: page => list.onIndexChange(page)
  }

  return (
    <Table
      columns={getColumns()}
      rowKey={props.rowKey || 'id'}
      dataSource={list.items}
      loading={list.loading}
      pagination={paginationProps}
      {...tableProps}
    />
  )
}
