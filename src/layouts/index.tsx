import React from 'react'
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import AvatarDropdown from '@/components/global/LayoutHeaderRight'
import { Link } from 'umi'

export default props => {
  function menuDataRender(): MenuDataItem[] {
    return [
      { name: 'Example', path: '/example' },
      { name: 'Example2', path: '/example2' }
    ]
  }

  return (
    <ProLayout
      title={'Ant Design'}
      logo={() => <img src={require('@/assets/logo.png')} alt='' />}
      loading={false}
      style={{
        height: '100vh'
      }}
      rightContentRender={() => <AvatarDropdown />}
      menuDataRender={menuDataRender}
      menuItemRender={(menuItemProps, defaultDom) => {
        // if (menuItemProps.isUrl || menuItemProps.children) {
        //   return defaultDom
        // }
        return <Link to={menuItemProps.path as string}>{defaultDom}</Link>
      }}
    >
      {props.children}
    </ProLayout>
  )
}
