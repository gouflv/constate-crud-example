import './index.less'
import React, { FC, ReactNode } from 'react'

const TableToolbar: FC<{ rightContent?: () => ReactNode }> = props => {
  return (
    <div className={'table-toolbar'}>
      <div className={'left'}>{props.children}</div>
      <div className={'right'}>
        {props.rightContent && props.rightContent()}
      </div>
    </div>
  )
}

export default TableToolbar
