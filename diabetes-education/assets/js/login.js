const supabaseUrl = "https://YOUR_PROJECT.supabase.co";
const supabaseKey = "YOUR_ANON_KEY";
const client = supabase.createClient(supabaseUrl, supabaseKey);

const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;

  // البحث عن المريض حسب البريد
  const { data, error } = await client
    .from("patients")
    .select("id, email")
    .eq("email", email)
    .single();

  if (error || !data) {
    alert("❌ المريض غير موجود");
  } else {
    // تخزين id في المتصفح
    localStorage.setItem("patientId", data.id);
    alert("✅ تسجيل الدخول ناجح");
    window.location.href = "rappels.html"; // الانتقال لصفحة التذكيرات
  }
};