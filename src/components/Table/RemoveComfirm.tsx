import React, { FC } from 'react'
import { message, Popconfirm } from 'antd'
import { EditContext } from '@/core/service/useEdit'

export const RemoveConfirm: FC<{
  edit: EditContext<any, any>
  data: any
}> = props => {
  async function onConfirm() {
    const hide = message.loading('正在删除...')
    try {
      await props.edit.onRemove(props.data)
    } catch (e) {
    } finally {
      hide()
    }
  }
  return (
    <Popconfirm
      title={'确认删除'}
      okText={'确认'}
      cancelText={'取消'}
      onConfirm={onConfirm}
    >
      <a href='#'>删除</a>
    </Popconfirm>
  )
}
