export default{
    path:'/',
    name:"home",
    component:()=>import("@/views/home/home.vue"),
    children:[
        {name:'users',path:'users',component:()=>import('@/views/users/users.vue')},
        {name:'rights',path:'rights',component:()=>import('@/views/rights/right.vue')},
        {name:'role',path:'role',component:()=>import('@/views/rights/role.vue')},
        {name:'goods',path:'goods',component:()=>import('@/views/goods/goodslist.vue')},
        {name:"goodsadd",path:'goodsadd',component:()=>import('@/views/goods/goodsadd.vue')},
        {name:"cateparams",path:'cateparams',component:()=>import('@/views/goods/cateparams.vue')},
        {name:"goodscate",path:'goodscate',component:()=>import('@/views/goods/goodscate.vue')}
    ]
}