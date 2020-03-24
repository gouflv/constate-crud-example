import React from 'react'
import { Dropdown, Menu } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import './LayoutHeaderRight.less'

export default () => {
  //   const appStore = AppStoreContainer.useContainer()

  async function logout() {}

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='layout-header-right'>
      <Dropdown overlay={menu} overlayClassName={'avatar-dropdown'}>
        <span className='action'>
          <UserOutlined /> Name
        </span>
      </Dropdown>
    </div>
  )
}
