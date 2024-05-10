(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function l(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(o){if(o.ep)return;o.ep=!0;const i=l(o);fetch(o.href,i)}})();const b=window.location.hostname==="localhost";(function(){const w=`
  #notification-area2008 {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1000;
  }
  
  .notification2008 {
    background-color: rgba(255, 255, 255, 0.7); /* Semi-transparante witte achtergrond */
    -webkit-backdrop-filter: blur(10px); /* Voor Safari en oudere browsers */
    backdrop-filter: blur(10px); /* Blur-effect zoals in iOS */
    display: flex;
    padding: 12px 16px;
    border-radius: 14px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 320px;
    margin-bottom: 10px;
    align-items: center;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateX(100%);
  }
  
  .notification2008 img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    object-fit: cover;
    margin-right: 12px;
  }
  
  .content-wrapper2008 {
    flex-grow: 1;
  }
  
  .notification2008 .message2008 {
    font-size: 0.9rem;
    color: #333; /* Donkere tekst voor goed contrast op lichte, doorzichtige achtergrond */
  }
  
  .notification2008 .sender2008 {
    font-size: 1rem;
    font-weight: bold;
    color: #000; /* Zwart voor de afzendernaam om de leesbaarheid te verhogen */
  }
  
  .notification2008 .close--icon2008 {
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    fill: #333; /* Icoonkleur aanpassen voor beter contrast */
  }
  
  @media screen and (max-width: 767px) {
    #notification-area2008 {
      width: calc(100% - 40px); /* Aangepast voor beter beheer van schermruimte */
    }
  
    .notification2008 {
      width: calc(100% - 30px); /* Volledige breedte op mobiel voor betere leesbaarheid */
    }
  }
  
  `,r=document.createElement("style");r.type="text/css",r.innerText=w,document.head.appendChild(r);const l=u().websiteId;function u(){for(var e=document.getElementsByTagName("script"),t=0;t<e.length;t++)if(e[t].getAttribute("websiteId"))return{websiteId:e[t].getAttribute("websiteId")};return{websiteId:null}}function o(){let e=document.getElementById("notification-area2008");return e||(e=document.createElement("div"),e.id="notification-area2008",document.body.appendChild(e)),e}(()=>{let e=history.pushState,t=history.replaceState,h=window.location.pathname+window.location.search+window.location.hash;history.pushState=function(c,p,n){let s=e.call(this,c,p,n);return f(),s},history.replaceState=function(c,p,n){let s=t.call(this,c,p,n);return f(),s},window.addEventListener("popstate",()=>{f()});function f(){let a=window.location.pathname+window.location.search+window.location.hash;h!==a&&(h=a,window.dispatchEvent(new Event("locationchange")))}})();function i(e){const t=e.target.closest(".notification2008");t&&(t.style.transform="translateX(100%)",setTimeout(()=>t.remove(),500),e instanceof MouseEvent&&e.stopPropagation())}function d(e,t,h,f,a,c){const p=o(),n=document.createElement("div");n.className="notification2008",n.style.transform="translateX(120%)",n.style.cursor="pointer",n.innerHTML=`
      ${e?`<img src="${e}">`:""}
      <div class="close--icon2008">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </div>
      <div class="content-wrapper2008">
        <div class="sender2008">${t}</div>
        <div class="message2008">${h}</div>
      </div>
    `,n.addEventListener("click",function(g){g.target.closest(".close--icon2008")||(window.location.href=f)});const s=n.querySelector(".close--icon2008");s&&s.addEventListener("click",i),setTimeout(()=>{n.style.transform="translateX(0)"},c),p.appendChild(n),setTimeout(()=>{i({target:n})},a+c)}const m=document.createElement("script");m.src="https://cdn.socket.io/4.0.0/socket.io.min.js",m.onload=function(){const e=io(b?"http://localhost:8080":"https://flexnote-server.onrender.com");e.on("notification",function(t){o(),d(t.imgUrl,t.sender,t.message,t.link,t.showTimeInMs,t.delayInMs)}),e.on("connect",()=>{e.emit("userLocation",{websiteId:l,location:window.location.pathname+window.location.search+window.location.hash}),window.addEventListener("locationchange",function(){let t=window.location.pathname+window.location.search+window.location.hash;l&&e.emit("userLocation",{websiteId:l,location:t})})})},document.head.appendChild(m)})();
