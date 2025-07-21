"use strict";(()=>{var V=Object.create;var O=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var G=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty;var W=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Y=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of z(t))!q.call(e,a)&&a!==n&&O(e,a,{get:()=>t[a],enumerable:!(o=H(t,a))||o.enumerable});return e};var Q=(e,t,n)=>(n=e!=null?V(G(e)):{},Y(t||!e||!e.__esModule?O(n,"default",{value:e,enumerable:!0}):n,e));var P=W((me,N)=>{"use strict";N.exports={backend_url:"https://userinsightb.botlync.com",frontend_url:"https://userinsight.botlync.com"}});function _(e){return new URL(e.src).searchParams.get("trackingId")||"default-tracking-id"}var S=Q(P());function c(e){fetch(`${S.backend_url}/clients/track-insight-agent`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function T(e){try{return(await(await fetch(`${S.backend_url}/clients/get-leads-setting?insightId=${e}`)).json()).data||null}catch(t){return console.warn("[Lead] Failed to fetch settings",t),null}}function X(){let e=navigator.userAgent;return/Mobi|Android/i.test(e)?"mobile":/Tablet|iPad/i.test(e)?"tablet":"desktop"}function Z(){let e="analytics_user_id",t=localStorage.getItem(e);return t||(t=B(),localStorage.setItem(e,t)),t}function B(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}function $(e){let t=window.location.pathname,n="analytics_session",o=`page_view_${t}`,a=30*60*1e3,l=Date.now(),i=JSON.parse(localStorage.getItem(n));if((!i||l-i.timestamp>a)&&(i={id:B(),timestamp:l,views:{}}),i.views?.[o]){console.log(`[Analytics] Skipping duplicate page_view for: ${t}`);return}let u=Z();localStorage.getItem("location_sent")||("geolocation"in navigator?navigator.geolocation.getCurrentPosition(async r=>{let d=r.coords.latitude,m=r.coords.longitude;try{let h=await(await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${d}&longitude=${m}&localityLanguage=en`)).json(),K={type:"page_view",insight:e,sessionId:i.id,userId:u,url:window.location.href,referrer:document.referrer,timestamp:new Date().toISOString(),userAgent:navigator.userAgent,language:navigator.language,deviceType:X(),screen:{width:window.innerWidth,height:window.innerHeight},location:{latitude:d,longitude:m,city:h.city||"",state:h.principalSubdivision||"",country:h.countryName||""}};c(K),localStorage.setItem("location_sent","true")}catch(p){console.warn("Location fetch failed",p)}},r=>{console.warn("Geolocation permission denied or error:",r)}):console.warn("Geolocation not supported in this browser.")),i.views=i.views||{},i.views[o]=!0,i.timestamp=l,localStorage.setItem(n,JSON.stringify(i))}function ee(){let e=document.getElementsByTagName("script");for(let t of e){let o=(t.src||"").match(/trackingId=([^&]+)/);if(o)return o[1]}return null}var f=ee(),D="lead-capture-modal",v=!1,I=null,s=null;function w(e,t){return`<input id="${e}" placeholder="${t}" style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 6px; border: 1px solid #ccc;">`}function te(){if(v||document.getElementById("leadContainer")||!I)return;let{title:e,subtitle:t,fields:n}=I,o="";n?.name&&(o+=w("leadName","Your Name")),n?.phone&&(o+=w("leadPhone","Phone Number")),n?.email&&(o+=w("leadEmail","Email"));let l=`
    ${`
    <style>
      #${D} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        z-index: 1001;
        width: 360px;
        font-family: system-ui;
      }
      #leadOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
      }
      button {
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
      }
      #submitLeadBtn {
        border: none;
        background: #3498db;
        color: white;
      }
      #submitLeadBtn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      #closeLeadModal {
        border: 1px solid #ccc;
        background: #fff;
      }
    </style>
  `}
    <div id="${D}">
      <h3 style="margin-bottom: 8px;">${e||"Get in Touch"}</h3>
      <p style="margin-bottom: 20px;">${t||"start a conversation with us"}</p>
      ${o}
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button id="closeLeadModal">Close</button>
        <button id="submitLeadBtn" disabled>Submit</button>
      </div>
    </div>
    <div id="leadOverlay"></div>
  `,i=document.createElement("div");i.id="leadContainer",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.zIndex="9999",s=i.attachShadow({mode:"open"}),s.innerHTML=l,document.body.appendChild(i),v=!0;let u=s.getElementById("submitLeadBtn");function g(){let r=!0,d=n?.name?s.getElementById("leadName")?.value.trim():"",m=n?.phone?s.getElementById("leadPhone")?.value.trim():"",p=n?.email?s.getElementById("leadEmail")?.value.trim():"";n?.name&&!d&&(r=!1),n?.phone&&!/^\d{10,}$/.test(m)&&(r=!1),n?.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(r=!1),u.disabled=!r}if(n?.phone){let r=s.getElementById("leadPhone");r.addEventListener("input",g),r.addEventListener("keypress",d=>{/[0-9]/.test(d.key)||d.preventDefault()})}n?.email&&s.getElementById("leadEmail").addEventListener("input",g),n?.name&&s.getElementById("leadName").addEventListener("input",g),s.getElementById("closeLeadModal").addEventListener("click",b),s.getElementById("leadOverlay").addEventListener("click",b),u.addEventListener("click",ne)}function b(){let e=document.getElementById("leadContainer");e&&e.remove(),v=!1}function ne(){let e={name:s.getElementById("leadName")?.value?.trim()||"",phone:s.getElementById("leadPhone")?.value?.trim()||"",email:s.getElementById("leadEmail")?.value?.trim()||""};localStorage.setItem("leadSubmitted","true"),console.log("[Lead Captured]",e),b(),E(e)}function E(e){let t="analytics_session",n=Date.now(),o=JSON.parse(localStorage.getItem(t));o||(o={id:A(),timestamp:n,views:{}});let a=oe(),l={type:"lead",insight:f||"unknown",sessionId:o.id,userId:a,timestamp:new Date().toISOString(),...e};return c(l).catch(i=>{console.warn("[Analytics] Failed to send lead data",i),ae(l)})}function oe(){let e="analytics_user_id",t=localStorage.getItem(e);return t||(t=A(),localStorage.setItem(e,t)),t}function A(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}function ae(e){let t="analytics_failed_events",n=JSON.parse(localStorage.getItem(t))||[];n.push(e),localStorage.setItem(t,JSON.stringify(n))}async function ie(){if(localStorage.getItem("leadSubmitted")==="true"||!f)return;async function t(){setTimeout(async()=>{if(localStorage.getItem("leadSubmitted")==="true"||!f)return;let o=await T(f);o?.leadEnabled&&(I=o,te()),t()},5*1e3)}t()}ie();var L=k(),y=Date.now(),J=null,M=null,se=30*60*1e3,U="analytics_session";function k(){return window.location.pathname+window.location.search+window.location.hash}function R(e){let t=Date.now(),n=JSON.parse(localStorage.getItem(U));(!n||t-n.timestamp>se)&&(n={id:F(),timestamp:t,views:{}},localStorage.setItem(U,JSON.stringify(n))),J=n.id,M=de(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?x(e):document.visibilityState==="visible"&&(L=k(),j(),C())}),window.addEventListener("load",()=>{console.log("[Analytics] Page unload detected"),x(e)}),le(e),C()}function x(e){if(!y)return;let t=Date.now(),n=Math.round((t-y)/1e3);if(n<=0)return;let o={type:"session_duration",insight:e,sessionId:J,userId:M,page:window.location.href,duration:n,timestamp:new Date().toISOString()};console.log("[Analytics] Sending page session duration:",o),c(o).catch(a=>{console.warn("[Analytics] Failed to send page duration",a),ce(o)}),y=null}function j(){y=Date.now()}function re(e,t=300){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)}}function le(e){let t=history.pushState,n=history.replaceState,o=re(()=>{let a=k();a!==L&&document.visibilityState==="visible"&&(console.log("[Analytics] Route changed:",a),x(e),L=a,j())},200);history.pushState=function(...a){t.apply(this,a),o()},history.replaceState=function(...a){n.apply(this,a),o()},window.addEventListener("popstate",o)}function de(){let e="analytics_user_id",t=localStorage.getItem(e);return t||(t=F(),localStorage.setItem(e,t)),t}function F(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}function ce(e){let t="analytics_failed_events",n=JSON.parse(localStorage.getItem(t))||[];n.push(e),localStorage.setItem(t,JSON.stringify(n))}function C(){let e="analytics_failed_events",t=JSON.parse(localStorage.getItem(e))||[];if(!t.length)return;console.log(`[Analytics] Resending ${t.length} failed event(s)...`);let n=[],o=t.map(a=>c(a).catch(l=>{console.warn("[Analytics] Resend failed:",l),n.push(a)}));Promise.all(o).then(()=>{n.length>0?localStorage.setItem(e,JSON.stringify(n)):localStorage.removeItem(e)})}window.addEventListener("DOMContentLoaded",()=>{let e=document.currentScript||document.querySelector('script[src*="analytics-widget.js"]'),t=_(e);$(t),R(t),E(t)});})();
