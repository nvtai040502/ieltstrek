(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1305],{9938:function(e,t,r){Promise.resolve().then(r.bind(r,8076))},8076:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var n=r(3827);r(5355);var o=(0,r(3472).$)("2aa9fd5f3af66c697f3171cac4095ae5122da738"),s=r(2649),l=r(8903);let i=()=>{var e,t;return null===(t=(0,l.useSession)().data)||void 0===t?void 0:null===(e=t.user)||void 0===e?void 0:e.role};var a=r(3657);let c=e=>{let{children:t,allowedRole:r}=e;return i()!==r?(0,n.jsx)(a.X,{message:"You do not have permission to view this content!"}):(0,n.jsx)(n.Fragment,{children:t})};var u=r(5754),d=r(7815),f=r(5357),m=r(6288),h=()=>(0,n.jsxs)(d.Zb,{className:"w-[600px]",children:[(0,n.jsx)(d.Ol,{children:(0,n.jsx)("p",{className:"text-2xl font-semibold text-center",children:"\uD83D\uDD11 Admin"})}),(0,n.jsxs)(d.aY,{className:"space-y-4",children:[(0,n.jsx)(c,{allowedRole:f.UserRole.ADMIN,children:(0,n.jsx)(s.M,{message:"You are allowed to see this content!"})}),(0,n.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-md",children:[(0,n.jsx)("p",{className:"text-sm font-medium",children:"Admin-only API Route"}),(0,n.jsx)(u.z,{onClick:()=>{fetch("/api/admin").then(e=>{e.ok?m.toast.success("Allowed API Route!"):m.toast.error("Forbidden API Route!")})},children:"Click to test"})]}),(0,n.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg border p-3 shadow-md",children:[(0,n.jsx)("p",{className:"text-sm font-medium",children:"Admin-only Server Action"}),(0,n.jsx)(u.z,{onClick:()=>{o().then(e=>{e.error&&m.toast.error(e.error),e.success&&m.toast.success(e.success)})},children:"Click to test"})]})]})]})},3657:function(e,t,r){"use strict";r.d(t,{X:function(){return s}});var n=r(3827),o=r(2177);let s=e=>{let{message:t}=e;return t?(0,n.jsxs)("div",{className:"bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",children:[(0,n.jsx)(o.LPM,{className:"h-4 w-4"}),(0,n.jsx)("p",{children:t})]}):null}},2649:function(e,t,r){"use strict";r.d(t,{M:function(){return s}});var n=r(3827),o=r(2177);let s=e=>{let{message:t}=e;return t?(0,n.jsxs)("div",{className:"bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500",children:[(0,n.jsx)(o.NhS,{className:"h-4 w-4"}),(0,n.jsx)("p",{children:t})]}):null}},5754:function(e,t,r){"use strict";r.d(t,{d:function(){return a},z:function(){return c}});var n=r(3827),o=r(4090),s=r(9143),l=r(7742),i=r(1657);let a=(0,l.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",correct:"bg-green-600"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",xs:"h-7 rounded-md px-1",lg:"h-11 rounded-md px-8",xl:" h-14 px-6",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=o.forwardRef((e,t)=>{let{className:r,variant:o,size:l,asChild:c=!1,...u}=e,d=c?s.g7:"button";return(0,n.jsx)(d,{className:(0,i.cn)(a({variant:o,size:l,className:r})),ref:t,...u})});c.displayName="Button"},7815:function(e,t,r){"use strict";r.d(t,{Ol:function(){return i},Zb:function(){return l},aY:function(){return c},eW:function(){return u},ll:function(){return a}});var n=r(3827),o=r(4090),s=r(1657);let l=o.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...o})});l.displayName="Card";let i=o.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",r),...o})});i.displayName="CardHeader";let a=o.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,n.jsx)("h3",{ref:t,className:(0,s.cn)("text-2xl font-semibold leading-none tracking-tight",r),...o})});a.displayName="CardTitle",o.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,n.jsx)("p",{ref:t,className:(0,s.cn)("text-sm text-muted-foreground",r),...o})}).displayName="CardDescription";let c=o.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("p-6 pt-0",r),...o})});c.displayName="CardContent";let u=o.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("flex items-center p-6 pt-0",r),...o})});u.displayName="CardFooter"},1657:function(e,t,r){"use strict";r.d(t,{KQ:function(){return m},_P:function(){return c},az:function(){return u},cn:function(){return a},mr:function(){return d},uJ:function(){return f}});var n=r(3167),o=r(9248),s=r(6288),l=r(1367),i=r(248);function a(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,l.m6)((0,n.W)(t))}let c=e=>{let{isInline:t}=e;return e.isInline=e=>["blank"].includes(e.type)||t(e),e},u=e=>{let{editor:t,startQuesNum:r}=e,n=0;for(let[e,s]of o.ML.nodes(t,{at:[]}))if(o.W_.isElement(e)&&"blank"===e.type){let{type:l,...i}=e,a={...i,type:l,questionNumber:r+n};n++,o.YR.setNodes(t,{...a},{at:s})}return n},d=e=>{let t=e%60;return"".concat(Math.floor(e/60),":").concat(t<10?"0":"").concat(t)},f=(e,t)=>{let r=t.toString(),n="".concat(r.length?"?":"").concat(r);return"".concat(e).concat(n)};function m(e){if(e instanceof i.z.ZodError){let t=e.issues.map(e=>e.message);return s.toast.error(t.join("\n"))}return e instanceof Error?s.toast.error(e.message):s.toast.error("Something went wrong, please try again later.")}},2110:function(e,t,r){"use strict";function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}r.d(t,{Z:function(){return n}})},1266:function(e,t,r){"use strict";r.d(t,{F:function(){return o},e:function(){return s}});var n=r(4090);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return e=>t.forEach(t=>{"function"==typeof t?t(e):null!=t&&(t.current=e)})}function s(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.useCallback)(o(...t),t)}},9143:function(e,t,r){"use strict";r.d(t,{A4:function(){return a},g7:function(){return l}});var n=r(2110),o=r(4090),s=r(1266);let l=(0,o.forwardRef)((e,t)=>{let{children:r,...s}=e,l=o.Children.toArray(r),a=l.find(c);if(a){let e=a.props.children,r=l.map(t=>t!==a?t:o.Children.count(e)>1?o.Children.only(null):(0,o.isValidElement)(e)?e.props.children:null);return(0,o.createElement)(i,(0,n.Z)({},s,{ref:t}),(0,o.isValidElement)(e)?(0,o.cloneElement)(e,void 0,r):null)}return(0,o.createElement)(i,(0,n.Z)({},s,{ref:t}),r)});l.displayName="Slot";let i=(0,o.forwardRef)((e,t)=>{let{children:r,...n}=e;return(0,o.isValidElement)(r)?(0,o.cloneElement)(r,{...function(e,t){let r={...t};for(let n in t){let o=e[n],s=t[n];/^on[A-Z]/.test(n)?o&&s?r[n]=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];s(...t),o(...t)}:o&&(r[n]=o):"style"===n?r[n]={...o,...s}:"className"===n&&(r[n]=[o,s].filter(Boolean).join(" "))}return{...e,...r}}(n,r.props),ref:t?(0,s.F)(t,r.ref):r.ref}):o.Children.count(r)>1?o.Children.only(null):null});i.displayName="SlotClone";let a=e=>{let{children:t}=e;return(0,o.createElement)(o.Fragment,null,t)};function c(e){return(0,o.isValidElement)(e)&&e.type===a}}},function(e){e.O(0,[8815,8310,6288,8764,5521,8903,2971,8069,1744],function(){return e(e.s=9938)}),_N_E=e.O()}]);