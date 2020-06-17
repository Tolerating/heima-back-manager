export default{
    path:'/',
    name:"home",
    component:()=>import("@/views/home/home.vue"),
    children:[
        {name:'users',path:'users',component:()=>import('@/views/users/users.vue')},
        {name:'rights',path:'rights',component:()=>import('@/views/rights/right.vue')},
        {name:'role',path:'role',component:()=>import('@/views/rights/role.vue')},
    ]
}