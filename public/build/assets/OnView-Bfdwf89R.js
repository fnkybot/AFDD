import{a0 as i,a4 as m,r as t,c as u,b as o,w as r,d as e,F as b,o as p}from"./app-CoOtdqTs.js";const k={class:"content"},g={__name:"OnView",setup(_){const s=i(),n=localStorage.getItem("oneuiVueDarkMode");return s.darkMode({mode:"on"}),m.on("start",()=>{s.darkMode({mode:n})}),(B,a)=>{const l=t("Head"),c=t("BasePageHeading"),d=t("BaseBlock");return p(),u(b,null,[o(l,{title:"Dark Mode On - Layout"}),o(c,{title:"Dark Mode",subtitle:"On"},{extra:r(()=>a[0]||(a[0]=[e("nav",{"aria-label":"breadcrumb"},[e("ol",{class:"breadcrumb breadcrumb-alt"},[e("li",{class:"breadcrumb-item"},[e("a",{class:"link-fx",href:"javascript:void(0)"},"Layout")]),e("li",{class:"breadcrumb-item"},[e("a",{class:"link-fx",href:"javascript:void(0)"},"Dark Mode")]),e("li",{class:"breadcrumb-item","aria-current":"page"},"On")])],-1)])),_:1}),e("div",k,[o(d,{class:"text-center"},{default:r(()=>a[1]||(a[1]=[e("p",null,"Dark Mode enabled.",-1)])),_:1})])],64)}}};export{g as default};