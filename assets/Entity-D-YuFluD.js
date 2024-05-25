import{y as h,z as m,A as B,B as I,u as D,a as d,c as M,f as V,o as z,s as H,h as v,i as o,S as k,V as g,D as S,R as j,E as C,C as G,j as f,k as N,T as R,G as F,H as P,J as U,K as Y}from"./index-BS8X52Oi.js";import{a as J}from"./CoreExtension-BIbjL7uI.js";function K(t){const r=Math.floor(t/60),s=t%60;return r+"h "+(s<10?"0":"")+s+"min"}function q(t){const r=t.split("-");return r[1]+"/"+r[2]+"/"+r[0]}function T(t){return t.split("-")[0]}function L({type:t,id:r}){return h.get("/".concat(t,"/").concat(r,"/recommendations")).then(({results:s})=>s.length?m(s.slice(0,7)):h.get("/trending/".concat(t,"/week?page=1")).then(({results:n})=>m(n.slice(0,7))))}function O({type:t,id:r}){return h.get("/".concat(t,"/").concat(r,"/credits")).then(({cast:s})=>m(s.slice(0,7)))}function Q({type:t,id:r}){let s=t==="movie"?{rtCrit:86,rtFan:92}:{};return h.get("/".concat(t,"/").concat(r)).then(n=>({backgroundImage:B(n.backdrop_path,"w1280"),heroContent:{title:n.title||n.name,description:n.overview,badges:["HD","CC"],voteAverage:n.vote_average,voteCount:n.vote_count,metaText:t==="movie"?K(n.runtime)+"   "+q(n.release_date):"".concat(T(n.first_air_date)," - ").concat(T(n.last_air_date)),reviews:s},...n}))}const Z=()=>{const t=I(),r=D(),[s]=d(()=>({...t}),Q),[n]=d(()=>({...t}),O),[p]=d(()=>({...t}),L),[_,y]=M(0);V(z(s,e=>{H(e.backgroundImage)},{defer:!0}));const u=640,x={color:v("#000000"),alpha:0,width:1900,height:890,x:-160,y:u,borderRadius:30};function E(){var e;(e=this.children.selected)==null||e.setFocus(),c.y=u,i.y=u,i.alpha=0}function $(){var e;(e=this.children.selected)==null||e.setFocus(),c.y=200,i.y=160,i.alpha=.9}function w(){let e=this.children.find(a=>a.states.has("focus"));J(e&&e.href),r(e.href)}function b(){P(),document.getElementsByTagName("canvas")[0].focus(),l.setFocus(),y(0)}function A(){const e=U();Y(e),y(.9)}let c,i,l;return o(k,{get when(){return s()},keyed:!0,get children(){return[o(g,{x:170,onUp:()=>l.setFocus(),onEscape:b,get children(){return[o(S,{y:260,get content(){return s().heroContent}}),o(j,{ref(e){var a=l;typeof a=="function"?a(e):l=e},y:500,scroll:"none",height:90,width:640,gap:40,onDown:()=>c.setFocus(),onEnter:A,get children(){return[o(C,{width:300,autofocus:!0,children:"Play"}),o(C,{width:300,children:"Resume"})]}}),o(G,{ref(e){var a=c;typeof a=="function"?a(e):c=e},x:0,y:u,get style(){return f.Column},height:880,scroll:"none",zIndex:5,get children(){return o(k,{get when(){return N(()=>!!p())()&&n()},get children(){return[o(R,{skipFocus:!0,get style(){return f.RowTitle},children:"Recommendations"}),o(F,{onFocus:E,onEnter:w,get items(){return p()},width:1620}),o(R,{skipFocus:!0,get style(){return f.RowTitle},children:"Cast and Crew"}),o(F,{onFocus:$,onEnter:w,get items(){return n()},width:1620})]}})}}),o(g,{ref(e){var a=i;typeof a=="function"?a(e):i=e},style:x,transition:{alpha:!0,y:!0}})]}}),o(g,{get alpha(){return _()},get color(){return v("#000000")},skipFocus:!0,zIndex:200,transition:{alpha:!0}})]}})};export{Z as default};
//# sourceMappingURL=Entity-D-YuFluD.js.map