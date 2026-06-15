document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  const emailText = document.querySelector(".email-text");
  const copyEmailBtn = document.querySelector("#copyEmailBtn");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const result = document.execCommand("copy");
      document.body.removeChild(textarea);

      return result;
    }
  };

  const showCopyMessage = (target, originalText) => {
    target.textContent = "이메일 복사 완료!";

    setTimeout(() => {
      target.textContent = originalText;
    }, 1500);
  };

  if (card) {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  }

  if (emailText) {
    emailText.style.cursor = "pointer";

    emailText.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      const copied = await copyToClipboard(email);

      if (copied) {
        showCopyMessage(emailText, email);
      }
    });
  }

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      const copied = await copyToClipboard(email);

      if (copied) {
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = "복사 완료!";

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
        }, 1500);
      }
    });
  }
});