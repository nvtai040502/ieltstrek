exports.id=540,exports.ids=[540],exports.modules={30630:(e,a,t)=>{Promise.resolve().then(t.bind(t,94912))},57022:(e,a,t)=>{"use strict";t.d(a,{X:()=>n});var s=t(95344),r=t(4664);let n=({message:e})=>e?(0,s.jsxs)("div",{className:"bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",children:[s.jsx(r.LPM,{className:"h-4 w-4"}),s.jsx("p",{children:e})]}):null},1250:(e,a,t)=>{"use strict";t.d(a,{M:()=>n});var s=t(95344),r=t(4664);let n=({message:e})=>e?(0,s.jsxs)("div",{className:"bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500",children:[s.jsx(r.NhS,{className:"h-4 w-4"}),s.jsx("p",{children:e})]}):null},41526:(e,a,t)=>{"use strict";t.r(a),t.d(a,{LogoutButton:()=>n});var s=t(95344);t(13664);var r=(0,t(28371).$)("5e7320d366fbd4032a11f3151180506df7323d67");let n=({children:e})=>{let a=async()=>{await r()};return s.jsx("span",{onClick:a,className:"cursor-pointer",children:e})}},94912:(e,a,t)=>{"use strict";t.r(a),t.d(a,{Navbar:()=>p});var s=t(95344),r=t(56506),n=t(8428),d=t(16212),i=t(49921),l=t(4664),o=t(20886),c=t(82885),u=t(26658),m=t(41526);let f=()=>{let e=(0,u.x)();return(0,s.jsxs)(o.DropdownMenu,{children:[s.jsx(o.DropdownMenuTrigger,{children:(0,s.jsxs)(c.Avatar,{children:[s.jsx(c.AvatarImage,{src:e?.image||""}),s.jsx(c.AvatarFallback,{className:"bg-sky-500",children:s.jsx(i.Xws,{className:"text-white"})})]})}),s.jsx(o.DropdownMenuContent,{className:"w-40",align:"end",children:s.jsx(m.LogoutButton,{children:(0,s.jsxs)(o.DropdownMenuItem,{children:[s.jsx(l.iz5,{className:"h-4 w-4 mr-2"}),"Logout"]})})})]})},p=()=>{let e=(0,n.usePathname)();return(0,s.jsxs)("nav",{className:"bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm",children:[(0,s.jsxs)("div",{className:"flex gap-x-2",children:[s.jsx(d.z,{asChild:!0,variant:"/server"===e?"default":"outline",children:s.jsx(r.default,{href:"/server",children:"Server"})}),s.jsx(d.z,{asChild:!0,variant:"/client"===e?"default":"outline",children:s.jsx(r.default,{href:"/client",children:"Client"})}),s.jsx(d.z,{asChild:!0,variant:"/admin"===e?"default":"outline",children:s.jsx(r.default,{href:"/admin",children:"Admin"})}),s.jsx(d.z,{asChild:!0,variant:"/settings"===e?"default":"outline",children:s.jsx(r.default,{href:"/settings",children:"Settings"})})]}),s.jsx(f,{})]})}},82885:(e,a,t)=>{"use strict";t.r(a),t.d(a,{Avatar:()=>i,AvatarFallback:()=>o,AvatarImage:()=>l});var s=t(95344),r=t(3729),n=t(33320),d=t(91626);let i=r.forwardRef(({className:e,...a},t)=>s.jsx(n.fC,{ref:t,className:(0,d.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",e),...a}));i.displayName=n.fC.displayName;let l=r.forwardRef(({className:e,...a},t)=>s.jsx(n.Ee,{ref:t,className:(0,d.cn)("aspect-square h-full w-full",e),...a}));l.displayName=n.Ee.displayName;let o=r.forwardRef(({className:e,...a},t)=>s.jsx(n.NY,{ref:t,className:(0,d.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",e),...a}));o.displayName=n.NY.displayName},61351:(e,a,t)=>{"use strict";t.d(a,{Ol:()=>i,Zb:()=>d,aY:()=>o,eW:()=>c,ll:()=>l});var s=t(95344),r=t(3729),n=t(91626);let d=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...a}));d.displayName="Card";let i=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",e),...a}));i.displayName="CardHeader";let l=r.forwardRef(({className:e,...a},t)=>s.jsx("h3",{ref:t,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",e),...a}));l.displayName="CardTitle",r.forwardRef(({className:e,...a},t)=>s.jsx("p",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",e),...a})).displayName="CardDescription";let o=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:(0,n.cn)("p-6 pt-0",e),...a}));o.displayName="CardContent";let c=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",e),...a}));c.displayName="CardFooter"},20886:(e,a,t)=>{"use strict";t.r(a),t.d(a,{DropdownMenu:()=>c,DropdownMenuCheckboxItem:()=>N,DropdownMenuContent:()=>g,DropdownMenuGroup:()=>m,DropdownMenuItem:()=>y,DropdownMenuLabel:()=>v,DropdownMenuPortal:()=>f,DropdownMenuRadioGroup:()=>x,DropdownMenuRadioItem:()=>b,DropdownMenuSeparator:()=>j,DropdownMenuShortcut:()=>R,DropdownMenuSub:()=>p,DropdownMenuSubContent:()=>h,DropdownMenuSubTrigger:()=>w,DropdownMenuTrigger:()=>u});var s=t(95344),r=t(3729),n=t(28473),d=t(97751),i=t(62312),l=t(82958),o=t(91626);let c=n.fC,u=n.xz,m=n.ZA,f=n.Uv,p=n.Tr,x=n.Ee,w=r.forwardRef(({className:e,inset:a,children:t,...r},i)=>(0,s.jsxs)(n.fF,{ref:i,className:(0,o.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",a&&"pl-8",e),...r,children:[t,s.jsx(d.Z,{className:"ml-auto h-4 w-4"})]}));w.displayName=n.fF.displayName;let h=r.forwardRef(({className:e,...a},t)=>s.jsx(n.tu,{ref:t,className:(0,o.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...a}));h.displayName=n.tu.displayName;let g=r.forwardRef(({className:e,sideOffset:a=4,...t},r)=>s.jsx(n.Uv,{children:s.jsx(n.VY,{ref:r,sideOffset:a,className:(0,o.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...t})}));g.displayName=n.VY.displayName;let y=r.forwardRef(({className:e,inset:a,...t},r)=>s.jsx(n.ck,{ref:r,className:(0,o.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a&&"pl-8",e),...t}));y.displayName=n.ck.displayName;let N=r.forwardRef(({className:e,children:a,checked:t,...r},d)=>(0,s.jsxs)(n.oC,{ref:d,className:(0,o.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:t,...r,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(n.wU,{children:s.jsx(i.Z,{className:"h-4 w-4"})})}),a]}));N.displayName=n.oC.displayName;let b=r.forwardRef(({className:e,children:a,...t},r)=>(0,s.jsxs)(n.Rk,{ref:r,className:(0,o.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...t,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(n.wU,{children:s.jsx(l.Z,{className:"h-2 w-2 fill-current"})})}),a]}));b.displayName=n.Rk.displayName;let v=r.forwardRef(({className:e,inset:a,...t},r)=>s.jsx(n.__,{ref:r,className:(0,o.cn)("px-2 py-1.5 text-sm font-semibold",a&&"pl-8",e),...t}));v.displayName=n.__.displayName;let j=r.forwardRef(({className:e,...a},t)=>s.jsx(n.Z0,{ref:t,className:(0,o.cn)("-mx-1 my-1 h-px bg-muted",e),...a}));j.displayName=n.Z0.displayName;let R=({className:e,...a})=>s.jsx("span",{className:(0,o.cn)("ml-auto text-xs tracking-widest opacity-60",e),...a});R.displayName="DropdownMenuShortcut"},26658:(e,a,t)=>{"use strict";t.d(a,{x:()=>r});var s=t(79202);let r=()=>{let e=(0,s.useSession)();return e.data?.user}},92786:(e,a,t)=>{"use strict";t.r(a),t.d(a,{logout:()=>d});var s=t(98601);t(75811);var r=t(19860),n=t(17824);let d=async()=>{await (0,r.signOut)()};(0,n.ensureServerEntryExports)([d]),(0,s.createActionProxy)("5e7320d366fbd4032a11f3151180506df7323d67",d)},53183:(e,a,t)=>{"use strict";t.d(a,{currentRole:()=>n,currentUser:()=>r});var s=t(19860);let r=async()=>{let e=await (0,s.auth)();return e?.user},n=async()=>{let e=await (0,s.auth)();return e?.user?.role}},31001:(e,a,t)=>{"use strict";t.d(a,{getAccountByUserId:()=>r});var s=t(89756);let r=async e=>{try{return await s.db.account.findFirst({where:{userId:e}})}catch{return null}}},35175:(e,a,t)=>{"use strict";t.d(a,{getUserByEmail:()=>r,getUserById:()=>n});var s=t(89756);let r=async e=>{try{return await s.db.user.findUnique({where:{email:e}})}catch{return null}},n=async e=>{try{return await s.db.user.findUnique({where:{id:e}})}catch{return null}}},90613:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>o});var s=t(25036),r=t(86843);let n=(0,r.createProxy)(String.raw`/home/ubuntu/github_repo/ieltstrek/components/layout/navbar.tsx`),{__esModule:d,$$typeof:i}=n;n.default;let l=(0,r.createProxy)(String.raw`/home/ubuntu/github_repo/ieltstrek/components/layout/navbar.tsx#Navbar`);function o({children:e}){return(0,s.jsxs)("div",{className:"h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800",children:[s.jsx(l,{}),e]})}t(40002)},25414:(e,a,t)=>{"use strict";t.d(a,{default:()=>o});var s=t(35175),r=t(10985),n=t(30634),d=t.n(n),i=t(76714),l=t(24320);let o={providers:[(0,t(67152).default)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,l.default)({clientId:process.env.GITHUB_CLIENT_ID,clientSecret:process.env.GITHUB_CLIENT_SECRET}),(0,i.default)({async authorize(e){let a=r.LoginSchema.safeParse(e);if(a.success){let{email:e,password:t}=a.data,r=await (0,s.getUserByEmail)(e);if(!r||!r.password)return null;if(await d().compare(t,r.password))return r}return null}})]}},19860:(e,a,t)=>{"use strict";t.d(a,{auth:()=>u,signIn:()=>m,signOut:()=>f});var s=t(29538),r=t(25414),n=t(28388),d=t(89756),i=t(35175),l=t(31001);let{handlers:{GET:o,POST:c},auth:u,signIn:m,signOut:f}=(0,s.default)({session:{strategy:"jwt"},pages:{signIn:"/auth/login",error:"/auth/error"},events:{async linkAccount({user:e}){await d.db.user.update({where:{id:e.id},data:{emailVerified:new Date}})}},callbacks:{async signIn({user:e,account:a}){let t;return a?.provider!=="credentials"||(e.id&&(t=await (0,i.getUserById)(e.id)),!!t?.emailVerified)},session:async({session:e,token:a})=>(a.sub&&e.user&&(e.user.id=a.sub),a.role&&e.user&&(e.user.role=a.role),e.user&&(e.user.isTwoFactorEnabled=a.isTwoFactorEnabled,e.user.name=a.name,e.user.email=a.email,e.user.isOAuth=a.isOAuth),e),async jwt({token:e}){if(!e.sub)return e;let a=await (0,i.getUserById)(e.sub);if(!a)return e;let t=await (0,l.getAccountByUserId)(a.id);return e.isOAuth=!!t,e.name=a.name,e.role=a.role,e.isTwoFactorEnabled=a.isTwoFactorEnabled,e}},adapter:(0,n.PrismaAdapter)(d.db),...r.default})},10985:(e,a,t)=>{"use strict";t.d(a,{LoginSchema:()=>n,NewPasswordSchema:()=>d,RegisterSchema:()=>i,ResetSchema:()=>l});var s=t(53524),r=t(86412);r.object({name:r.optional(r.string()),isTwoFactorEnabled:r.optional(r.boolean()),role:r.enum([s.UserRole.ADMIN,s.UserRole.USER]),email:r.optional(r.string().email()),password:r.optional(r.string().min(1)),newPassword:r.optional(r.string().min(6))}).refine(e=>!e.password||!!e.newPassword,{message:"New password is required!",path:["newPassword"]}).refine(e=>!e.newPassword||!!e.password,{message:"Password is required!",path:["password"]});let n=r.object({email:r.string().email({message:"Email is required"}),password:r.string().min(1,{message:"Password is required"}),code:r.optional(r.string())}),d=r.object({password:r.string().min(1,{message:"Minimum of 6 characters required"})}),i=r.object({email:r.string().email({message:"Email is required"}),password:r.string().min(1,{message:"Password is required"}),name:r.string().min(1,{message:"Name is required"})}),l=r.object({email:r.string().email({message:"Email is required"})})},57481:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>r});var s=t(70337);let r=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]}};