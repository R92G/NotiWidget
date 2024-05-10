/**
 * Draai eerst een build met `npm run build` om de wijzigingen in dit bestand te zien.
 * Voer vervolgens `npm run start` uit om de server te starten en de wijzigingen in de browser te bekijken en verander render in localhost.

 */

const isDevelopment = window.location.hostname === "localhost";

// Verklaring van globale variabelen en functies
declare var io: any;

(function () {
  // --- STYLES
  const css = `
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
    background-color: rgba(255, 255, 255, 0.5); /* Semi-transparante witte achtergrond */
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
  
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
  // --- END STYLES

  const websiteId = getSyncScriptParams().websiteId;

  // let lastLocation = window.location.pathname; // Correct gedefinieerd op het hoogste niveau binnen de IIFE

  // Functie om de parameters van het juiste script te verkrijgen
  function getSyncScriptParams() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].getAttribute("websiteId")) {
        return {
          websiteId: scripts[i].getAttribute("websiteId"),
        };
      }
    }
    return { websiteId: null }; // Retourneer null of een standaardwaarde als geen script het attribuut heeft
  }

  function ensureNotificationArea() {
    let notificationArea = document.getElementById("notification-area2008");
    if (!notificationArea) {
      notificationArea = document.createElement("div");
      notificationArea.id = "notification-area2008";
      document.body.appendChild(notificationArea);
    }
    return notificationArea;
  }

  (() => {
    let oldPushState = history.pushState;
    let oldReplaceState = history.replaceState;
    let lastUrl =
      window.location.pathname + window.location.search + window.location.hash;

    history.pushState = function pushState(
      data: any,
      title: string,
      url?: string | URL | null
    ) {
      let ret = oldPushState.call(this, data, title, url);
      checkLocationChange();
      return ret;
    };

    history.replaceState = function replaceState(
      data: any,
      title: string,
      url?: string | URL | null
    ) {
      let ret = oldReplaceState.call(this, data, title, url);
      checkLocationChange();
      return ret;
    };

    window.addEventListener("popstate", () => {
      checkLocationChange();
    });

    function checkLocationChange() {
      let currentUrl =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      if (lastUrl !== currentUrl) {
        lastUrl = currentUrl;
        window.dispatchEvent(new Event("locationchange"));
      }
    }
  })();

  function closeNotification(event: any) {
    const notification = event.target.closest(".notification2008");
    if (notification) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 500);
      if (event instanceof MouseEvent) {
        event.stopPropagation();
      }
    }
  }

  function showNotification(
    imgUrl: string,
    sender: string,
    message: string,
    link: string,
    showTimeInMs: number,
    delayInMs: number
  ) {
    const notificationArea = ensureNotificationArea() as HTMLElement;
    const notification = document.createElement("div");
    notification.className = "notification2008";
    notification.style.transform = "translateX(120%)";
    notification.style.cursor = "pointer";
    notification.innerHTML = `
      ${imgUrl ? `<img src="${imgUrl}">` : ""}
      <div class="close--icon2008">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </div>
      <div class="content-wrapper2008">
        <div class="sender2008">${sender}</div>
        <div class="message2008">${message}</div>
      </div>
    `;

    notification.addEventListener("click", function (event) {
      if (!(event.target as HTMLElement).closest(".close--icon2008")) {
        window.location.href = link; // Navigeer naar de link
      }
    });

    const closeIcon = notification.querySelector(".close--icon2008");
    if (closeIcon) {
      closeIcon.addEventListener("click", closeNotification);
    }

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, delayInMs);

    notificationArea.appendChild(notification);

    setTimeout(() => {
      closeNotification({ target: notification });
    }, showTimeInMs + delayInMs);
  }

  // Laad de Socket.IO-client bibliotheek en stel verbinding in
  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.0.0/socket.io.min.js";
  script.onload = function () {
    const socket = io(
      isDevelopment
        ? "http://localhost:8080"
        : "https://flexnote-server.onrender.com"
    );
    socket.on(
      "notification",
      function (data: {
        imgUrl: string;
        sender: string;
        message: string;
        link: string;
        showTimeInMs: number;
        delayInMs: number;
      }) {
        ensureNotificationArea();
        showNotification(
          data.imgUrl,
          data.sender,
          data.message,
          data.link,
          data.showTimeInMs,
          data.delayInMs
        );
      }
    );
    socket.on("connect", () => {
      // Stuur de gebruiker en de huidige locatie naar de server bij verbinding
      socket.emit("userLocation", {
        websiteId: websiteId,
        location:
          window.location.pathname +
          window.location.search +
          window.location.hash,
      });
      // Reageer op locatieveranderingen en verstuur deze naar de server
      window.addEventListener("locationchange", function () {
        let fullPath =
          window.location.pathname +
          window.location.search +
          window.location.hash;

        if (websiteId) {
          socket.emit("userLocation", {
            websiteId: websiteId,
            location: fullPath,
          });
        }
      });
    });
  };
  document.head.appendChild(script);
})();
