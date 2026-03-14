document.addEventListener("DOMContentLoaded", function () {
  const envelopes = document.querySelectorAll(".envelope-item img");
  const overlay = document.getElementById("popup-overlay");
  const popupText = document.getElementById("popup-text");
  const popupImage = document.getElementById("popup-image");
  const closeButton = document.querySelector(".popup-close");

  const imageBySender = {};

  const messagesBySender = {
    Sunima:
      "Dear Christi, Happy Birthday(budi bhais).\n\n" + "It might sound cheesy but you are one of the closest people in my life, and I’m really grateful that you were born.\n\n" +"I hope this year brings you the happiness you deserve.\n\n" +"Always remember that:ou are stronger than you think.  And on the days you feel weak, I will be there.You are smart and capable.  And on the days you doubt yourself, I will be there.\n\n" +"I wish you so much happiness. And on the sad days, I will be there.You will shine in your own way. And on the days you feel like you’re not shining, I will be there.I will always be cheering for you.",
    Sneha:
      `Happy birthday Christina! So I’m aware that we’ve only known each other for like a year, but honestly it feels like way longer than that. And I mean that in a really good way.
And I just personally feel like you are one of those people who genuinely inspires me. Like the way you show up and the things you are doing, I can really see you doing great things. And I think that’s honestly pretty cool.
But yes, on your birthday I just want you to know that you are an amazing and wonderful human who gives love so abundantly. And I really do mean that. Keep yourself first. We all love you. 

-Sneha`,
    Prince:
      "Happy Birthday, Christina!\n\n" +
      "Thank you for filling my days with your warmth, your laughter, and the little moments that make everything brighter. " +
      "I hope this year brings you all the softness, magic, and comfort you give to everyone around you.\n\n" +
      "With all my love,\n" +
      "Prince 💌",
    Jez:
      `To the mother we all love,

Christi. Happy birthday love. On this very
special day, I wish I could tell you more than
you already know, but I would honestly go
on an endless loop. I never thought I'd be
apart of such a special person's life, heck
even their special day. I know we are still
growing together, but if you were to ask me
if I would spend my last years of age rocking
back and forth knitting, singing and drinking
coffee away as nest seeking authors, I'd
absolutely want it to be by your side. Thank
you for sharing your love with me. You will
always be showered with mine, especially
today. Happy birthday

-Jez`,
  };

  let typingIndex = 0;
  let typingTimer = null;
  let currentMessage = "";

  function startTyping(message) {
    if (!popupText) return;
    typingIndex = 0;
    popupText.textContent = "";
    currentMessage = message;

    if (typingTimer) {
      clearInterval(typingTimer);
    }

    typingTimer = setInterval(() => {
      if (typingIndex >= currentMessage.length) {
        clearInterval(typingTimer);
        typingTimer = null;
        return;
      }
      popupText.textContent += currentMessage.charAt(typingIndex);
      typingIndex += 1;
    }, 40);
  }

  function openPopup(messageOrImage) {
    if (!overlay) return;
    overlay.classList.add("is-visible");
    overlay.setAttribute("aria-hidden", "false");
    const isImage = typeof messageOrImage === "object" && messageOrImage?.image;
    if (isImage && popupImage) {
      popupText.style.display = "none";
      popupImage.style.display = "block";
      popupImage.src = messageOrImage.image;
    } else {
      if (popupImage) popupImage.style.display = "none";
      if (popupText) popupText.style.display = "block";
      startTyping(typeof messageOrImage === "string" ? messageOrImage : "");
    }
  }

  function closePopup() {
    if (!overlay) return;
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
    if (typingTimer) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
    if (popupText) {
      popupText.textContent = "";
      popupText.style.display = "block";
    }
    if (popupImage) popupImage.style.display = "none";
  }

  envelopes.forEach((img) => {
    const originalSrc = img.getAttribute("src");
    const hoverSrc = "pics/hover.png";

    img.addEventListener("mouseenter", () => {
      img.src = hoverSrc;
    });

    img.addEventListener("mouseleave", () => {
      img.src = originalSrc;
    });

    // Simple touch support: brief hover effect on tap
    img.addEventListener(
      "touchstart",
      () => {
        img.src = hoverSrc;
      },
      { passive: true }
    );

    img.addEventListener(
      "touchend",
      () => {
        img.src = originalSrc;
      },
      { passive: true }
    );

    img.addEventListener("click", () => {
      const envelopeItem = img.closest(".envelope-item");
      const figcaption = envelopeItem?.querySelector("figcaption");
      const captionText = figcaption?.textContent?.trim() || "";
      const sender = captionText.replace(/^From\s+/i, "");
      if (imageBySender[sender]) {
        openPopup({ image: imageBySender[sender] });
      } else {
        openPopup(messagesBySender[sender] || messagesBySender.Prince);
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closePopup();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closePopup();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });

  const toggleBtns = document.querySelectorAll(".toggle-view-btn");
  const view1 = document.getElementById("view-1");
  const view2 = document.getElementById("view-2");

  if (toggleBtns.length > 0 && view1 && view2) {
    const prevBtn = toggleBtns[0];
    const nextBtn = toggleBtns[1];
    const audioBg = document.getElementById("view-2-audio");

    if (audioBg && audioBg.paused) {
          audioBg.play().catch(e => console.log("Audio play blocked:", e));
        }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (!view1.classList.contains("hidden")) {
          window.location.href = "index.html";
        
        } else {
          view1.classList.remove("hidden");
          view2.classList.add("hidden");
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        view1.classList.toggle("hidden");
        view2.classList.toggle("hidden");
        
        //if (audioBg && audioBg.paused) {
          //audioBg.play().catch(e => console.log("Audio play blocked:", e));
        //}
      });
    }
  }
  
});
