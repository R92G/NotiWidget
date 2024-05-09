(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const y=window.location.hostname==="localhost";(function(){const w=`
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
`,r=document.createElement("style");r.type="text/css",r.innerText=w,document.head.appendChild(r);const s=u().websiteId;console.log("Gebruiker geladen:",s);function u(){for(var e=document.getElementsByTagName("script"),t=0;t<e.length;t++)if(e[t].getAttribute("websiteId"))return{websiteId:e[t].getAttribute("websiteId")};return{websiteId:null}}function o(){let e=document.getElementById("notification-area2008");return e||(e=document.createElement("div"),e.id="notification-area2008",document.body.appendChild(e)),e}(()=>{let e=history.pushState,t=history.replaceState,h=window.location.pathname+window.location.search+window.location.hash;history.pushState=function(a,l,i){let d=e.call(this,a,l,i);return p(),d},history.replaceState=function(a,l,i){let d=t.call(this,a,l,i);return p(),d},window.addEventListener("popstate",()=>{p()});function p(){let c=window.location.pathname+window.location.search+window.location.hash;h!==c&&(console.log("Location changed to:",c),h=c,window.dispatchEvent(new Event("locationchange")))}})();function n(e){const t=e.target.closest(".notification2008");t&&(t.style.transform="translateX(100%)",setTimeout(()=>t.remove(),500),e instanceof MouseEvent&&e.stopPropagation())}function f(e,t,h,p,c,a){const l=o(),i=document.createElement("div");i.className="notification2008",i.style.transform="translateX(120%)",i.style.cursor="pointer",i.innerHTML=`
      ${e?`<img src="${e}">`:""}
      <div class="close--icon2008">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </div>
      <div class="content-wrapper2008">
        <div class="sender2008">${t}</div>
        <hr/>
        <div class="message2008">${h}</div>
      </div>
    `,i.addEventListener("click",function(g){g.target.closest(".close--icon2008")||(window.location.href=p)});const d=i.querySelector(".close--icon2008");d&&d.addEventListener("click",n),setTimeout(()=>{i.style.transform="translateX(0)"},a),l.appendChild(i),console.log(l.firstChild),setTimeout(()=>{n({target:i})},c+a)}const m=document.createElement("script");m.src="https://cdn.socket.io/4.0.0/socket.io.min.js",m.onload=function(){const e=io(y?"http://localhost:8080":"https://flexnote-server.onrender.com");e.on("notification",function(t){console.log("Notificatie ontvangen:",t),o(),f(t.imgUrl,t.sender,t.message,t.link,t.showTimeInMs,t.delayInMs)}),e.on("connect",()=>{e.emit("userLocation",{websiteId:s,location:window.location.pathname+window.location.search+window.location.hash}),window.addEventListener("locationchange",function(){let t=window.location.pathname+window.location.hash;console.log("Location changed to:",t),s&&e.emit("userLocation",{websiteId:s,location:t})})})},document.head.appendChild(m)})();
