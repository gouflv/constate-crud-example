import './index.less'
import React, { PropsWithChildren, ReactNode } from 'react'

type TableToolbarProps = PropsWithChildren<{
  rightContent?: () => ReactNode
}>

export default function TableToolbar(props: TableToolbarProps) {
  return (
    <div className={'table-toolbar'}>
      <div className={'left'}>{props.children}</div>
      <div className={'right'}>
        {props.rightContent && props.rightContent()}
      </div>
    </div>
  )
}
