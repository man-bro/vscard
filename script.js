document.addEventListener("DOMContentLoaded", () => {
  const emailText = document.querySelector("#emailText");
  const copyEmailBtn = document.querySelector("#copyEmailBtn");
  const copyMessage = document.querySelector("#copyMessage");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      return copied;
    }
  };

  if (copyEmailBtn && emailText && copyMessage) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      const copied = await copyToClipboard(email);

      if (!copied) {
        alert("이메일 복사에 실패했습니다.");
        return;
      }

      copyMessage.classList.add("show");

      setTimeout(() => {
        copyMessage.classList.remove("show");
      }, 1500);
    });
  }
});
