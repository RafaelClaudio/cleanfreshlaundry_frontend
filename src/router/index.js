import Vue from 'vue' 
import Router from 'vue-router' 
 
const EmployeeLogin = () => import(/* webpackChunkName: "dashboard" */ '../components/employeeLogin.vue')
const LandingLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/landingLayout.vue')
const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue') 
const EmployeeDashboard = () => import(/* webpackChunkName: "dashboard" */ '../components/employeeDashboard.vue')


function loadLandingView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/landingContents/${view}.vue`) 
}

function loadUserView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/dashboardContents/${view}.vue`) 
}

function loadEmployeeView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/employeeContents/${view}.vue`) 
}

 
const routes = [  
    {       
        path: '/employee',       
        component: EmployeeLogin,       
        children: [
            {
                name: 'LoginEmployee',
                path: ''
            }
        ]     
    },   
    {       
        path: '/',       
        component: LandingLayout,       
        children: [
            {           
                name: 'LoginPage',           
                path: '',           
                component: loadLandingView('loginPage')         
            }, 
            {           
                name: 'RegisterPage',           
                path: '/register',           
                component: loadLandingView('registerPage')         
            },
        ]     
    },
    {       
        path: '/home',       
        component: DashboardLayout,       
        children: [
            {           
                name: 'UserController',           
                path: '/user/profile',           
                component: loadUserView('userController')         
            }, 
            {           
                name: 'HomeController',           
                path: '/',           
                component: loadUserView('homeController')         
            },
            {           
                name: 'OrderController',           
                path: '/user/order',           
                component: loadUserView('orderController')         
            },
            {           
                name: 'PricelistView',           
                path: '/user/pricelist',           
                component: loadUserView('pricelistView')         
            },
            {           
                name: 'ReviewController',           
                path: '/user/review',           
                component: loadUserView('reviewController')         
            },
            {           
                name: 'AboutController',           
                path: '/home/about',           
                component: loadUserView('aboutController')         
            },       
        ]     
    },
    {       
        path: '/manage',       
        component: EmployeeDashboard,       
        children: [
            {           
                name: 'IndexCustomerOrder',           
                path: '/',           
                component: loadEmployeeView('customerOrder')         
            },
            {           
                name: 'EmployeeController',           
                path: '/employee/profile',           
                component: loadEmployeeView('employeeController')         
            },
            {           
                name: 'CustomerOrder',           
                path: '/manage/order',           
                component: loadEmployeeView('customerOrder')         
            },
            {           
                name: 'CustomerReview',           
                path: '/manage/review',           
                component: loadEmployeeView('customerReview')         
            },
            {           
                name: 'PricelistController',           
                path: '/manage/pricelist',           
                component: loadEmployeeView('pricelistController')         
            },
        ]     
    },   
]   

Vue.use(Router) 
 
const router = new Router({mode: 'history', routes: routes}) 
 
export default router 
