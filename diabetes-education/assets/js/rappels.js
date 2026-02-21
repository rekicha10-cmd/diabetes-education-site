// إعداد Supabase
const supabaseUrl = "https://bmiubkfyeiytwhinxajg.supabase.co";   // انسخي الرابط من Supabase
const supabaseKey = "sb_publishable_ktC190Y8iiqkPY-NMmUKkA_Wm9T60Ol";                      // انسخي المفتاح العمومي (anon key)
const client = supabase.createClient(supabaseUrl, supabaseKey);

// عناصر الصفحة
const form = document.getElementById("reminderForm");
const list = document.getElementById("remindersList");

// استرجاع id المريض من التخزين المحلي
const currentPatientId = localStorage.getItem("patientId");

// عند إضافة تذكير جديد
form.onsubmit = async (e) => {
  e.preventDefault();
  const title = form.title.value;
  const datetime = form.datetime.value;

  // إدخال التذكير في قاعدة البيانات
  const { data, error } = await client
    .from("reminders")
    .insert([{ patient_id: 1, title, reminder_time: datetime }]); // مؤقتًا patient_id=1

  if (error) {
    alert("❌ خطأ: " + error.message);
  } else {
    alert("✅ تم حفظ التذكير");
    form.reset();
    loadReminders(); // إعادة تحميل القائمة
  }
};

// تحميل التذكيرات من قاعدة البيانات
async function loadReminders() {
  const { data, error } = await client
    .from("reminders")
    .select("*")
    .order("reminder_time", { ascending: true });

  if (error) {
    list.innerHTML = "❌ خطأ في تحميل التذكيرات";
  } else {
    list.innerHTML = data.map(r =>
      `<li>${r.title} - ${new Date(r.reminder_time).toLocaleString()}</li>`
    ).join("");
  }
}

// تحميل التذكيرات عند فتح الصفحة
loadReminders();