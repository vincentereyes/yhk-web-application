import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NotFound from '@/components/NotFound'
import Finance from '@/components/finance/Finance'
import Collections from '@/components/finance/collections/Collections'
import AddCollection from '@/components/finance/collections/AddCollection'
import ViewCollection from '@/components/finance/collections/ViewCollection'
import ViewCollection2 from '@/components/finance/collections/ViewCollection2'
import EditCollection from '@/components/finance/collections/EditCollection'
import EditCollection2 from '@/components/finance/collections/EditCollection2'
import SearchCollections from '@/components/finance/collections/SearchCollections'
import Users from '@/components/auth/Users'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'
Vue.use(Router)

//SEQUENCE: beforeEach function is ran first to check if user is logged in
// then, beforeEnter in each route is ran to check if user's department or job level is correct

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/finance',
      name: 'Finance',
      component: Finance,
      props: true,
      meta: {
        requiresAuth: true
      },
      // beforeEnter: (to, from, next) => {
      //   console.log('in beforeEnter')
      //   if (from.name == "SearchCollections") {
      //     next()
      //     return
      //   }
      //   //CHECK IF USER'S DEPARTMENT IS FINANCE OR CHECK IF JOBGRADE IS L8
      //   if (to.params.userData.department == to.name || to.params.userData.jobGrade == 'L8') {
      //     console.log('truesiee')
      //     next()
      //   } else {
      //     console.log('falseee')
      //     next(false)
      //   }
      //   if (to.matched.some(rec => rec.meta.requiresAuth)) {
      //     firebase.auth().onAuthStateChanged(user => {
      //       if (user) {
      //         if (to.params.userData.department == to.name || to.params.userData.jobGrade == 'L8') {
      //           console.log('truesiee')
      //           next()
      //         } else {
      //           console.log('falseee')
      //           next(false)
      //         }
      //       } else {
      //         next({ name: 'Login' })
      //       }
      //     })
      //   } else {
      //     next()
      //   }
        
      // }
    },
    {
      path: '/finance/fcollections',
      name: 'Collections',
      component: Collections,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
    ,
    {
      path: '/finance/collections',
      name: 'SearchCollections',
      component: SearchCollections,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/finance/collections/add',
      name: 'AddCollection',
      component: AddCollection,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/finance/collection',
      name: 'ViewCollection',
      component: ViewCollection,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/finance/vcollection',
      name: 'ViewCollection2',
      component: ViewCollection2,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/finance/collections/edit',
      name: 'EditCollection',
      component: EditCollection,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/finance/collections/edit',
      name: 'EditCollection2',
      component: EditCollection2,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/*',
      component: NotFound
    }

  ]
})

router.beforeEach((to, from, next) => {
  //This is to check if User is logged in. If not logged in. Redirects to Login page

  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        next({ name: 'Login' })
      }
    })
  } else {
    next()
  }
})

export default router