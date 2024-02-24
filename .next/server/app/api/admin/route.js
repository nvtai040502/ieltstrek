"use strict";(()=>{var e={};e.id=90,e.ids=[90],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6113:e=>{e.exports=require("crypto")},72254:e=>{e.exports=require("node:buffer")},6005:e=>{e.exports=require("node:crypto")},15673:e=>{e.exports=require("node:events")},88849:e=>{e.exports=require("node:http")},22286:e=>{e.exports=require("node:https")},47261:e=>{e.exports=require("node:util")},83520:(e,r,s)=>{s.r(r),s.d(r,{headerHooks:()=>h,originalPathname:()=>q,patchFetch:()=>x,requestAsyncStorage:()=>p,routeModule:()=>c,serverHooks:()=>w,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>g});var t={};s.r(t),s.d(t,{GET:()=>l});var a=s(95419),i=s(69108),n=s(99678),o=s(20204),u=s(53524),d=s(78070);async function l(){return await (0,o.L)()===u.UserRole.ADMIN?new d.default(null,{status:200}):new d.default(null,{status:403})}let c=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/route",pathname:"/api/admin",filename:"route",bundlePath:"app/api/admin/route"},resolvedPagePath:"/home/ubuntu/github_repo/ieltstrek/app/api/admin/route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:p,staticGenerationAsyncStorage:m,serverHooks:w,headerHooks:h,staticGenerationBailout:g}=c,q="/api/admin/route";function x(){return(0,n.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:m})}},20204:(e,r,s)=>{s.d(r,{L:()=>i,a:()=>a});var t=s(71534);let a=async()=>{let e=await (0,t.I8)();return e?.user},i=async()=>{let e=await (0,t.I8)();return e?.user?.role}},71534:(e,r,s)=>{s.d(r,{HT:()=>q,a4:()=>x,I8:()=>y});var t=s(78539),a=s(47033);let i=async e=>{try{return await a.db.user.findUnique({where:{email:e}})}catch{return null}},n=async e=>{try{return await a.db.user.findUnique({where:{id:e}})}catch{return null}};var o=s(53524),u=s(82196);u.Ry({name:u.jt(u.Z_()),isTwoFactorEnabled:u.jt(u.O7()),role:u.Km([o.UserRole.ADMIN,o.UserRole.USER]),email:u.jt(u.Z_().email()),password:u.jt(u.Z_().min(1)),newPassword:u.jt(u.Z_().min(6))}).refine(e=>!e.password||!!e.newPassword,{message:"New password is required!",path:["newPassword"]}).refine(e=>!e.newPassword||!!e.password,{message:"Password is required!",path:["password"]});let d=u.Ry({email:u.Z_().email({message:"Email is required"}),password:u.Z_().min(1,{message:"Password is required"}),code:u.jt(u.Z_())});u.Ry({password:u.Z_().min(1,{message:"Minimum of 6 characters required"})}),u.Ry({email:u.Z_().email({message:"Email is required"}),password:u.Z_().min(1,{message:"Password is required"}),name:u.Z_().min(1,{message:"Name is required"})}),u.Ry({email:u.Z_().email({message:"Email is required"})});var l=s(6521),c=s.n(l),p=s(74564),m=s(79307);let w={providers:[(0,s(52801).Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,m.Z)({clientId:process.env.GITHUB_CLIENT_ID,clientSecret:process.env.GITHUB_CLIENT_SECRET}),(0,p.Z)({async authorize(e){let r=d.safeParse(e);if(r.success){let{email:e,password:s}=r.data,t=await i(e);if(!t||!t.password)return null;if(await c().compare(s,t.password))return t}return null}})]};var h=s(65822);let g=async e=>{try{return await a.db.account.findFirst({where:{userId:e}})}catch{return null}},{handlers:{GET:q,POST:x},auth:y,signIn:f,signOut:v}=(0,t.Z)({session:{strategy:"jwt"},pages:{signIn:"/auth/login",error:"/auth/error"},events:{async linkAccount({user:e}){await a.db.user.update({where:{id:e.id},data:{emailVerified:new Date}})}},callbacks:{async signIn({user:e,account:r}){let s;return r?.provider!=="credentials"||(e.id&&(s=await n(e.id)),!!s?.emailVerified)},session:async({session:e,token:r})=>(r.sub&&e.user&&(e.user.id=r.sub),r.role&&e.user&&(e.user.role=r.role),e.user&&(e.user.isTwoFactorEnabled=r.isTwoFactorEnabled,e.user.name=r.name,e.user.email=r.email,e.user.isOAuth=r.isOAuth),e),async jwt({token:e}){if(!e.sub)return e;let r=await n(e.sub);if(!r)return e;let s=await g(r.id);return e.isOAuth=!!s,e.name=r.name,e.role=r.role,e.isTwoFactorEnabled=r.isTwoFactorEnabled,e}},adapter:(0,h.N)(a.db),...w})},47033:(e,r,s)=>{s.d(r,{db:()=>a});var t=s(53524);let a=globalThis.prisma||new t.PrismaClient},95419:(e,r,s)=>{e.exports=s(30517)}};var r=require("../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[638,247],()=>s(83520));module.exports=t})();