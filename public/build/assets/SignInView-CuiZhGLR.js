import{a0 as S,K as V,j as I,r as d,c as m,b as r,d as e,w as l,z as f,u as t,f as u,F as L,o as c,a1 as C,e as g,_ as v,B as w,l as b,a4 as F}from"./app-CoOtdqTs.js";import{u as N,r as h,m as _}from"./index-X4LCVeXG.js";const P={class:"hero-static d-flex align-items-center"},U={class:"content"},M={class:"row justify-content-center push"},T={class:"col-md-8 col-lg-6 col-xl-4"},j={class:"p-sm-3 px-lg-4 px-xxl-5 py-lg-5"},z={class:"py-3"},D={class:"mb-4"},H={key:0,class:"invalid-feedback animated fadeIn"},q={class:"mb-4"},E={key:0,class:"invalid-feedback animated fadeIn"},K={class:"fs-sm text-muted text-center"},A={__name:"SignInView",setup(O){const i=S(),a=V({username:null,password:null}),k=I(()=>({username:{required:h,minLength:_(3)},password:{required:h,minLength:_(5)}})),o=N(k,a);async function x(){await o.value.$validate()&&F.get("/preview/backend/pages/auth")}return(y,s)=>{const B=d("Head"),p=d("Link"),$=d("BaseBlock");return c(),m(L,null,[r(B,{title:"Sign In"}),e("div",P,[e("div",U,[e("div",M,[e("div",T,[r($,{title:"Sign In",class:"mb-0"},{options:l(()=>[r(p,{href:"/preview/auth/reminder",class:"btn-block-option fs-sm"},{default:l(()=>s[4]||(s[4]=[u("Forgot Password?")])),_:1}),r(p,{href:"/preview/auth/signup",class:"btn-block-option"},{default:l(()=>s[5]||(s[5]=[e("i",{class:"fa fa-user-plus"},null,-1)])),_:1})]),default:l(()=>[e("div",j,[s[8]||(s[8]=e("h1",{class:"h2 mb-1"},"OneUI",-1)),s[9]||(s[9]=e("p",{class:"fw-medium text-muted"},"Welcome, please login.",-1)),e("form",{onSubmit:C(x,["prevent"])},[e("div",z,[e("div",D,[g(e("input",{type:"text",class:w(["form-control form-control-alt form-control-lg",{"is-invalid":t(o).username.$errors.length}]),id:"login-username",name:"login-username",placeholder:"Username","onUpdate:modelValue":s[0]||(s[0]=n=>a.username=n),onBlur:s[1]||(s[1]=(...n)=>t(o).username.$touch&&t(o).username.$touch(...n))},null,34),[[v,a.username]]),t(o).username.$errors.length?(c(),m("div",H," Please enter your username ")):b("",!0)]),e("div",q,[g(e("input",{type:"password",class:w(["form-control form-control-alt form-control-lg",{"is-invalid":t(o).password.$errors.length}]),id:"login-password",name:"login-password",placeholder:"Password","onUpdate:modelValue":s[2]||(s[2]=n=>a.password=n),onBlur:s[3]||(s[3]=(...n)=>t(o).password.$touch&&t(o).password.$touch(...n))},null,34),[[v,a.password]]),t(o).password.$errors.length?(c(),m("div",E," Please enter your password ")):b("",!0)]),s[6]||(s[6]=e("div",{class:"mb-4"},[e("div",{class:"form-check"},[e("input",{class:"form-check-input",type:"checkbox",value:"",id:"login-remember",name:"login-remember"}),e("label",{class:"form-check-label",for:"login-remember"},"Remember Me")])],-1))]),s[7]||(s[7]=e("div",{class:"row mb-4"},[e("div",{class:"col-md-6 col-xl-5"},[e("button",{type:"submit",class:"btn w-100 btn-alt-primary"},[e("i",{class:"fa fa-fw fa-sign-in-alt me-1 opacity-50"}),u(" Sign In ")])])],-1))],32)])]),_:1})])]),e("div",K,[e("strong",null,f(t(i).app.name+" "+t(i).app.version),1),u(" © "+f(t(i).app.copyright),1)])])])],64)}}};export{A as default};
