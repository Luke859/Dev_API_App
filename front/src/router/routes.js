import { LocalStorage, SessionStorage } from 'quasar'

const isAuthenticated = async (to, from) => {
  const isAuthenticated = LocalStorage.getItem('token') || SessionStorage.getItem('token')
  if (!isAuthenticated && to.name !== 'homepage') {
    return { name: 'homepage' }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'tuto', name: 'tuto', component: () => import('pages/TutoPage.vue') },
      { path: 'tuto/:id', name: 'tuto-params', component: () => import('src/pages/TutoPage.vue') },
      { path: 'login', name: 'login', component: () => import('src/components/Login/loginPage.vue') },
      { path: 'register', name: 'register', component: () => import('src/components/Auth/registerPage.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/components/Dashboard/dashboardPage.vue') },
      { path: 'tasks/lists/:id', name: 'tasks', component: () => import('src/components/Tasks/TasksPage.vue') }
    ],
    beforeEnter: isAuthenticated
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
