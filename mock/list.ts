import mock from 'mockjs'

export default {
  'GET /api/tags': mock.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
}
