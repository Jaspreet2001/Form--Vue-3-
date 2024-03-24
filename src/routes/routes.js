export default [
  {
    path: '/',
    name: 'form',
    component: () => import('../views/formComp.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import('../views/formSubmit.vue')

  }
]
