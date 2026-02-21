// assets/js/diabete.js

const infoContent = () => document.getElementById("infoContent");

function showTypes() {
  infoContent().innerHTML = `
    <h4 class="speakable" data-say="أنواع السكري">أنواع السكري</h4>
    <ul>
      <li class="speakable" data-say="النوع الأول: يعتمد على الانسولين">النوع الأول: يعتمد على الانسولين</li>
      <li class="speakable" data-say="النوع الثاني: مقاومة الانسولين">النوع الثاني: مقاومة الانسولين</li>
      <li class="speakable" data-say="سكري الحمل: يظهر أثناء الحمل">سكري الحمل: يظهر أثناء الحمل</li>
    </ul>
  `;
  bindSpeakables();
}

function showComplications() {
  infoContent().innerHTML = `
    <h4 class="speakable" data-say="المضاعفات">المضاعفات</h4>
    <ul>
      <li class="speakable" data-say="مشاكل القلب والشرايين">مشاكل القلب والشرايين</li>
      <li class="speakable" data-say="مشاكل الكلى">مشاكل الكلى</li>
      <li class="speakable" data-say="مشاكل العينين">مشاكل العينين</li>
      <li class="speakable" data-say="القدم السكري والجروح">القدم السكري والجروح</li>
    </ul>
  `;
  bindSpeakables();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("typesBtn").addEventListener("click", showTypes);
  document.getElementById("complicationsBtn").addEventListener("click", showComplications);
});