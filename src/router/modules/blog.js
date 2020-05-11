import Layout from '@/views/Blog/Layout'

const BlogRouter = {
    path: '/blog',
    name: 'Blog',
    component: Layout,
    redirect: '/blog/home',
    children: [
        {
            path: 'home',
            component: () => import('@/views/Blog/Home'),
            name: 'BlogHome',
        },
        {
            path: 'addblog',
            component: () => import('@/views/Blog/AddBlog'),
            name: 'AddBlog',
        },
        {
            path: 'addlink',
            component: () => import('@/views/Blog/AddLink'),
            name: 'AddLink',
        },
    ]
}

export default BlogRouter