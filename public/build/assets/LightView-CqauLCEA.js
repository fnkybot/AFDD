import{a0 as n,a4 as m,r as s,c as b,b as o,w as r,d as e,F as u,o as p}from"./app-CoOtdqTs.js";const g={class:"content"},h={__name:"LightView",setup(_){const t=n(),i=localStorage.getItem("oneuiVueDarkMode");return t.darkMode({mode:"off"}),t.sidebarStyle({mode:"light"}),m.on("start",()=>{t.darkMode({mode:i})}),(f,a)=>{const c=s("Head"),l=s("BasePageHeading"),d=s("BaseBlock");return p(),b(u,null,[o(c,{title:"Light - Sidebar - Layout"}),o(l,{title:"Sidebar",subtitle:"Light"},{extra:r(()=>a[0]||(a[0]=[e("nav",{"aria-label":"breadcrumb"},[e("ol",{class:"breadcrumb breadcrumb-alt"},[e("li",{class:"breadcrumb-item"},[e("a",{class:"link-fx",href:"javascript:void(0)"},"Layout")]),e("li",{class:"breadcrumb-item"},[e("a",{class:"link-fx",href:"javascript:void(0)"},"Sidebar")]),e("li",{class:"breadcrumb-item","aria-current":"page"},"Light")])],-1)])),_:1}),e("div",g,[o(d,{class:"text-center"},{default:r(()=>a[1]||(a[1]=[e("p",{class:"text-center"}," You can have a light themed Sidebar (works with Dark Mode off). ",-1)])),_:1})])],64)}}};export{h as default};
