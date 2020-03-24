import React, { PropsWithChildren } from 'react'
import ProLayout from '@ant-design/pro-layout'
import AvatarDropdown from '@/components/global/LayoutHeaderRight'

export default (props: PropsWithChildren<any>) => {
  return (
    <ProLayout
      title={'Ant Design'}
      logo={() => <img src={require('@/assets/logo.png')} alt='' />}
      loading={false}
      style={{
        height: '100vh',
      }}
      rightContentRender={() => <AvatarDropdown />}
    >
      {props.children}
    </ProLayout>
  )
}
