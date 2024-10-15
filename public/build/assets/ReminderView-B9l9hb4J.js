import{a0 as b,K as h,j as y,r as i,c as m,b as l,d as e,w as d,z as c,u as s,f as u,F as k,o as p,a1 as B,e as V,_ as $,B as S,l as C,a4 as L}from"./app-CoOtdqTs.js";import{u as N,r as F,m as M}from"./index-X4LCVeXG.js";const P={class:"hero-static d-flex align-items-center"},R={class:"content"},T={class:"row justify-content-center push"},U={class:"col-md-8 col-lg-6 col-xl-4"},j={class:"p-sm-3 px-lg-4 px-xxl-5 py-lg-5"},z={class:"mb-4"},D={key:0,class:"invalid-feedback animated fadeIn"},E={class:"fs-sm text-muted text-center"},K={__name:"ReminderView",setup(H){const o=b(),a=h({reminder:null}),f=y(()=>({reminder:{required:F,minLength:M(3)}})),n=N(f,a);async function v(){await n.value.$validate()&&L.get("/preview/backend/pages/auth")}return(_,t)=>{const g=i("Head"),w=i("Link"),x=i("BaseBlock");return p(),m(k,null,[l(g,{title:"Reminder"}),e("div",P,[e("div",R,[e("div",T,[e("div",U,[l(x,{title:"Password Reminder",class:"mb-0"},{options:d(()=>[l(w,{href:"/preview/auth/signin",class:"btn-block-option"},{default:d(()=>t[2]||(t[2]=[e("i",{class:"fa fa-sign-in-alt"},null,-1)])),_:1})]),default:d(()=>[e("div",j,[t[4]||(t[4]=e("h1",{class:"h2 mb-1"},"OneUI",-1)),t[5]||(t[5]=e("p",{class:"fw-medium text-muted"}," Please provide your account’s email or username and we will send you your password. ",-1)),e("form",{onSubmit:B(v,["prevent"])},[e("div",z,[V(e("input",{type:"text",class:S(["form-control form-control-lg form-control-alt",{"is-invalid":s(n).reminder.$errors.length}]),id:"reminder-credential",name:"reminder-credential",placeholder:"Username or Email","onUpdate:modelValue":t[0]||(t[0]=r=>a.reminder=r),onBlur:t[1]||(t[1]=(...r)=>s(n).reminder.$touch&&s(n).reminder.$touch(...r))},null,34),[[$,a.reminder]]),s(n).reminder.$errors.length?(p(),m("div",D," Please enter a valid credential ")):C("",!0)]),t[3]||(t[3]=e("div",{class:"row mb-4"},[e("div",{class:"col-md-6 col-xl-5"},[e("button",{type:"submit",class:"btn w-100 btn-alt-primary"},[e("i",{class:"fa fa-fw fa-envelope me-1 opacity-50"}),u(" Send Mail ")])])],-1))],32)])]),_:1})])]),e("div",E,[e("strong",null,c(s(o).app.name+" "+s(o).app.version),1),u(" © "+c(s(o).app.copyright),1)])])])],64)}}};export{K as default};
