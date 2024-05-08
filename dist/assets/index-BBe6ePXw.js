(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();(function(){function s(){let e=document.getElementById("notification-area");return e||(e=document.createElement("div"),e.id="notification-area",document.body.appendChild(e)),e}function n(e){const t=e.target.closest(".notification");t&&(t.style.transform="translateX(100%)",setTimeout(()=>t.remove(),500))}function r(e,t,i,u,l){var d;console.log(i);const a=s(),m=`
      <div class="notification" style="transform: translateX(100%); cursor: pointer;">
        ${e?`<img src="${e}">`:""}
        <div class="close--icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
          </svg>
        </div>
        <div class="content-wrapper">
          <div class="sender">${t}</div>
          <hr/>
          <div class="message">${u}</div>
        </div>
      </div>
    `;a.innerHTML+=m;const c=a.lastElementChild;c.addEventListener("click",function(f){console.log(f.target,l),f.target.closest(".close--icon"),window.location.href=l}),(d=c==null?void 0:c.querySelector(".close--icon"))==null||d.addEventListener("click",n),setTimeout(()=>{c.style.transform="translateX(0)"},10)}const o=document.createElement("script");o.src="https://cdn.socket.io/4.0.0/socket.io.min.js",o.onload=function(){const e=io("http://localhost:8080");e.on("notification",function(t){console.log("Notificatie ontvangen:",t),r(t.imgUrl,t.sender,t.color,t.message,t.link)}),e.on("connect",()=>{e.emit("location",window.location.pathname)})},document.head.appendChild(o)})();
