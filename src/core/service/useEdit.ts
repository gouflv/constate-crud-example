import { useRef, useState } from 'react'
import { DELETE, GET, POST, PUT } from '@/core/request'
import constate from 'constate'
import { ListContext } from '@/core/service/useList'
import { message } from 'antd'

type ValueOrValueFunction<P, V> = V | ((params: P) => V)

export interface UseEditOptions<T, P> {
  getDefaultFormData?: (params) => any
  fetchOptions?: {
    url: ValueOrValueFunction<P, string>
    data?: ValueOrValueFunction<P, any>
    parser?: (data) => T
  }
  submitOptions?: {
    url: ValueOrValueFunction<{ isEdit: boolean; data: T; params: P }, string>
    parser?: (data: T) => any
  }
  removeOptions?: {
    url: ValueOrValueFunction<P, string>
    data?: (params: P) => any
  }
}

export interface EditContext<T, P> {
  visible: boolean
  isEdit: boolean
  data: T
  params: P
  loading: boolean
  saving: boolean

  onAdd: (params?: P) => void
  onEdit: (params: P) => void
  onSubmit: (data: T) => void
  onCancel: () => void
  onRemove: (data) => void

  connect: (list: ListContext) => void
}

export function createEdit<FormDataType = any, ParamsType = FormDataType>(
  options: Readonly<UseEditOptions<FormDataType, ParamsType>>
) {
  function hook(): EditContext<FormDataType, ParamsType> {
    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState<FormDataType>({} as any)
    const [params, setParams] = useState<ParamsType>({} as any)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    function onAdd(params?) {
      setParams(params)
      setData(
        options.getDefaultFormData ? options.getDefaultFormData(params) : {}
      )
      setIsEdit(false)
      setVisible(true)
    }

    async function onEdit(params) {
      setParams(params)
      setIsEdit(true)

      if (options.fetchOptions) {
        setVisible(true)
        setLoading(true)
        try {
          const { data } = await GET(
            getFunctionalValue(options.fetchOptions.url, params),
            options.fetchOptions.data && options.fetchOptions.data(params)
          )
          setData(
            options.fetchOptions.parser
              ? options.fetchOptions.parser(data)
              : data
          )
        } catch (e) {
          console.log(e)
          //TODO errorHandler
        } finally {
          setLoading(false)
        }
      } else {
        setData(params)
        setVisible(true)
      }
    }

    async function onSubmit(data) {
      if (!options.submitOptions) {
        console.error('[useEdit] options.submitOptions undefined')
        return
      }

      setData(prevState => ({ ...prevState, ...data }))
      setSaving(true)

      try {
        const ajax = isEdit ? PUT : POST
        const url = getFunctionalValue(options.submitOptions.url, {
          isEdit,
          data,
          params
        })
        const remoteData = options.submitOptions.parser
          ? options.submitOptions.parser(data)
          : data
        await ajax(url, {
          data: remoteData
        })

        setVisible(false)
        message.success('保存成功')
        requestListReload({ reset: true })
      } catch (e) {
        console.log(e)
        // TODO errorHandler
      } finally {
        setSaving(false)
      }
    }

    function onCancel() {
      setLoading(false)
      setVisible(false)
    }

    async function onRemove(data) {
      if (!options.removeOptions) {
        console.error('[useEdit] options.submitOptions undefined')
        return
      }
      try {
        await DELETE(
          getFunctionalValue(options.removeOptions.url, data),
          options.removeOptions.data && options.removeOptions.data(data)
        )
        requestListReload()
        message.success('删除成功')
      } catch (e) {
        console.log(e)
        //TODO errorHandler
      }
    }

    function getFunctionalValue(val, params) {
      return typeof val === 'function' ? val(params) : val
    }

    // inject listContext
    const listRef = useRef<ListContext>()

    function connect(list: ListContext) {
      listRef.current = list
    }

    function requestListReload(options?: { reset: boolean }) {
      listRef.current && listRef.current.fetch(options)
    }

    return {
      visible,
      isEdit,
      data,
      params,
      loading,
      saving,

      onAdd,
      onEdit,
      onSubmit,
      onCancel,
      onRemove,
      connect
    }
  }

  const [EditProvider, useEditContext] = constate(hook)
  EditProvider.displayName = 'EditProvider'
  return {
    EditProvider,
    useEditContext
  }
}
