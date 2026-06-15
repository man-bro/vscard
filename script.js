document.addEventListener("DOMContentLoaded", () => {
  console.log("Digital business card loaded.");

  const card = document.querySelector(".card");

  if (card) {
    card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow =
        "0 0 25px rgba(60, 161, 251, 0.35), 0 25px 50px rgba(0, 0, 0, 0.6)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow =
        "0 0 15px rgba(60, 161, 251, 0.2), 0 0 30px rgba(60, 161, 251, 0.1), 0 15px 40px rgba(0, 0, 0, 0.5)";
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valueElements = document.querySelectorAll(".value");

  valueElements.forEach((valueElement) => {
    const text = valueElement.textContent.trim();

    if (emailRegex.test(text)) {
      valueElement.style.cursor = "pointer";
      valueElement.title = "클릭하면 이메일이 복사됩니다.";

      valueElement.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(text);

          const originalText = valueElement.textContent;
          valueElement.textContent = "이메일이 복사되었습니다!";

          setTimeout(() => {
            valueElement.textContent = originalText;
          }, 1500);
        } catch (error) {
          console.error("이메일 복사 실패:", error);

          const tempInput = document.createElement("input");
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);

          const originalText = valueElement.textContent;
          valueElement.textContent = "이메일이 복사되었습니다!";

          setTimeout(() => {
            valueElement.textContent = originalText;
          }, 1500);
        }
      });
    }
  });
});