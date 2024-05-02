// Importeer de benodigde stijlen
import "./style.css";

// Verklaring van globale variabelen en functies
declare var io: any;

(function () {
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

  // Haal gebruiker eenmalig op en gebruik deze overal
  const websiteId = getSyncScriptParams().websiteId;
  console.log("Gebruiker geladen:", websiteId);

  // Functie om te controleren of een notificatiegebied bestaat en deze zo nodig te creëren
  function ensureNotificationArea() {
    let notificationArea = document.getElementById("notification-area");
    if (!notificationArea) {
      notificationArea = document.createElement("div");
      notificationArea.id = "notification-area";
      document.body.appendChild(notificationArea);
    }
    return notificationArea;
  }

  // Functie om een notificatie te sluiten
  function closeNotification(event: any) {
    const notification = event.target.closest(".notification");
    if (notification) {
      notification.style.transform = "translateX(100%)"; // Schuif naar rechts uit beeld
      setTimeout(() => notification.remove(), 500); // Verwijder de notificatie na de animatie
      event.stopPropagation(); // Voorkom dat het event verder gaat naar hogere elementen
    }
  }

  // Functie om een nieuwe notificatie te tonen
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
    notification.className = "notification";
    notification.style.transform = "translateX(120%)";
    notification.style.cursor = "pointer";
    notification.innerHTML = `
      ${imgUrl ? `<img src="${imgUrl}">` : ""}
      <div class="close--icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </div>
      <div class="content-wrapper">
        <div class="sender">${sender}</div>
        <hr/>
        <div class="message">${message}</div>
      </div>
    `;

    notification.addEventListener("click", function (event) {
      if (!(event.target as HTMLElement).closest(".close--icon")) {
        window.location.href = link; // Navigeer naar de link
      }
    });

    const closeIcon = notification.querySelector(".close--icon");
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
    const socket = io("http://localhost:8080");
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
        location: window.location.pathname,
      });
    });
  };
  document.head.appendChild(script);
})();
