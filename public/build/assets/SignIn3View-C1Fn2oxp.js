import{a0 as $,K as I,j as S,r as u,c as p,b as a,w as d,F as V,o as f,d as e,f as i,z as c,u as t,a1 as L,e as w,_ as g,B as v,l as x,a4 as C}from"./app-CoOtdqTs.js";import{u as F,r as h,m as b}from"./index-X4LCVeXG.js";const T={class:"row g-0 bg-primary-dark-op"},U={class:"hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"},N={class:"p-4 p-xl-5 flex-grow-1 d-flex align-items-center"},P={class:"w-100"},z={class:"p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"},D={class:"fw-medium text-white-50 mb-0"},H={class:"hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"},M={class:"p-3 w-100 d-lg-none text-center"},O={class:"p-4 w-100 flex-grow-1 d-flex align-items-center"},W={class:"w-100"},q={class:"text-center mb-5"},E={class:"fw-medium text-muted"},K={class:"row g-0 justify-content-center"},A={class:"col-sm-8 col-xl-4"},G={class:"mb-4"},J={key:0,class:"invalid-feedback animated fadeIn"},Q={class:"mb-4"},R={key:0,class:"invalid-feedback animated fadeIn"},X={class:"d-flex justify-content-between align-items-center mb-4"},Y={class:"px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"},Z={class:"fw-medium text-black-50 py-2 mb-0"},ne={__name:"SignIn3View",setup(ee){const o=$(),r=I({username:null,password:null}),_=S(()=>({username:{required:h,minLength:b(3)},password:{required:h,minLength:b(5)}})),n=F(_,r);async function y(){await n.value.$validate()&&C.get("/preview/backend/pages/auth")}return(k,s)=>{const j=u("Head"),m=u("Link"),B=u("BaseBackground");return f(),p(V,null,[a(j,{title:"Sign In 3"}),a(B,{image:"/assets/media/photos/photo28@2x.jpg"},{default:d(()=>[e("div",T,[e("div",U,[e("div",N,[e("div",P,[a(m,{href:"/preview",class:"link-fx fw-semibold fs-2 text-white"},{default:d(()=>s[4]||(s[4]=[i(" One"),e("span",{class:"fw-normal"},"UI",-1)])),_:1}),s[5]||(s[5]=e("p",{class:"text-white-75 me-xl-8 mt-2"}," Welcome to your amazing app. Feel free to login and start managing your projects and clients. ",-1))])]),e("div",z,[e("p",D,[e("strong",null,c(t(o).app.name+" "+t(o).app.version),1),i(" © "+c(t(o).app.copyright),1)]),s[6]||(s[6]=e("ul",{class:"list list-inline mb-0 py-2"},[e("li",{class:"list-inline-item"},[e("a",{class:"text-white-75 fw-medium",href:"javascript:void(0)"},"Legal")]),e("li",{class:"list-inline-item"},[e("a",{class:"text-white-75 fw-medium",href:"javascript:void(0)"},"Contact")]),e("li",{class:"list-inline-item"},[e("a",{class:"text-white-75 fw-medium",href:"javascript:void(0)"},"Terms")])],-1))])]),e("div",H,[e("div",M,[a(m,{href:"/preview",class:"link-fx fw-semibold fs-3 text-dark"},{default:d(()=>s[7]||(s[7]=[i(" One"),e("span",{class:"fw-normal"},"UI",-1)])),_:1})]),e("div",O,[e("div",W,[e("div",q,[s[11]||(s[11]=e("p",{class:"mb-3"},[e("i",{class:"fa fa-2x fa-circle-notch text-primary-light"})],-1)),s[12]||(s[12]=e("h1",{class:"fw-bold mb-2"},"Sign In",-1)),e("p",E,[s[9]||(s[9]=i(" Welcome, please login or ")),a(m,{href:"/preview/auth/signup3"},{default:d(()=>s[8]||(s[8]=[i("sign up")])),_:1}),s[10]||(s[10]=i(" for a new account. "))])]),e("div",K,[e("div",A,[e("form",{onSubmit:L(y,["prevent"])},[e("div",G,[w(e("input",{type:"text",class:v(["form-control form-control-lg form-control-alt py-3",{"is-invalid":t(n).username.$errors.length}]),id:"login-username",name:"login-username",placeholder:"Username","onUpdate:modelValue":s[0]||(s[0]=l=>r.username=l),onBlur:s[1]||(s[1]=(...l)=>t(n).username.$touch&&t(n).username.$touch(...l))},null,34),[[g,r.username]]),t(n).username.$errors.length?(f(),p("div",J," Please enter your username ")):x("",!0)]),e("div",Q,[w(e("input",{type:"password",class:v(["form-control form-control-lg form-control-alt py-3",{"is-invalid":t(n).password.$errors.length}]),id:"login-password",name:"login-password",placeholder:"Password","onUpdate:modelValue":s[2]||(s[2]=l=>r.password=l),onBlur:s[3]||(s[3]=(...l)=>t(n).password.$touch&&t(n).password.$touch(...l))},null,34),[[g,r.password]]),t(n).password.$errors.length?(f(),p("div",R," Please enter your password ")):x("",!0)]),e("div",X,[e("div",null,[a(m,{href:"/preview/auth/reminder3",class:"text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1"},{default:d(()=>s[13]||(s[13]=[i(" Forgot Password? ")])),_:1})]),s[14]||(s[14]=e("div",null,[e("button",{type:"submit",class:"btn btn-lg btn-alt-primary"},[e("i",{class:"fa fa-fw fa-sign-in-alt me-1 opacity-50"}),i(" Sign In ")])],-1))])],32)])])])]),e("div",Y,[e("p",Z,[e("strong",null,c(t(o).app.name+" "+t(o).app.version),1),i(" © "+c(t(o).app.copyright),1)]),s[15]||(s[15]=e("ul",{class:"list list-inline py-2 mb-0"},[e("li",{class:"list-inline-item"},[e("a",{class:"text-muted fw-medium",href:"javascript:void(0)"},"Legal")]),e("li",{class:"list-inline-item"},[e("a",{class:"text-muted fw-medium",href:"javascript:void(0)"},"Contact")]),e("li",{class:"list-inline-item"},[e("a",{class:"text-muted fw-medium",href:"javascript:void(0)"},"Terms")])],-1))])])])]),_:1})],64)}}};export{ne as default};
