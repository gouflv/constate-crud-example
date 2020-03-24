import { defineConfig } from 'umi'

export default defineConfig({
  routes: [
    { path: '/login', component: 'login' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [{ path: '', component: '@/pages/index' }],
    },
  ],
})
