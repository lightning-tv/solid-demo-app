import{y as g,z as p,A as m,B as y,u as f,a as l,h as w,g as b,i as e,S as c,V as a,j as o,T as i,t as C,C as x,G as T,s as k}from"./index-BS8X52Oi.js";import{a as I}from"./CoreExtension-BIbjL7uI.js";function B({id:r}){return g.get("/person/".concat(r,"/combined_credits")).then(({cast:t})=>p(t.slice(0,7)))}function R({id:r}){return g.get("/person/".concat(r)).then(t=>({backgroundImage:m(t.profile_path,"original"),heroContent:{title:t.title||t.name,description:t.biography},...t}))}const F=()=>{const r=y(),t=f(),[n]=l(()=>({...r}),R),[u]=l(()=>({...r}),B),h={color:w("#000000"),alpha:.8,width:800,height:440,x:130,y:180,borderRadius:30};function d(){let s=this.children.selected;I(s&&s.href),t(s.href)}return b(()=>{k("#333333")}),e(c,{get when(){return n()},keyed:!0,get children(){return[e(a,{get src(){return n().backgroundImage},width:400,autosize:!0,y:0,x:1800,mountX:1}),e(a,{x:150,y:200,width:800,gap:24,get style(){return o.Column},zIndex:3,get children(){return[e(i,{contain:"width",fontFamily:"Ubuntu",get style(){return C.typography.display2},get children(){return n().name}}),e(i,{contain:"both",get style(){return o.peopleBio},get children(){return n().biography}})]}}),e(a,{style:h}),e(x,{y:670,x:140,get style(){return o.Column},scroll:"none",get children(){return e(c,{get when(){return u()},get children(){return[e(i,{skipFocus:!0,get style(){return o.RowTitle},children:"Credits"}),e(T,{autofocus:!0,onEnter:d,get items(){return u()}})]}})}})]}})};export{F as default};
//# sourceMappingURL=People--BncQ3b3.js.map