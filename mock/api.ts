import mock from 'mockjs'

const wrapper = data => {
  return {
    code: 200,
    data,
    msg: 'ok'
  }
}

export default {
  'GET /api/list': mock.mock(
    wrapper({
      'items|100': [{ name: '@city', 'id|+1': 1, 'type|0-2': 1 }],
      pageIndex: 1,
      pageSize: 20,
      'totalCount|100-200': 1
    })
  ),
  'GET /api/list2': mock.mock({
    code: 200,
    'data|20': [{ name: '@first', 'id|+1': 1 }],
    msg: 'ok'
  }),
  'GET /api/item': mock.mock(
    wrapper({
      'id|1-20': 1,
      name: '@first'
    })
  )
}
