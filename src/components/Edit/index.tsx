import React, { FC, useEffect } from 'react'
import { EditContext } from '@/core/service/useEdit'
import { ModalProps } from 'antd/es/modal'
import { Form, Modal, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FormInstance } from 'antd/es/form/util'

export type EditProps = {
  edit: EditContext<any, any>
  modalProps?: ModalProps
  form?: FormInstance
}

const EditModel: FC<EditProps> = props => {
  const { edit, modalProps } = props
  const [form] = useForm(props.form)

  async function onModalOk() {
    await form.validateFields()
    edit.onSubmit(form.getFieldsValue())
  }

  return (
    <Modal
      title={edit.isEdit ? '编辑' : '新增'}
      visible={edit.visible}
      maskClosable={false}
      width={680}
      okText={'确定'}
      okButtonProps={{ loading: edit.saving }}
      cancelText={'取消'}
      onOk={onModalOk}
      onCancel={edit.onCancel}
      {...modalProps}
    >
      <Spin spinning={edit.loading} delay={200}>
        {!props.edit.loading && <EditForm form={form} {...props} />}
      </Spin>
    </Modal>
  )
}

const EditForm: FC<EditProps> = props => {
  useEffect(() => {
    props.form && props.form.setFieldsValue(props.edit.data)
  }, [props.edit.data])

  return (
    <Form
      form={props.form}
      initialValues={props.edit.data}
      className={'edit-form'}
    >
      {props.children}
    </Form>
  )
}

const Edit: FC<EditProps> = props => {
  return <EditModel {...props} />
}

export default Edit
