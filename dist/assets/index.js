(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function l(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(o){if(o.ep)return;o.ep=!0;const i=l(o);fetch(o.href,i)}})();const y=window.location.hostname==="localhost";(function(){const w=`
  #notification-area2008 {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1000;
  }
  .notification2008 .close--icon2008 {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
  }
  .notification2008 {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    position: relative;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    cursor: pointer;
    align-items: center;
    touch-action: pan-x pan-y;
  }
  .notification2008 img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .content-wrapper2008 {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: center;
    margin-left: 1rem;
    width: 100%;
  }
  .notification2008 .message2008 {
    font-size: 0.9rem;
    text-align: left;
    overflow-wrap: anywhere;
  }
  .notification2008 .sender2008 {
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .notification2008 hr {
    width: 80%;
    border: none;
    border-top: 1px solid;
  }
  @media screen and (max-width: 767px) {
    .notification2008 {
      background-color: rgba(255, 255, 255, 1); 
    }
  }
`,r=document.createElement("style");r.type="text/css",r.innerText=w,document.head.appendChild(r);const l=u().websiteId;function u(){for(var t=document.getElementsByTagName("script"),e=0;e<t.length;e++)if(t[e].getAttribute("websiteId"))return{websiteId:t[e].getAttribute("websiteId")};return{websiteId:null}}function o(){let t=document.getElementById("notification-area2008");return t||(t=document.createElement("div"),t.id="notification-area2008",document.body.appendChild(t)),t}(()=>{let t=history.pushState,e=history.replaceState,h=window.location.pathname+window.location.search+window.location.hash;history.pushState=function(s,p,n){let a=t.call(this,s,p,n);return f(),a},history.replaceState=function(s,p,n){let a=e.call(this,s,p,n);return f(),a},window.addEventListener("popstate",()=>{f()});function f(){let c=window.location.pathname+window.location.search+window.location.hash;h!==c&&(h=c,window.dispatchEvent(new Event("locationchange")))}})();function i(t){const e=t.target.closest(".notification2008");e&&(e.style.transform="translateX(100%)",setTimeout(()=>e.remove(),500),t instanceof MouseEvent&&t.stopPropagation())}function d(t,e,h,f,c,s){const p=o(),n=document.createElement("div");n.className="notification2008",n.style.transform="translateX(120%)",n.style.cursor="pointer",n.innerHTML=`
      ${t?`<img src="${t}">`:""}
      <div class="close--icon2008">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </div>
      <div class="content-wrapper2008">
        <div class="sender2008">${e}</div>
        <hr/>
        <div class="message2008">${h}</div>
      </div>
    `,n.addEventListener("click",function(g){g.target.closest(".close--icon2008")||(window.location.href=f)});const a=n.querySelector(".close--icon2008");a&&a.addEventListener("click",i),setTimeout(()=>{n.style.transform="translateX(0)"},s),p.appendChild(n),setTimeout(()=>{i({target:n})},c+s)}const m=document.createElement("script");m.src="https://cdn.socket.io/4.0.0/socket.io.min.js",m.onload=function(){const t=io(y?"http://localhost:8080":"https://flexnote-server.onrender.com");t.on("notification",function(e){o(),d(e.imgUrl,e.sender,e.message,e.link,e.showTimeInMs,e.delayInMs)}),t.on("connect",()=>{t.emit("userLocation",{websiteId:l,location:window.location.pathname+window.location.search+window.location.hash}),window.addEventListener("locationchange",function(){let e=window.location.pathname+window.location.search+window.location.hash;l&&t.emit("userLocation",{websiteId:l,location:e})})})},document.head.appendChild(m)})();
