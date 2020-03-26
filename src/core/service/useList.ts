import { useState } from 'react'
import constate from 'constate'
import { GET } from '@/core/request'
import { useUpdateEffect } from '@umijs/hooks'

export interface UseListOptions<T, S> {
  url: string | ((search: S) => string)
  getDefaultSearch?: () => S
  parseFetchedData?: (data) => { items: T[]; total: number }
}

export interface ListContext<T = any> {
  items: T[]
  index: number
  size: number
  total: number
  loading: boolean
  search: Record<string, any>

  fetch: (data?: Record<string, any>) => Promise<any>
  onIndexChange: (current: number) => void
  onSearchSubmit: (search: Record<string, string | number>) => void
  onSearchReset: () => void
  indexMethod: (current: number) => number
}

export default function createList<T = any, S = any>(
  options: Readonly<UseListOptions<T, S>>
) {
  function hook(): ListContext<T> {
    const [index, setIndex] = useState(1)
    const [size] = useState(20)
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState<T[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState<S>(
      options.getDefaultSearch ? options.getDefaultSearch() : ({} as S)
    )

    async function fetch() {
      setLoading(true)
      setItems([])
      try {
        const url =
          typeof options.url === 'function' ? options.url(search) : options.url
        const { data } = await GET(url, {
          data: {
            pageIndex: index - 1,
            pageSize: size,
            ...search
          }
        })

        const { items, total } = parseFetchedData(data)
        setItems(items)
        setTotal(total)
      } catch (e) {
        //TODO errorHandler
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    function parseFetchedData(data) {
      if (options.parseFetchedData) {
        return options.parseFetchedData(data)
      }

      const items = data.items || data
      const total = data.totalCount || items.length
      return {
        items,
        total
      }
    }

    useUpdateEffect(() => {
      fetch()
    }, [index, search])

    return {
      items,
      index,
      size,
      total,
      loading,
      search,

      fetch,
      onIndexChange: current => {
        setIndex(current)
      },
      onSearchSubmit: search => {
        setSearch(prevState => ({ ...prevState, ...search }))
      },
      onSearchReset: () => {
        setSearch(
          options.getDefaultSearch ? options.getDefaultSearch() : ({} as S)
        )
      },
      indexMethod: current => current + 1 + (index - 1) * size
    }
  }

  const [ListProvider, useListContext] = constate(hook)
  return {
    ListProvider,
    useListContext
  }
}
