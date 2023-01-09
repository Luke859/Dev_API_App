const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'logIn', name: 'logIn', component: () => import('pages/LoginPage.vue') },
      { path: 'tuto', name: 'tuto', component: () => import('pages/TutoPage.vue') },
      { path: 'tuto/:id', name: 'tuto-params', component: () => import('src/pages/TutoPage.vue') },
      { path: 'auth', name: 'auth', component: () => import('src/components/Auth/AuthPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
