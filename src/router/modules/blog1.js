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
            path: 'create',
            component: () => import('@/views/Blog/Create'),
            name: 'BlogCreate',
        },
        {
            path: 'statistics',
            component: () => import('@/views/Blog/Statistics'),
            name: 'BlogStatistics',
        },
    ]
}

export default BlogRouter