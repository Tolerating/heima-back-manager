export default{
    path:'/',
    name:"home",
    component:()=>import("@/views/home/home.vue"),
    children:[
        {name:'users',path:'users',component:()=>import('@/views/users/users.vue')}
    ]
}