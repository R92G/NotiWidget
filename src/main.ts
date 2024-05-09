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
`;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
  // --- END STYLES

  const websiteId = getSyncScriptParams().websiteId;
  console.log("Gebruiker geladen:", websiteId);
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
        console.log("Location changed to:", currentUrl);
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
        <hr/>
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

    // log the first child of the notificationArea
    console.log(notificationArea.firstChild);

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
        console.log("Notificatie ontvangen:", data);
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
        let fullPath = window.location.pathname + window.location.hash;
        console.log("Location changed to:", fullPath);
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
