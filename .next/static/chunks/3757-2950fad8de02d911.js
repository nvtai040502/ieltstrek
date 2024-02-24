"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3757],{7805:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(7461).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},7501:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(7461).Z)("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]])},8792:function(e,t,n){n.d(t,{default:function(){return o.a}});var r=n(5250),o=n.n(r)},2178:function(e,t,n){n.d(t,{Ee:function(){return h},NY:function(){return E},fC:function(){return w}});var r=n(2110),o=n(4090),a=n(4104),u=n(9830),l=n(2618),c=n(9586);let i="Avatar",[d,s]=(0,a.b)(i),[f,p]=d(i),m=(0,o.forwardRef)((e,t)=>{let{__scopeAvatar:n,...a}=e,[u,l]=(0,o.useState)("idle");return(0,o.createElement)(f,{scope:n,imageLoadingStatus:u,onImageLoadingStatusChange:l},(0,o.createElement)(c.WV.span,(0,r.Z)({},a,{ref:t})))}),v=(0,o.forwardRef)((e,t)=>{let{__scopeAvatar:n,src:a,onLoadingStatusChange:i=()=>{},...d}=e,s=p("AvatarImage",n),f=function(e){let[t,n]=(0,o.useState)("idle");return(0,l.b)(()=>{if(!e){n("error");return}let t=!0,r=new window.Image,o=e=>()=>{t&&n(e)};return n("loading"),r.onload=o("loaded"),r.onerror=o("error"),r.src=e,()=>{t=!1}},[e]),t}(a),m=(0,u.W)(e=>{i(e),s.onImageLoadingStatusChange(e)});return(0,l.b)(()=>{"idle"!==f&&m(f)},[f,m]),"loaded"===f?(0,o.createElement)(c.WV.img,(0,r.Z)({},d,{ref:t,src:a})):null}),g=(0,o.forwardRef)((e,t)=>{let{__scopeAvatar:n,delayMs:a,...u}=e,l=p("AvatarFallback",n),[i,d]=(0,o.useState)(void 0===a);return(0,o.useEffect)(()=>{if(void 0!==a){let e=window.setTimeout(()=>d(!0),a);return()=>window.clearTimeout(e)}},[a]),i&&"loaded"!==l.imageLoadingStatus?(0,o.createElement)(c.WV.span,(0,r.Z)({},u,{ref:t})):null}),w=m,h=v,E=g},1100:function(e,t,n){n.d(t,{oC:function(){return eQ},VY:function(){return eY},ZA:function(){return eH},ck:function(){return eJ},wU:function(){return e1},__:function(){return eq},Uv:function(){return eX},Ee:function(){return e$},Rk:function(){return e0},fC:function(){return ez},Z0:function(){return e6},Tr:function(){return e7},tu:function(){return e2},fF:function(){return e8},xz:function(){return eN}});var r=n(2110),o=n(4090),a=n(4991),u=n(1266),l=n(4104),c=n(9310),i=n(9586),d=n(7533),s=n(3876),f=n(1260),p=n(6007),m=n(8082),v=n(8687),g=n(2338),w=n(7881),h=n(2642),E=n(3715),b=n(9143),_=n(9830),M=n(6674),y=n(7225);let C=["Enter"," "],R=["ArrowUp","PageDown","End"],D=["ArrowDown","PageUp","Home",...R],O={ltr:[...C,"ArrowRight"],rtl:[...C,"ArrowLeft"]},k={ltr:["ArrowLeft"],rtl:["ArrowRight"]},P="Menu",[I,x,T]=(0,d.B)(P),[S,Z]=(0,l.b)(P,[T,g.D7,E.Pc]),F=(0,g.D7)(),A=(0,E.Pc)(),[L,K]=S(P),[j,V]=S(P),W=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,...a}=e,u=F(n);return(0,o.createElement)(g.ee,(0,r.Z)({},u,a,{ref:t}))}),G="MenuPortal",[U,B]=S(G,{forceMount:void 0}),z="MenuContent",[N,X]=S(z),Y=(0,o.forwardRef)((e,t)=>{let n=B(z,e.__scopeMenu),{forceMount:a=n.forceMount,...u}=e,l=K(z,e.__scopeMenu),c=V(z,e.__scopeMenu);return(0,o.createElement)(I.Provider,{scope:e.__scopeMenu},(0,o.createElement)(h.z,{present:a||l.open},(0,o.createElement)(I.Slot,{scope:e.__scopeMenu},c.modal?(0,o.createElement)(H,(0,r.Z)({},u,{ref:t})):(0,o.createElement)(q,(0,r.Z)({},u,{ref:t})))))}),H=(0,o.forwardRef)((e,t)=>{let n=K(z,e.__scopeMenu),l=(0,o.useRef)(null),c=(0,u.e)(t,l);return(0,o.useEffect)(()=>{let e=l.current;if(e)return(0,M.Ry)(e)},[]),(0,o.createElement)(J,(0,r.Z)({},e,{ref:c,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:(0,a.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)}))}),q=(0,o.forwardRef)((e,t)=>{let n=K(z,e.__scopeMenu);return(0,o.createElement)(J,(0,r.Z)({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)}))}),J=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,loop:l=!1,trapFocus:c,onOpenAutoFocus:i,onCloseAutoFocus:d,disableOutsidePointerEvents:s,onEntryFocus:v,onEscapeKeyDown:w,onPointerDownOutside:h,onFocusOutside:_,onInteractOutside:M,onDismiss:C,disableOutsideScroll:O,...k}=e,P=K(z,n),I=V(z,n),T=F(n),S=A(n),Z=x(n),[L,j]=(0,o.useState)(null),W=(0,o.useRef)(null),G=(0,u.e)(t,W,P.onContentChange),U=(0,o.useRef)(0),B=(0,o.useRef)(""),X=(0,o.useRef)(0),Y=(0,o.useRef)(null),H=(0,o.useRef)("right"),q=(0,o.useRef)(0),J=O?y.Z:o.Fragment,Q=O?{as:b.g7,allowPinchZoom:!0}:void 0,$=e=>{var t,n;let r=B.current+e,o=Z().filter(e=>!e.disabled),a=document.activeElement,u=null===(t=o.find(e=>e.ref.current===a))||void 0===t?void 0:t.textValue,l=function(e,t,n){var r;let o=t.length>1&&Array.from(t).every(e=>e===t[0])?t[0]:t,a=(r=Math.max(n?e.indexOf(n):-1,0),e.map((t,n)=>e[(r+n)%e.length]));1===o.length&&(a=a.filter(e=>e!==n));let u=a.find(e=>e.toLowerCase().startsWith(o.toLowerCase()));return u!==n?u:void 0}(o.map(e=>e.textValue),r,u),c=null===(n=o.find(e=>e.textValue===l))||void 0===n?void 0:n.ref.current;!function e(t){B.current=t,window.clearTimeout(U.current),""!==t&&(U.current=window.setTimeout(()=>e(""),1e3))}(r),c&&setTimeout(()=>c.focus())};(0,o.useEffect)(()=>()=>window.clearTimeout(U.current),[]),(0,p.EW)();let ee=(0,o.useCallback)(e=>{var t,n,r;return H.current===(null===(t=Y.current)||void 0===t?void 0:t.side)&&!!(r=null===(n=Y.current)||void 0===n?void 0:n.area)&&function(e,t){let{x:n,y:r}=e,o=!1;for(let e=0,a=t.length-1;e<t.length;a=e++){let u=t[e].x,l=t[e].y,c=t[a].x,i=t[a].y;l>r!=i>r&&n<(c-u)*(r-l)/(i-l)+u&&(o=!o)}return o}({x:e.clientX,y:e.clientY},r)},[]);return(0,o.createElement)(N,{scope:n,searchRef:B,onItemEnter:(0,o.useCallback)(e=>{ee(e)&&e.preventDefault()},[ee]),onItemLeave:(0,o.useCallback)(e=>{var t;ee(e)||(null===(t=W.current)||void 0===t||t.focus(),j(null))},[ee]),onTriggerLeave:(0,o.useCallback)(e=>{ee(e)&&e.preventDefault()},[ee]),pointerGraceTimerRef:X,onPointerGraceIntentChange:(0,o.useCallback)(e=>{Y.current=e},[])},(0,o.createElement)(J,Q,(0,o.createElement)(m.M,{asChild:!0,trapped:c,onMountAutoFocus:(0,a.M)(i,e=>{var t;e.preventDefault(),null===(t=W.current)||void 0===t||t.focus()}),onUnmountAutoFocus:d},(0,o.createElement)(f.XB,{asChild:!0,disableOutsidePointerEvents:s,onEscapeKeyDown:w,onPointerDownOutside:h,onFocusOutside:_,onInteractOutside:M,onDismiss:C},(0,o.createElement)(E.fC,(0,r.Z)({asChild:!0},S,{dir:I.dir,orientation:"vertical",loop:l,currentTabStopId:L,onCurrentTabStopIdChange:j,onEntryFocus:(0,a.M)(v,e=>{I.isUsingKeyboardRef.current||e.preventDefault()})}),(0,o.createElement)(g.VY,(0,r.Z)({role:"menu","aria-orientation":"vertical","data-state":eb(P.open),"data-radix-menu-content":"",dir:I.dir},T,k,{ref:G,style:{outline:"none",...k.style},onKeyDown:(0,a.M)(k.onKeyDown,e=>{let t=e.target.closest("[data-radix-menu-content]")===e.currentTarget,n=e.ctrlKey||e.altKey||e.metaKey,r=1===e.key.length;t&&("Tab"===e.key&&e.preventDefault(),!n&&r&&$(e.key));let o=W.current;if(e.target!==o||!D.includes(e.key))return;e.preventDefault();let a=Z().filter(e=>!e.disabled).map(e=>e.ref.current);R.includes(e.key)&&a.reverse(),function(e){let t=document.activeElement;for(let n of e)if(n===t||(n.focus(),document.activeElement!==t))return}(a)}),onBlur:(0,a.M)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(U.current),B.current="")}),onPointerMove:(0,a.M)(e.onPointerMove,ey(e=>{let t=e.target,n=q.current!==e.clientX;if(e.currentTarget.contains(t)&&n){let t=e.clientX>q.current?"right":"left";H.current=t,q.current=e.clientX}}))})))))))}),Q=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,...a}=e;return(0,o.createElement)(i.WV.div,(0,r.Z)({role:"group"},a,{ref:t}))}),$=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,...a}=e;return(0,o.createElement)(i.WV.div,(0,r.Z)({},a,{ref:t}))}),ee="MenuItem",et="menu.itemSelect",en=(0,o.forwardRef)((e,t)=>{let{disabled:n=!1,onSelect:l,...c}=e,d=(0,o.useRef)(null),s=V(ee,e.__scopeMenu),f=X(ee,e.__scopeMenu),p=(0,u.e)(t,d),m=(0,o.useRef)(!1);return(0,o.createElement)(er,(0,r.Z)({},c,{ref:p,disabled:n,onClick:(0,a.M)(e.onClick,()=>{let e=d.current;if(!n&&e){let t=new CustomEvent(et,{bubbles:!0,cancelable:!0});e.addEventListener(et,e=>null==l?void 0:l(e),{once:!0}),(0,i.jH)(e,t),t.defaultPrevented?m.current=!1:s.onClose()}}),onPointerDown:t=>{var n;null===(n=e.onPointerDown)||void 0===n||n.call(e,t),m.current=!0},onPointerUp:(0,a.M)(e.onPointerUp,e=>{var t;m.current||null===(t=e.currentTarget)||void 0===t||t.click()}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{let t=""!==f.searchRef.current;!n&&(!t||" "!==e.key)&&C.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})}))}),er=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,disabled:l=!1,textValue:c,...d}=e,s=X(ee,n),f=A(n),p=(0,o.useRef)(null),m=(0,u.e)(t,p),[v,g]=(0,o.useState)(!1),[w,h]=(0,o.useState)("");return(0,o.useEffect)(()=>{let e=p.current;if(e){var t;h((null!==(t=e.textContent)&&void 0!==t?t:"").trim())}},[d.children]),(0,o.createElement)(I.ItemSlot,{scope:n,disabled:l,textValue:null!=c?c:w},(0,o.createElement)(E.ck,(0,r.Z)({asChild:!0},f,{focusable:!l}),(0,o.createElement)(i.WV.div,(0,r.Z)({role:"menuitem","data-highlighted":v?"":void 0,"aria-disabled":l||void 0,"data-disabled":l?"":void 0},d,{ref:m,onPointerMove:(0,a.M)(e.onPointerMove,ey(e=>{l?s.onItemLeave(e):(s.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus())})),onPointerLeave:(0,a.M)(e.onPointerLeave,ey(e=>s.onItemLeave(e))),onFocus:(0,a.M)(e.onFocus,()=>g(!0)),onBlur:(0,a.M)(e.onBlur,()=>g(!1))}))))}),eo=(0,o.forwardRef)((e,t)=>{let{checked:n=!1,onCheckedChange:u,...l}=e;return(0,o.createElement)(ed,{scope:e.__scopeMenu,checked:n},(0,o.createElement)(en,(0,r.Z)({role:"menuitemcheckbox","aria-checked":e_(n)?"mixed":n},l,{ref:t,"data-state":eM(n),onSelect:(0,a.M)(l.onSelect,()=>null==u?void 0:u(!!e_(n)||!n),{checkForDefaultPrevented:!1})})))}),[ea,eu]=S("MenuRadioGroup",{value:void 0,onValueChange:()=>{}}),el=(0,o.forwardRef)((e,t)=>{let{value:n,onValueChange:a,...u}=e,l=(0,_.W)(a);return(0,o.createElement)(ea,{scope:e.__scopeMenu,value:n,onValueChange:l},(0,o.createElement)(Q,(0,r.Z)({},u,{ref:t})))}),ec=(0,o.forwardRef)((e,t)=>{let{value:n,...u}=e,l=eu("MenuRadioItem",e.__scopeMenu),c=n===l.value;return(0,o.createElement)(ed,{scope:e.__scopeMenu,checked:c},(0,o.createElement)(en,(0,r.Z)({role:"menuitemradio","aria-checked":c},u,{ref:t,"data-state":eM(c),onSelect:(0,a.M)(u.onSelect,()=>{var e;return null===(e=l.onValueChange)||void 0===e?void 0:e.call(l,n)},{checkForDefaultPrevented:!1})})))}),ei="MenuItemIndicator",[ed,es]=S(ei,{checked:!1}),ef=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,forceMount:a,...u}=e,l=es(ei,n);return(0,o.createElement)(h.z,{present:a||e_(l.checked)||!0===l.checked},(0,o.createElement)(i.WV.span,(0,r.Z)({},u,{ref:t,"data-state":eM(l.checked)})))}),ep=(0,o.forwardRef)((e,t)=>{let{__scopeMenu:n,...a}=e;return(0,o.createElement)(i.WV.div,(0,r.Z)({role:"separator","aria-orientation":"horizontal"},a,{ref:t}))}),em=((e,t)=>{let{__scopeMenu:n,...a}=e,u=F(n);return(0,o.createElement)(g.Eh,(0,r.Z)({},u,a,{ref:t}))},"MenuSub"),[ev,eg]=S(em),ew="MenuSubTrigger",eh=(0,o.forwardRef)((e,t)=>{let n=K(ew,e.__scopeMenu),l=V(ew,e.__scopeMenu),c=eg(ew,e.__scopeMenu),i=X(ew,e.__scopeMenu),d=(0,o.useRef)(null),{pointerGraceTimerRef:s,onPointerGraceIntentChange:f}=i,p={__scopeMenu:e.__scopeMenu},m=(0,o.useCallback)(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return(0,o.useEffect)(()=>m,[m]),(0,o.useEffect)(()=>{let e=s.current;return()=>{window.clearTimeout(e),f(null)}},[s,f]),(0,o.createElement)(W,(0,r.Z)({asChild:!0},p),(0,o.createElement)(er,(0,r.Z)({id:c.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":c.contentId,"data-state":eb(n.open)},e,{ref:(0,u.F)(t,c.onTriggerChange),onClick:t=>{var r;null===(r=e.onClick)||void 0===r||r.call(e,t),e.disabled||t.defaultPrevented||(t.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:(0,a.M)(e.onPointerMove,ey(t=>{i.onItemEnter(t),t.defaultPrevented||e.disabled||n.open||d.current||(i.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{n.onOpenChange(!0),m()},100))})),onPointerLeave:(0,a.M)(e.onPointerLeave,ey(e=>{var t,r;m();let o=null===(t=n.content)||void 0===t?void 0:t.getBoundingClientRect();if(o){let t=null===(r=n.content)||void 0===r?void 0:r.dataset.side,a="right"===t,u=o[a?"left":"right"],l=o[a?"right":"left"];i.onPointerGraceIntentChange({area:[{x:e.clientX+(a?-5:5),y:e.clientY},{x:u,y:o.top},{x:l,y:o.top},{x:l,y:o.bottom},{x:u,y:o.bottom}],side:t}),window.clearTimeout(s.current),s.current=window.setTimeout(()=>i.onPointerGraceIntentChange(null),300)}else{if(i.onTriggerLeave(e),e.defaultPrevented)return;i.onPointerGraceIntentChange(null)}})),onKeyDown:(0,a.M)(e.onKeyDown,t=>{let r=""!==i.searchRef.current;if(!e.disabled&&(!r||" "!==t.key)&&O[l.dir].includes(t.key)){var o;n.onOpenChange(!0),null===(o=n.content)||void 0===o||o.focus(),t.preventDefault()}})})))}),eE=(0,o.forwardRef)((e,t)=>{let n=B(z,e.__scopeMenu),{forceMount:l=n.forceMount,...c}=e,i=K(z,e.__scopeMenu),d=V(z,e.__scopeMenu),s=eg("MenuSubContent",e.__scopeMenu),f=(0,o.useRef)(null),p=(0,u.e)(t,f);return(0,o.createElement)(I.Provider,{scope:e.__scopeMenu},(0,o.createElement)(h.z,{present:l||i.open},(0,o.createElement)(I.Slot,{scope:e.__scopeMenu},(0,o.createElement)(J,(0,r.Z)({id:s.contentId,"aria-labelledby":s.triggerId},c,{ref:p,align:"start",side:"rtl"===d.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{var t;d.isUsingKeyboardRef.current&&(null===(t=f.current)||void 0===t||t.focus()),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,a.M)(e.onFocusOutside,e=>{e.target!==s.trigger&&i.onOpenChange(!1)}),onEscapeKeyDown:(0,a.M)(e.onEscapeKeyDown,e=>{d.onClose(),e.preventDefault()}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{let t=e.currentTarget.contains(e.target),n=k[d.dir].includes(e.key);if(t&&n){var r;i.onOpenChange(!1),null===(r=s.trigger)||void 0===r||r.focus(),e.preventDefault()}})})))))});function eb(e){return e?"open":"closed"}function e_(e){return"indeterminate"===e}function eM(e){return e_(e)?"indeterminate":e?"checked":"unchecked"}function ey(e){return t=>"mouse"===t.pointerType?e(t):void 0}let eC=e=>{let{__scopeMenu:t,open:n=!1,children:r,dir:a,onOpenChange:u,modal:l=!0}=e,c=F(t),[i,d]=(0,o.useState)(null),f=(0,o.useRef)(!1),p=(0,_.W)(u),m=(0,s.gm)(a);return(0,o.useEffect)(()=>{let e=()=>{f.current=!0,document.addEventListener("pointerdown",t,{capture:!0,once:!0}),document.addEventListener("pointermove",t,{capture:!0,once:!0})},t=()=>f.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",t,{capture:!0}),document.removeEventListener("pointermove",t,{capture:!0})}},[]),(0,o.createElement)(g.fC,c,(0,o.createElement)(L,{scope:t,open:n,onOpenChange:p,content:i,onContentChange:d},(0,o.createElement)(j,{scope:t,onClose:(0,o.useCallback)(()=>p(!1),[p]),isUsingKeyboardRef:f,dir:m,modal:l},r)))},eR=e=>{let{__scopeMenu:t,forceMount:n,children:r,container:a}=e,u=K(G,t);return(0,o.createElement)(U,{scope:t,forceMount:n},(0,o.createElement)(h.z,{present:n||u.open},(0,o.createElement)(w.h,{asChild:!0,container:a},r)))},eD=e=>{let{__scopeMenu:t,children:n,open:r=!1,onOpenChange:a}=e,u=K(em,t),l=F(t),[c,i]=(0,o.useState)(null),[d,s]=(0,o.useState)(null),f=(0,_.W)(a);return(0,o.useEffect)(()=>(!1===u.open&&f(!1),()=>f(!1)),[u.open,f]),(0,o.createElement)(g.fC,l,(0,o.createElement)(L,{scope:t,open:r,onOpenChange:f,content:d,onContentChange:s},(0,o.createElement)(ev,{scope:t,contentId:(0,v.M)(),triggerId:(0,v.M)(),trigger:c,onTriggerChange:i},n)))},eO="DropdownMenu",[ek,eP]=(0,l.b)(eO,[Z]),eI=Z(),[ex,eT]=ek(eO),eS=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,disabled:l=!1,...c}=e,d=eT("DropdownMenuTrigger",n),s=eI(n);return(0,o.createElement)(W,(0,r.Z)({asChild:!0},s),(0,o.createElement)(i.WV.button,(0,r.Z)({type:"button",id:d.triggerId,"aria-haspopup":"menu","aria-expanded":d.open,"aria-controls":d.open?d.contentId:void 0,"data-state":d.open?"open":"closed","data-disabled":l?"":void 0,disabled:l},c,{ref:(0,u.F)(t,d.triggerRef),onPointerDown:(0,a.M)(e.onPointerDown,e=>{l||0!==e.button||!1!==e.ctrlKey||(d.onOpenToggle(),d.open||e.preventDefault())}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{!l&&(["Enter"," "].includes(e.key)&&d.onOpenToggle(),"ArrowDown"===e.key&&d.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})))}),eZ=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...u}=e,l=eT("DropdownMenuContent",n),c=eI(n),i=(0,o.useRef)(!1);return(0,o.createElement)(Y,(0,r.Z)({id:l.contentId,"aria-labelledby":l.triggerId},c,u,{ref:t,onCloseAutoFocus:(0,a.M)(e.onCloseAutoFocus,e=>{var t;i.current||null===(t=l.triggerRef.current)||void 0===t||t.focus(),i.current=!1,e.preventDefault()}),onInteractOutside:(0,a.M)(e.onInteractOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey,r=2===t.button||n;(!l.modal||r)&&(i.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),eF=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(Q,(0,r.Z)({},u,a,{ref:t}))}),eA=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)($,(0,r.Z)({},u,a,{ref:t}))}),eL=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(en,(0,r.Z)({},u,a,{ref:t}))}),eK=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(eo,(0,r.Z)({},u,a,{ref:t}))}),ej=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(el,(0,r.Z)({},u,a,{ref:t}))}),eV=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(ec,(0,r.Z)({},u,a,{ref:t}))}),eW=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(ef,(0,r.Z)({},u,a,{ref:t}))}),eG=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(ep,(0,r.Z)({},u,a,{ref:t}))}),eU=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(eh,(0,r.Z)({},u,a,{ref:t}))}),eB=(0,o.forwardRef)((e,t)=>{let{__scopeDropdownMenu:n,...a}=e,u=eI(n);return(0,o.createElement)(eE,(0,r.Z)({},u,a,{ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),ez=e=>{let{__scopeDropdownMenu:t,children:n,dir:a,open:u,defaultOpen:l,onOpenChange:i,modal:d=!0}=e,s=eI(t),f=(0,o.useRef)(null),[p=!1,m]=(0,c.T)({prop:u,defaultProp:l,onChange:i});return(0,o.createElement)(ex,{scope:t,triggerId:(0,v.M)(),triggerRef:f,contentId:(0,v.M)(),open:p,onOpenChange:m,onOpenToggle:(0,o.useCallback)(()=>m(e=>!e),[m]),modal:d},(0,o.createElement)(eC,(0,r.Z)({},s,{open:p,onOpenChange:m,dir:a,modal:d}),n))},eN=eS,eX=e=>{let{__scopeDropdownMenu:t,...n}=e,a=eI(t);return(0,o.createElement)(eR,(0,r.Z)({},a,n))},eY=eZ,eH=eF,eq=eA,eJ=eL,eQ=eK,e$=ej,e0=eV,e1=eW,e6=eG,e7=e=>{let{__scopeDropdownMenu:t,children:n,open:a,onOpenChange:u,defaultOpen:l}=e,i=eI(t),[d=!1,s]=(0,c.T)({prop:a,defaultProp:l,onChange:u});return(0,o.createElement)(eD,(0,r.Z)({},i,{open:d,onOpenChange:s}),n)},e8=eU,e2=eB},3715:function(e,t,n){n.d(t,{Pc:function(){return _},ck:function(){return I},fC:function(){return P}});var r=n(2110),o=n(4090),a=n(4991),u=n(7533),l=n(1266),c=n(4104),i=n(8687),d=n(9586),s=n(9830),f=n(9310),p=n(3876);let m="rovingFocusGroup.onEntryFocus",v={bubbles:!1,cancelable:!0},g="RovingFocusGroup",[w,h,E]=(0,u.B)(g),[b,_]=(0,c.b)(g,[E]),[M,y]=b(g),C=(0,o.forwardRef)((e,t)=>(0,o.createElement)(w.Provider,{scope:e.__scopeRovingFocusGroup},(0,o.createElement)(w.Slot,{scope:e.__scopeRovingFocusGroup},(0,o.createElement)(R,(0,r.Z)({},e,{ref:t}))))),R=(0,o.forwardRef)((e,t)=>{let{__scopeRovingFocusGroup:n,orientation:u,loop:c=!1,dir:i,currentTabStopId:g,defaultCurrentTabStopId:w,onCurrentTabStopIdChange:E,onEntryFocus:b,..._}=e,y=(0,o.useRef)(null),C=(0,l.e)(t,y),R=(0,p.gm)(i),[D=null,O]=(0,f.T)({prop:g,defaultProp:w,onChange:E}),[P,I]=(0,o.useState)(!1),x=(0,s.W)(b),T=h(n),S=(0,o.useRef)(!1),[Z,F]=(0,o.useState)(0);return(0,o.useEffect)(()=>{let e=y.current;if(e)return e.addEventListener(m,x),()=>e.removeEventListener(m,x)},[x]),(0,o.createElement)(M,{scope:n,orientation:u,dir:R,loop:c,currentTabStopId:D,onItemFocus:(0,o.useCallback)(e=>O(e),[O]),onItemShiftTab:(0,o.useCallback)(()=>I(!0),[]),onFocusableItemAdd:(0,o.useCallback)(()=>F(e=>e+1),[]),onFocusableItemRemove:(0,o.useCallback)(()=>F(e=>e-1),[])},(0,o.createElement)(d.WV.div,(0,r.Z)({tabIndex:P||0===Z?-1:0,"data-orientation":u},_,{ref:C,style:{outline:"none",...e.style},onMouseDown:(0,a.M)(e.onMouseDown,()=>{S.current=!0}),onFocus:(0,a.M)(e.onFocus,e=>{let t=!S.current;if(e.target===e.currentTarget&&t&&!P){let t=new CustomEvent(m,v);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=T().filter(e=>e.focusable);k([e.find(e=>e.active),e.find(e=>e.id===D),...e].filter(Boolean).map(e=>e.ref.current))}}S.current=!1}),onBlur:(0,a.M)(e.onBlur,()=>I(!1))})))}),D=(0,o.forwardRef)((e,t)=>{let{__scopeRovingFocusGroup:n,focusable:u=!0,active:l=!1,tabStopId:c,...s}=e,f=(0,i.M)(),p=c||f,m=y("RovingFocusGroupItem",n),v=m.currentTabStopId===p,g=h(n),{onFocusableItemAdd:E,onFocusableItemRemove:b}=m;return(0,o.useEffect)(()=>{if(u)return E(),()=>b()},[u,E,b]),(0,o.createElement)(w.ItemSlot,{scope:n,id:p,focusable:u,active:l},(0,o.createElement)(d.WV.span,(0,r.Z)({tabIndex:v?0:-1,"data-orientation":m.orientation},s,{ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{u?m.onItemFocus(p):e.preventDefault()}),onFocus:(0,a.M)(e.onFocus,()=>m.onItemFocus(p)),onKeyDown:(0,a.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){m.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,n){var r;let o=(r=e.key,"rtl"!==n?r:"ArrowLeft"===r?"ArrowRight":"ArrowRight"===r?"ArrowLeft":r);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(o)))return O[o]}(e,m.orientation,m.dir);if(void 0!==t){e.preventDefault();let o=g().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)o.reverse();else if("prev"===t||"next"===t){var n,r;"prev"===t&&o.reverse();let a=o.indexOf(e.currentTarget);o=m.loop?(n=o,r=a+1,n.map((e,t)=>n[(r+t)%n.length])):o.slice(a+1)}setTimeout(()=>k(o))}})})))}),O={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function k(e){let t=document.activeElement;for(let n of e)if(n===t||(n.focus(),document.activeElement!==t))return}let P=C,I=D},158:function(e,t,n){n.d(t,{w_:function(){return d}});var r=n(4090),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=r.createContext&&r.createContext(o),u=["attr","size","title"];function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){var r,o;r=t,o=n[t],(r=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(r))in e?Object.defineProperty(e,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[r]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function d(e){return t=>r.createElement(s,l({attr:i({},e.attr)},t),function e(t){return t&&t.map((t,n)=>r.createElement(t.tag,i({key:n},t.attr),e(t.child)))}(e.child))}function s(e){var t=t=>{var n,{attr:o,size:a,title:c}=e,d=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,u),s=a||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,d,{className:n,style:i(i({color:e.color||t.color},t.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),c&&r.createElement("title",null,c),e.children)};return void 0!==a?r.createElement(a.Consumer,null,e=>t(e)):t(o)}}}]);