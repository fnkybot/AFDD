import{ae as tt,i as nt,v as it,I as st,j as K,m as pe}from"./app-CoOtdqTs.js";function ye(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const i=e[t],u=typeof i;(u==="object"||u==="function")&&!Object.isFrozen(i)&&ye(i)}),e}class Ee{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Re(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function I(e,...t){const i=Object.create(null);for(const u in e)i[u]=e[u];return t.forEach(function(u){for(const d in u)i[d]=u[d]}),i}const rt="</span>",be=e=>!!e.scope,ct=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const i=e.split(".");return[`${t}${i.shift()}`,...i.map((u,d)=>`${u}${"_".repeat(d+1)}`)].join(" ")}return`${t}${e}`};class at{constructor(t,i){this.buffer="",this.classPrefix=i.classPrefix,t.walk(this)}addText(t){this.buffer+=Re(t)}openNode(t){if(!be(t))return;const i=ct(t.scope,{prefix:this.classPrefix});this.span(i)}closeNode(t){be(t)&&(this.buffer+=rt)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const _e=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class ie{constructor(){this.rootNode=_e(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const i=_e({scope:t});this.add(i),this.stack.push(i)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,i){return typeof i=="string"?t.addText(i):i.children&&(t.openNode(i),i.children.forEach(u=>this._walk(t,u)),t.closeNode(i)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(i=>typeof i=="string")?t.children=[t.children.join("")]:t.children.forEach(i=>{ie._collapse(i)}))}}class ot extends ie{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,i){const u=t.root;i&&(u.scope=`language:${i}`),this.add(u)}toHTML(){return new at(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function j(e){return e?typeof e=="string"?e:e.source:null}function Se(e){return C("(?=",e,")")}function lt(e){return C("(?:",e,")*")}function ut(e){return C("(?:",e,")?")}function C(...e){return e.map(i=>j(i)).join("")}function gt(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function se(...e){return"("+(gt(e).capture?"":"?:")+e.map(u=>j(u)).join("|")+")"}function Ae(e){return new RegExp(e.toString()+"|").exec("").length-1}function ft(e,t){const i=e&&e.exec(t);return i&&i.index===0}const ht=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function re(e,{joinWith:t}){let i=0;return e.map(u=>{i+=1;const d=i;let p=j(u),c="";for(;p.length>0;){const r=ht.exec(p);if(!r){c+=p;break}c+=p.substring(0,r.index),p=p.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?c+="\\"+String(Number(r[1])+d):(c+=r[0],r[0]==="("&&i++)}return c}).map(u=>`(${u})`).join(t)}const dt=/\b\B/,Te="[a-zA-Z]\\w*",ce="[a-zA-Z_]\\w*",ve="\\b\\d+(\\.\\d+)?",ke="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ie="\\b(0b[01]+)",pt="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Et=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=C(t,/.*\b/,e.binary,/\b.*/)),I({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(i,u)=>{i.index!==0&&u.ignoreMatch()}},e)},m={begin:"\\\\[\\s\\S]",relevance:0},bt={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[m]},_t={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[m]},Mt={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Y=function(e,t,i={}){const u=I({scope:"comment",begin:e,end:t,contains:[]},i);u.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const d=se("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return u.contains.push({begin:C(/[ ]+/,"(",d,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),u},xt=Y("//","$"),wt=Y("/\\*","\\*/"),Nt=Y("#","$"),Ot={scope:"number",begin:ve,relevance:0},yt={scope:"number",begin:ke,relevance:0},Rt={scope:"number",begin:Ie,relevance:0},St={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[m,{begin:/\[/,end:/\]/,relevance:0,contains:[m]}]},At={scope:"title",begin:Te,relevance:0},Tt={scope:"title",begin:ce,relevance:0},vt={begin:"\\.\\s*"+ce,relevance:0},kt=function(e){return Object.assign(e,{"on:begin":(t,i)=>{i.data._beginMatch=t[1]},"on:end":(t,i)=>{i.data._beginMatch!==t[1]&&i.ignoreMatch()}})};var X=Object.freeze({__proto__:null,APOS_STRING_MODE:bt,BACKSLASH_ESCAPE:m,BINARY_NUMBER_MODE:Rt,BINARY_NUMBER_RE:Ie,COMMENT:Y,C_BLOCK_COMMENT_MODE:wt,C_LINE_COMMENT_MODE:xt,C_NUMBER_MODE:yt,C_NUMBER_RE:ke,END_SAME_AS_BEGIN:kt,HASH_COMMENT_MODE:Nt,IDENT_RE:Te,MATCH_NOTHING_RE:dt,METHOD_GUARD:vt,NUMBER_MODE:Ot,NUMBER_RE:ve,PHRASAL_WORDS_MODE:Mt,QUOTE_STRING_MODE:_t,REGEXP_MODE:St,RE_STARTERS_RE:pt,SHEBANG:Et,TITLE_MODE:At,UNDERSCORE_IDENT_RE:ce,UNDERSCORE_TITLE_MODE:Tt});function It(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Lt(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Dt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=It,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Ct(e,t){Array.isArray(e.illegal)&&(e.illegal=se(...e.illegal))}function Bt(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Pt(e,t){e.relevance===void 0&&(e.relevance=1)}const Ht=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const i=Object.assign({},e);Object.keys(e).forEach(u=>{delete e[u]}),e.keywords=i.keywords,e.begin=C(i.beforeMatch,Se(i.begin)),e.starts={relevance:0,contains:[Object.assign(i,{endsParent:!0})]},e.relevance=0,delete i.beforeMatch},jt=["of","and","for","in","not","or","if","then","parent","list","value"],mt="keyword";function Le(e,t,i=mt){const u=Object.create(null);return typeof e=="string"?d(i,e.split(" ")):Array.isArray(e)?d(i,e):Object.keys(e).forEach(function(p){Object.assign(u,Le(e[p],t,p))}),u;function d(p,c){t&&(c=c.map(r=>r.toLowerCase())),c.forEach(function(r){const l=r.split("|");u[l[0]]=[p,Ut(l[0],l[1])]})}}function Ut(e,t){return t?Number(t):Gt(e)?0:1}function Gt(e){return jt.includes(e.toLowerCase())}const Me={},D=e=>{console.error(e)},xe=(e,...t)=>{console.log(`WARN: ${e}`,...t)},B=(e,t)=>{Me[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Me[`${e}/${t}`]=!0)},F=new Error;function De(e,t,{key:i}){let u=0;const d=e[i],p={},c={};for(let r=1;r<=t.length;r++)c[r+u]=d[r],p[r+u]=!0,u+=Ae(t[r-1]);e[i]=c,e[i]._emit=p,e[i]._multi=!0}function $t(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw D("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),F;if(typeof e.beginScope!="object"||e.beginScope===null)throw D("beginScope must be object"),F;De(e,e.begin,{key:"beginScope"}),e.begin=re(e.begin,{joinWith:""})}}function zt(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw D("skip, excludeEnd, returnEnd not compatible with endScope: {}"),F;if(typeof e.endScope!="object"||e.endScope===null)throw D("endScope must be object"),F;De(e,e.end,{key:"endScope"}),e.end=re(e.end,{joinWith:""})}}function Wt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Kt(e){Wt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),$t(e),zt(e)}function Xt(e){function t(c,r){return new RegExp(j(c),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=Ae(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=t(re(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const M=l.findIndex((H,Z)=>Z>0&&H!==void 0),x=this.matchIndexes[M];return l.splice(0,M),Object.assign(l,x)}}class u{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new i;return this.rules.slice(r).forEach(([M,x])=>l.addRule(M,x)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let M=l.exec(r);if(this.resumingScanAtSamePosition()&&!(M&&M.index===this.lastIndex)){const x=this.getMatcher(0);x.lastIndex=this.lastIndex+1,M=x.exec(r)}return M&&(this.regexIndex+=M.position+1,this.regexIndex===this.count&&this.considerAll()),M}}function d(c){const r=new u;return c.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),c.terminatorEnd&&r.addRule(c.terminatorEnd,{type:"end"}),c.illegal&&r.addRule(c.illegal,{type:"illegal"}),r}function p(c,r){const l=c;if(c.isCompiled)return l;[Lt,Bt,Kt,Ht].forEach(x=>x(c,r)),e.compilerExtensions.forEach(x=>x(c,r)),c.__beforeBegin=null,[Dt,Ct,Pt].forEach(x=>x(c,r)),c.isCompiled=!0;let M=null;return typeof c.keywords=="object"&&c.keywords.$pattern&&(c.keywords=Object.assign({},c.keywords),M=c.keywords.$pattern,delete c.keywords.$pattern),M=M||/\w+/,c.keywords&&(c.keywords=Le(c.keywords,e.case_insensitive)),l.keywordPatternRe=t(M,!0),r&&(c.begin||(c.begin=/\B|\b/),l.beginRe=t(l.begin),!c.end&&!c.endsWithParent&&(c.end=/\B|\b/),c.end&&(l.endRe=t(l.end)),l.terminatorEnd=j(l.end)||"",c.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(c.end?"|":"")+r.terminatorEnd)),c.illegal&&(l.illegalRe=t(c.illegal)),c.contains||(c.contains=[]),c.contains=[].concat(...c.contains.map(function(x){return Ft(x==="self"?c:x)})),c.contains.forEach(function(x){p(x,l)}),c.starts&&p(c.starts,r),l.matcher=d(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=I(e.classNameAliases||{}),p(e)}function Ce(e){return e?e.endsWithParent||Ce(e.starts):!1}function Ft(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return I(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ce(e)?I(e,{starts:e.starts?I(e.starts):null}):Object.isFrozen(e)?I(e):e}var Yt="11.10.0";class Zt extends Error{constructor(t,i){super(t),this.name="HTMLInjectionError",this.html=i}}const te=Re,we=I,Ne=Symbol("nomatch"),Jt=7,Be=function(e){const t=Object.create(null),i=Object.create(null),u=[];let d=!0;const p="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:ot};function l(n){return r.noHighlightRe.test(n)}function M(n){let o=n.className+" ";o+=n.parentNode?n.parentNode.className:"";const h=r.languageDetectRe.exec(o);if(h){const b=v(h[1]);return b||(xe(p.replace("{}",h[1])),xe("Falling back to no-highlight mode for this block.",n)),b?h[1]:"no-highlight"}return o.split(/\s+/).find(b=>l(b)||v(b))}function x(n,o,h){let b="",w="";typeof o=="object"?(b=n,h=o.ignoreIllegals,w=o.language):(B("10.7.0","highlight(lang, code, ...args) has been deprecated."),B("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),w=n,b=o),h===void 0&&(h=!0);const R={code:b,language:w};G("before:highlight",R);const k=R.result?R.result:H(R.language,R.code,h);return k.code=R.code,G("after:highlight",k),k}function H(n,o,h,b){const w=Object.create(null);function R(s,a){return s.keywords[a]}function k(){if(!g.keywords){N.addText(_);return}let s=0;g.keywordPatternRe.lastIndex=0;let a=g.keywordPatternRe.exec(_),f="";for(;a;){f+=_.substring(s,a.index);const E=A.case_insensitive?a[0].toLowerCase():a[0],O=R(g,E);if(O){const[T,Ve]=O;if(N.addText(f),f="",w[E]=(w[E]||0)+1,w[E]<=Jt&&(W+=Ve),T.startsWith("_"))f+=a[0];else{const et=A.classNameAliases[T]||T;S(a[0],et)}}else f+=a[0];s=g.keywordPatternRe.lastIndex,a=g.keywordPatternRe.exec(_)}f+=_.substring(s),N.addText(f)}function $(){if(_==="")return;let s=null;if(typeof g.subLanguage=="string"){if(!t[g.subLanguage]){N.addText(_);return}s=H(g.subLanguage,_,!0,de[g.subLanguage]),de[g.subLanguage]=s._top}else s=J(_,g.subLanguage.length?g.subLanguage:null);g.relevance>0&&(W+=s.relevance),N.__addSublanguage(s._emitter,s.language)}function y(){g.subLanguage!=null?$():k(),_=""}function S(s,a){s!==""&&(N.startScope(a),N.addText(s),N.endScope())}function ue(s,a){let f=1;const E=a.length-1;for(;f<=E;){if(!s._emit[f]){f++;continue}const O=A.classNameAliases[s[f]]||s[f],T=a[f];O?S(T,O):(_=T,k(),_=""),f++}}function ge(s,a){return s.scope&&typeof s.scope=="string"&&N.openNode(A.classNameAliases[s.scope]||s.scope),s.beginScope&&(s.beginScope._wrap?(S(_,A.classNameAliases[s.beginScope._wrap]||s.beginScope._wrap),_=""):s.beginScope._multi&&(ue(s.beginScope,a),_="")),g=Object.create(s,{parent:{value:g}}),g}function fe(s,a,f){let E=ft(s.endRe,f);if(E){if(s["on:end"]){const O=new Ee(s);s["on:end"](a,O),O.isMatchIgnored&&(E=!1)}if(E){for(;s.endsParent&&s.parent;)s=s.parent;return s}}if(s.endsWithParent)return fe(s.parent,a,f)}function Ye(s){return g.matcher.regexIndex===0?(_+=s[0],1):(ee=!0,0)}function Ze(s){const a=s[0],f=s.rule,E=new Ee(f),O=[f.__beforeBegin,f["on:begin"]];for(const T of O)if(T&&(T(s,E),E.isMatchIgnored))return Ye(a);return f.skip?_+=a:(f.excludeBegin&&(_+=a),y(),!f.returnBegin&&!f.excludeBegin&&(_=a)),ge(f,s),f.returnBegin?0:a.length}function Je(s){const a=s[0],f=o.substring(s.index),E=fe(g,s,f);if(!E)return Ne;const O=g;g.endScope&&g.endScope._wrap?(y(),S(a,g.endScope._wrap)):g.endScope&&g.endScope._multi?(y(),ue(g.endScope,s)):O.skip?_+=a:(O.returnEnd||O.excludeEnd||(_+=a),y(),O.excludeEnd&&(_=a));do g.scope&&N.closeNode(),!g.skip&&!g.subLanguage&&(W+=g.relevance),g=g.parent;while(g!==E.parent);return E.starts&&ge(E.starts,s),O.returnEnd?0:a.length}function qe(){const s=[];for(let a=g;a!==A;a=a.parent)a.scope&&s.unshift(a.scope);s.forEach(a=>N.openNode(a))}let z={};function he(s,a){const f=a&&a[0];if(_+=s,f==null)return y(),0;if(z.type==="begin"&&a.type==="end"&&z.index===a.index&&f===""){if(_+=o.slice(a.index,a.index+1),!d){const E=new Error(`0 width match regex (${n})`);throw E.languageName=n,E.badRule=z.rule,E}return 1}if(z=a,a.type==="begin")return Ze(a);if(a.type==="illegal"&&!h){const E=new Error('Illegal lexeme "'+f+'" for mode "'+(g.scope||"<unnamed>")+'"');throw E.mode=g,E}else if(a.type==="end"){const E=Je(a);if(E!==Ne)return E}if(a.type==="illegal"&&f==="")return 1;if(V>1e5&&V>a.index*3)throw new Error("potential infinite loop, way more iterations than matches");return _+=f,f.length}const A=v(n);if(!A)throw D(p.replace("{}",n)),new Error('Unknown language: "'+n+'"');const Qe=Xt(A);let Q="",g=b||Qe;const de={},N=new r.__emitter(r);qe();let _="",W=0,L=0,V=0,ee=!1;try{if(A.__emitTokens)A.__emitTokens(o,N);else{for(g.matcher.considerAll();;){V++,ee?ee=!1:g.matcher.considerAll(),g.matcher.lastIndex=L;const s=g.matcher.exec(o);if(!s)break;const a=o.substring(L,s.index),f=he(a,s);L=s.index+f}he(o.substring(L))}return N.finalize(),Q=N.toHTML(),{language:n,value:Q,relevance:W,illegal:!1,_emitter:N,_top:g}}catch(s){if(s.message&&s.message.includes("Illegal"))return{language:n,value:te(o),illegal:!0,relevance:0,_illegalBy:{message:s.message,index:L,context:o.slice(L-100,L+100),mode:s.mode,resultSoFar:Q},_emitter:N};if(d)return{language:n,value:te(o),illegal:!1,relevance:0,errorRaised:s,_emitter:N,_top:g};throw s}}function Z(n){const o={value:te(n),illegal:!1,relevance:0,_top:c,_emitter:new r.__emitter(r)};return o._emitter.addText(n),o}function J(n,o){o=o||r.languages||Object.keys(t);const h=Z(n),b=o.filter(v).filter(le).map(y=>H(y,n,!1));b.unshift(h);const w=b.sort((y,S)=>{if(y.relevance!==S.relevance)return S.relevance-y.relevance;if(y.language&&S.language){if(v(y.language).supersetOf===S.language)return 1;if(v(S.language).supersetOf===y.language)return-1}return 0}),[R,k]=w,$=R;return $.secondBest=k,$}function Pe(n,o,h){const b=o&&i[o]||h;n.classList.add("hljs"),n.classList.add(`language-${b}`)}function q(n){let o=null;const h=M(n);if(l(h))return;if(G("before:highlightElement",{el:n,language:h}),n.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",n);return}if(n.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(n)),r.throwUnescapedHTML))throw new Zt("One of your code blocks includes unescaped HTML.",n.innerHTML);o=n;const b=o.textContent,w=h?x(b,{language:h,ignoreIllegals:!0}):J(b);n.innerHTML=w.value,n.dataset.highlighted="yes",Pe(n,h,w.language),n.result={language:w.language,re:w.relevance,relevance:w.relevance},w.secondBest&&(n.secondBest={language:w.secondBest.language,relevance:w.secondBest.relevance}),G("after:highlightElement",{el:n,result:w,text:b})}function He(n){r=we(r,n)}const je=()=>{U(),B("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function me(){U(),B("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let ae=!1;function U(){if(document.readyState==="loading"){ae=!0;return}document.querySelectorAll(r.cssSelector).forEach(q)}function Ue(){ae&&U()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",Ue,!1);function Ge(n,o){let h=null;try{h=o(e)}catch(b){if(D("Language definition for '{}' could not be registered.".replace("{}",n)),d)D(b);else throw b;h=c}h.name||(h.name=n),t[n]=h,h.rawDefinition=o.bind(null,e),h.aliases&&oe(h.aliases,{languageName:n})}function $e(n){delete t[n];for(const o of Object.keys(i))i[o]===n&&delete i[o]}function ze(){return Object.keys(t)}function v(n){return n=(n||"").toLowerCase(),t[n]||t[i[n]]}function oe(n,{languageName:o}){typeof n=="string"&&(n=[n]),n.forEach(h=>{i[h.toLowerCase()]=o})}function le(n){const o=v(n);return o&&!o.disableAutodetect}function We(n){n["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=o=>{n["before:highlightBlock"](Object.assign({block:o.el},o))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=o=>{n["after:highlightBlock"](Object.assign({block:o.el},o))})}function Ke(n){We(n),u.push(n)}function Xe(n){const o=u.indexOf(n);o!==-1&&u.splice(o,1)}function G(n,o){const h=n;u.forEach(function(b){b[h]&&b[h](o)})}function Fe(n){return B("10.7.0","highlightBlock will be removed entirely in v12.0"),B("10.7.0","Please use highlightElement now."),q(n)}Object.assign(e,{highlight:x,highlightAuto:J,highlightAll:U,highlightElement:q,highlightBlock:Fe,configure:He,initHighlighting:je,initHighlightingOnLoad:me,registerLanguage:Ge,unregisterLanguage:$e,listLanguages:ze,getLanguage:v,registerAliases:oe,autoDetection:le,inherit:we,addPlugin:Ke,removePlugin:Xe}),e.debugMode=function(){d=!1},e.safeMode=function(){d=!0},e.versionString=Yt,e.regex={concat:C,lookahead:Se,either:se,optional:ut,anyNumberOfTimes:lt};for(const n in X)typeof X[n]=="object"&&ye(X[n]);return Object.assign(e,X),e},P=Be({});P.newInstance=()=>Be({});var qt=P;P.HighlightJS=P;P.default=P;const ne=tt(qt);function Vt(e){const t=e.regex,i=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),u=/[\p{L}0-9._:-]+/u,d={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},p={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},c=e.inherit(p,{begin:/\(/,end:/\)/}),r=e.inherit(e.APOS_STRING_MODE,{className:"string"}),l=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),M={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[d]},{begin:/'/,end:/'/,contains:[d]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[p,l,r,c,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[p,c,l,r]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},d,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[l]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[M],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[M],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(i,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:i,relevance:0,starts:M}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(i,/>/))),contains:[{className:"name",begin:i,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}var Oe=nt({props:{code:{type:String,required:!0},language:{type:String,default:""},autodetect:{type:Boolean,default:!0},ignoreIllegals:{type:Boolean,default:!0}},setup:function(e){var t=it(e.language);st(function(){return e.language},function(d){t.value=d});var i=K(function(){return e.autodetect||!t.value}),u=K(function(){return!i.value&&!ne.getLanguage(t.value)});return{className:K(function(){return u.value?"":"hljs "+t.value}),highlightedCode:K(function(){var d;if(u.value)return console.warn('The language "'+t.value+'" you specified could not be found.'),e.code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");if(i.value){var p=ne.highlightAuto(e.code);return t.value=(d=p.language)!==null&&d!==void 0?d:"",p.value}return(p=ne.highlight(e.code,{language:t.value,ignoreIllegals:e.ignoreIllegals})).value})}},render:function(){return pe("pre",{},[pe("code",{class:this.className,innerHTML:this.highlightedCode})])}}),en={install:function(e){e.component("highlightjs",Oe)},component:Oe};export{ne as H,en as o,Vt as x};
