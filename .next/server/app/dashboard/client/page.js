(()=>{var e={};e.id=335,e.ids=[335],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},50852:e=>{"use strict";e.exports=require("async_hooks")},32081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},73292:e=>{"use strict";e.exports=require("fs/promises")},72254:e=>{"use strict";e.exports=require("node:buffer")},6005:e=>{"use strict";e.exports=require("node:crypto")},15673:e=>{"use strict";e.exports=require("node:events")},88849:e=>{"use strict";e.exports=require("node:http")},22286:e=>{"use strict";e.exports=require("node:https")},47261:e=>{"use strict";e.exports=require("node:util")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},19398:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>x,tree:()=>l});var s=r(50482),a=r(69108),o=r(62563),n=r.n(o),i=r(68300),d={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);r.d(t,d);let l=["",{children:["dashboard",{children:["client",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,60043)),"/home/ubuntu/github_repo/ieltstrek/app/dashboard/client/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,90613)),"/home/ubuntu/github_repo/ieltstrek/app/dashboard/layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,16238)),"/home/ubuntu/github_repo/ieltstrek/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/ubuntu/github_repo/ieltstrek/app/dashboard/client/page.tsx"],u="/dashboard/client/page",p={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/client/page",pathname:"/dashboard/client",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},77980:(e,t,r)=>{Promise.resolve().then(r.bind(r,45712))},45712:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var s=r(95344),a=r(61351);r(3729);var o=r(88720),n=r(91626);let i=(0,o.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function d({className:e,variant:t,...r}){return s.jsx("div",{className:(0,n.cn)(i({variant:t}),e),...r})}let l=({user:e,label:t})=>(0,s.jsxs)(a.Zb,{className:"w-[600px] shadow-md",children:[s.jsx(a.Ol,{children:s.jsx("p",{className:"text-2xl font-semibold text-center",children:t})}),(0,s.jsxs)(a.aY,{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",children:[s.jsx("p",{className:"text-sm font-medium",children:"ID"}),s.jsx("p",{className:"truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md",children:e?.id})]}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",children:[s.jsx("p",{className:"text-sm font-medium",children:"Name"}),s.jsx("p",{className:"truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md",children:e?.name})]}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",children:[s.jsx("p",{className:"text-sm font-medium",children:"Email"}),s.jsx("p",{className:"truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md",children:e?.email})]}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",children:[s.jsx("p",{className:"text-sm font-medium",children:"Role"}),s.jsx("p",{className:"truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md",children:e?.role})]}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",children:[s.jsx("p",{className:"text-sm font-medium",children:"Two Factor Authentication"}),s.jsx(d,{variant:e?.isTwoFactorEnabled?"default":"destructive",children:e?.isTwoFactorEnabled?"ON":"OFF"})]})]})]});var c=r(26658);let u=()=>{let e=(0,c.x)();return s.jsx(l,{label:"\uD83D\uDCF1 Client component",user:e})}},61351:(e,t,r)=>{"use strict";r.d(t,{Ol:()=>i,Zb:()=>n,aY:()=>l,eW:()=>c,ll:()=>d});var s=r(95344),a=r(3729),o=r(91626);let n=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,o.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));n.displayName="Card";let i=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,o.cn)("flex flex-col space-y-1.5 p-6",e),...t}));i.displayName="CardHeader";let d=a.forwardRef(({className:e,...t},r)=>s.jsx("h3",{ref:r,className:(0,o.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));d.displayName="CardTitle",a.forwardRef(({className:e,...t},r)=>s.jsx("p",{ref:r,className:(0,o.cn)("text-sm text-muted-foreground",e),...t})).displayName="CardDescription";let l=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,o.cn)("p-6 pt-0",e),...t}));l.displayName="CardContent";let c=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,o.cn)("flex items-center p-6 pt-0",e),...t}));c.displayName="CardFooter"},60043:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>a,default:()=>n});let s=(0,r(86843).createProxy)(String.raw`/home/ubuntu/github_repo/ieltstrek/app/dashboard/client/page.tsx`),{__esModule:a,$$typeof:o}=s,n=s.default}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,247,876,337,920,466,429,518],()=>r(19398));module.exports=s})();