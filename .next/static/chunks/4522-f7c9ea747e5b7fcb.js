"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4522],{7461:function(e,t,r){r.d(t,{Z:function(){return i}});var n=r(4090),o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),i=(e,t)=>{let r=(0,n.forwardRef)((r,i)=>{let{color:c="currentColor",size:l=24,strokeWidth:a=2,absoluteStrokeWidth:f,className:s="",children:d,...v}=r;return(0,n.createElement)("svg",{ref:i,...o,width:l,height:l,stroke:c,strokeWidth:f?24*Number(a)/Number(l):a,className:["lucide","lucide-".concat(u(e)),s].join(" "),...v},[...t.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(d)?d:[d]])});return r.displayName="".concat(e),r}},4991:function(e,t,r){r.d(t,{M:function(){return n}});function n(e,t){let{checkForDefaultPrevented:r=!0}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(n){if(null==e||e(n),!1===r||!n.defaultPrevented)return null==t?void 0:t(n)}}},7533:function(e,t,r){r.d(t,{B:function(){return c}});var n=r(4090),o=r(4104),u=r(1266),i=r(9143);function c(e){let t=e+"CollectionProvider",[r,c]=(0,o.b)(t),[l,a]=r(t,{collectionRef:{current:null},itemMap:new Map}),f=e+"CollectionSlot",s=n.forwardRef((e,t)=>{let{scope:r,children:o}=e,c=a(f,r),l=(0,u.e)(t,c.collectionRef);return n.createElement(i.g7,{ref:l},o)}),d=e+"CollectionItemSlot",v="data-radix-collection-item";return[{Provider:e=>{let{scope:t,children:r}=e,o=n.useRef(null),u=n.useRef(new Map).current;return n.createElement(l,{scope:t,itemMap:u,collectionRef:o},r)},Slot:s,ItemSlot:n.forwardRef((e,t)=>{let{scope:r,children:o,...c}=e,l=n.useRef(null),f=(0,u.e)(t,l),s=a(d,r);return n.useEffect(()=>(s.itemMap.set(l,{ref:l,...c}),()=>void s.itemMap.delete(l))),n.createElement(i.g7,{[v]:"",ref:f},o)})},function(t){let r=a(e+"CollectionConsumer",t);return n.useCallback(()=>{let e=r.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(v,"]")));return Array.from(r.itemMap.values()).sort((e,r)=>t.indexOf(e.ref.current)-t.indexOf(r.ref.current))},[r.collectionRef,r.itemMap])},c]}},4104:function(e,t,r){r.d(t,{b:function(){return u},k:function(){return o}});var n=r(4090);function o(e,t){let r=(0,n.createContext)(t);function o(e){let{children:t,...o}=e,u=(0,n.useMemo)(()=>o,Object.values(o));return(0,n.createElement)(r.Provider,{value:u},t)}return o.displayName=e+"Provider",[o,function(o){let u=(0,n.useContext)(r);if(u)return u;if(void 0!==t)return t;throw Error("`".concat(o,"` must be used within `").concat(e,"`"))}]}function u(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=[],o=()=>{let t=r.map(e=>(0,n.createContext)(e));return function(r){let o=(null==r?void 0:r[e])||t;return(0,n.useMemo)(()=>({["__scope".concat(e)]:{...r,[e]:o}}),[r,o])}};return o.scopeName=e,[function(t,o){let u=(0,n.createContext)(o),i=r.length;function c(t){let{scope:r,children:o,...c}=t,l=(null==r?void 0:r[e][i])||u,a=(0,n.useMemo)(()=>c,Object.values(c));return(0,n.createElement)(l.Provider,{value:a},o)}return r=[...r,o],c.displayName=t+"Provider",[c,function(r,c){let l=(null==c?void 0:c[e][i])||u,a=(0,n.useContext)(l);if(a)return a;if(void 0!==o)return o;throw Error("`".concat(r,"` must be used within `").concat(t,"`"))}]},function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let o=t[0];if(1===t.length)return o;let u=()=>{let e=t.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(t){let r=e.reduce((e,r)=>{let{useScope:n,scopeName:o}=r,u=n(t)["__scope".concat(o)];return{...e,...u}},{});return(0,n.useMemo)(()=>({["__scope".concat(o.scopeName)]:r}),[r])}};return u.scopeName=o.scopeName,u}(o,...t)]}},3876:function(e,t,r){r.d(t,{gm:function(){return u}});var n=r(4090);let o=(0,n.createContext)(void 0);function u(e){let t=(0,n.useContext)(o);return e||t||"ltr"}},8687:function(e,t,r){r.d(t,{M:function(){return l}});var n,o=r(4090),u=r(2618);let i=(n||(n=r.t(o,2)))["useId".toString()]||(()=>void 0),c=0;function l(e){let[t,r]=o.useState(i());return(0,u.b)(()=>{e||r(e=>null!=e?e:String(c++))},[e]),e||(t?"radix-".concat(t):"")}},9830:function(e,t,r){r.d(t,{W:function(){return o}});var n=r(4090);function o(e){let t=(0,n.useRef)(e);return(0,n.useEffect)(()=>{t.current=e}),(0,n.useMemo)(()=>function(){for(var e,r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];return null===(e=t.current)||void 0===e?void 0:e.call(t,...n)},[])}},9310:function(e,t,r){r.d(t,{T:function(){return u}});var n=r(4090),o=r(9830);function u(e){let{prop:t,defaultProp:r,onChange:u=()=>{}}=e,[i,c]=function(e){let{defaultProp:t,onChange:r}=e,u=(0,n.useState)(t),[i]=u,c=(0,n.useRef)(i),l=(0,o.W)(r);return(0,n.useEffect)(()=>{c.current!==i&&(l(i),c.current=i)},[i,c,l]),u}({defaultProp:r,onChange:u}),l=void 0!==t,a=l?t:i,f=(0,o.W)(u);return[a,(0,n.useCallback)(e=>{if(l){let r="function"==typeof e?e(t):e;r!==t&&f(r)}else c(e)},[l,t,c,f])]}},2618:function(e,t,r){r.d(t,{b:function(){return o}});var n=r(4090);let o=(null==globalThis?void 0:globalThis.document)?n.useLayoutEffect:()=>{}},6769:function(e,t,r){r.d(t,{t:function(){return u}});var n=r(4090),o=r(2618);function u(e){let[t,r]=(0,n.useState)(void 0);return(0,o.b)(()=>{if(e){r({width:e.offsetWidth,height:e.offsetHeight});let t=new ResizeObserver(t=>{let n,o;if(!Array.isArray(t)||!t.length)return;let u=t[0];if("borderBoxSize"in u){let e=u.borderBoxSize,t=Array.isArray(e)?e[0]:e;n=t.inlineSize,o=t.blockSize}else n=e.offsetWidth,o=e.offsetHeight;r({width:n,height:o})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}r(void 0)},[e]),t}}}]);