import Vue from 'vue'
import Router from 'vue-router'
import Threejs from '@/views/Threejs/index'
import QuillEdit from '@/views/QuillEdit/index'
import Todo from '@/views/Todo/index'
// import blog from './modules/blog'
// import BlogManage from '@/views/BlogManage'
// import Home from '@/views/Home'
import blog from './modules/blog'
import Link from '@/views/Link'
import LinkManage from '@/views/LinkManage'
import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    blog,
    {
      path: '/',
      redirect: '/blog',
    },
    { // 友情链接
      path: '/link',
      name: 'Link',
      component: Link
    },
    { // 友情链接
      path: '/linkmanage',
      name: 'LinkManage',
      component: LinkManage
    },
    {
      path: '/threejs',
      name: 'Threejs',
      component: Threejs
    },
    {
      path: '/quilledit',
      name: 'QuillEdit',
      component: QuillEdit
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})