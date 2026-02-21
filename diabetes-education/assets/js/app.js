// تحويل النص إلى كلام
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-DZ"; // دارجة جزائرية
  speechSynthesis.speak(utter);
}

// ربط الصوت بالعناصر
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".speakable").forEach(el => {
    el.addEventListener("click", () => {
      const text = el.getAttribute("data-say") || el.innerText;
      speak(text);
    });
  });
});