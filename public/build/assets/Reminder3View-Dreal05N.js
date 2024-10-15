import{a0 as b,K as _,j as y,r as p,c as f,b as d,d as e,w as u,z as n,u as s,f as a,g as m,a1 as k,e as j,_ as V,B as C,l as L,F as S,o as v,a4 as $}from"./app-CoOtdqTs.js";import{u as B,r as N,m as T}from"./index-X4LCVeXG.js";const U={class:"bg-primary"},D={class:"row g-0 bg-primary-dark-op"},F={class:"hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"},I={class:"p-4 p-xl-5 flex-grow-1 d-flex align-items-center"},M={class:"w-100"},P={class:"p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"},R={class:"fw-medium text-white-50 mb-0"},z={class:"hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"},E={class:"p-3 w-100 d-lg-none text-center"},H={class:"p-4 w-100 flex-grow-1 d-flex align-items-center"},O={class:"w-100"},q={class:"row g-0 justify-content-center"},K={class:"col-sm-8 col-xl-4"},Y={class:"mb-4"},A={key:0,class:"invalid-feedback animated fadeIn"},G={class:"px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"},J={class:"fw-medium text-black-50 py-2 mb-0"},Z={__name:"Reminder3View",setup(Q){const i=b(),o=_({reminder:null}),w=y(()=>({reminder:{required:N,minLength:T(3)}})),l=B(w,o);async function x(){await l.value.$validate()&&$.get("/preview/backend/pages/auth")}return(g,t)=>{const h=p("Head"),c=p("Link");return v(),f(S,null,[d(h,{title:"Reminder 3"}),e("div",U,[e("div",D,[e("div",F,[e("div",I,[e("div",M,[d(c,{href:"/preview",class:"link-fx fw-semibold fs-2 text-white"},{default:u(()=>t[2]||(t[2]=[a(" One"),e("span",{class:"fw-normal"},"UI",-1)])),_:1}),t[3]||(t[3]=e("p",{class:"text-white-75 me-xl-8 mt-2"}," Don’t worry, we’ve got your back. You’ll be soon back to your favorite dashboard! ",-1))])]),e("div",P,[e("p",R,[e("strong",null,n(s(i).app.name+" "+s(i).app.version),1),a(" © "+n(s(i).app.copyright),1)]),t[4]||(t[4]=m('<ul class="list list-inline mb-0 py-2"><li class="list-inline-item"><a class="text-white-75 fw-medium" href="javascript:void(0)">Legal</a></li><li class="list-inline-item"><a class="text-white-75 fw-medium" href="javascript:void(0)">Contact</a></li><li class="list-inline-item"><a class="text-white-75 fw-medium" href="javascript:void(0)">Terms</a></li></ul>',1))])]),e("div",z,[e("div",E,[d(c,{href:"/preview",class:"link-fx fw-semibold fs-3 text-dark"},{default:u(()=>t[5]||(t[5]=[a(" One"),e("span",{class:"fw-normal"},"UI",-1)])),_:1})]),e("div",H,[e("div",O,[t[7]||(t[7]=m('<div class="text-center mb-5"><p class="mb-3"><i class="fa fa-2x fa-circle-notch text-primary-light"></i></p><h1 class="fw-bold mb-2">Password Reminder</h1><p class="fw-medium text-muted"> Please provide your account’s email or username and we will send you your password. </p></div>',1)),e("div",q,[e("div",K,[e("form",{onSubmit:k(x,["prevent"])},[e("div",Y,[j(e("input",{type:"text",class:C(["form-control form-control-lg form-control-alt py-3",{"is-invalid":s(l).reminder.$errors.length}]),id:"reminder-credential",name:"reminder-credential",placeholder:"Username or Email","onUpdate:modelValue":t[0]||(t[0]=r=>o.reminder=r),onBlur:t[1]||(t[1]=(...r)=>s(l).reminder.$touch&&s(l).reminder.$touch(...r))},null,34),[[V,o.reminder]]),s(l).reminder.$errors.length?(v(),f("div",A," Please enter a valid credential ")):L("",!0)]),t[6]||(t[6]=e("div",{class:"text-center"},[e("button",{type:"submit",class:"btn btn-lg btn-alt-primary"},[e("i",{class:"fa fa-fw fa-envelope me-1 opacity-50"}),a(" Send Mail ")])],-1))],32)])])])]),e("div",G,[e("p",J,[e("strong",null,n(s(i).app.name+" "+s(i).app.version),1),a(" © "+n(s(i).app.copyright),1)]),t[8]||(t[8]=m('<ul class="list list-inline py-2 mb-0"><li class="list-inline-item"><a class="text-muted fw-medium" href="javascript:void(0)">Legal</a></li><li class="list-inline-item"><a class="text-muted fw-medium" href="javascript:void(0)">Contact</a></li><li class="list-inline-item"><a class="text-muted fw-medium" href="javascript:void(0)">Terms</a></li></ul>',1))])])])])],64)}}};export{Z as default};