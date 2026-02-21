document.addEventListener("DOMContentLoaded", () => {
  // بيانات مشروعك من Supabase
  const supabaseUrl = "https://bmiubkfyeiytwhinxajg.supabase.co";   // Project URL
  const supabaseKey = "sb_publishable_ktC190Y8iiqkPY-NMmUKkA_Wm9T60Ol";  // Publishable Key
  const client = supabase.createClient(supabaseUrl, supabaseKey);

  // عناصر النافذة
  const modal = document.getElementById("patientModal");
  const openBtn = document.getElementById("openPatientModal");
  const closeBtn = document.getElementById("closeModal");

  // عناصر الخيارات
  const loginOption = document.getElementById("loginOption");
  const registerOption = document.getElementById("registerOption");

  // النماذج
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // فتح النافذة
  openBtn.onclick = () => {
    modal.style.display = "block";
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
  };

  // غلق النافذة
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // اختيار تسجيل الدخول
  loginOption.onclick = () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  };

  // اختيار تسجيل جديد
  registerOption.onclick = () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  };

  // تسجيل الدخول
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;

    const { data, error } = await client
      .from("patients")
      .select("email")
      .eq("email", email);

    if (error) {
      alert("❌ خطأ أثناء التحقق: " + error.message);
    } else if (data.length > 0) {
      alert("✅ تم تسجيل الدخول بنجاح");
      modal.style.display = "none";
      loginForm.reset();
    } else {
      alert("❌ البريد غير موجود، يرجى التسجيل أولاً");
    }
  };

  // تسجيل جديد
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("patientEmail").value;
    const firstName = document.getElementById("patientFirstName").value;
    const lastName = document.getElementById("patientLastName").value;
    const age = document.getElementById("patientAge").value;
    const phone = document.getElementById("patientPhone").value;

    const { data: existing, error: checkError } = await client
      .from("patients")
      .select("email")
      .eq("email", email);

    if (checkError) {
      alert("❌ خطأ أثناء التحقق: " + checkError.message);
      return;
    }

    if (existing.length > 0) {
      alert("⚠️ البريد موجود مسبقًا، يرجى تسجيل الدخول بدلًا من ذلك");
      return;
    }

    const { data, error } = await client
      .from("patients")
      .insert([{ email, first_name: firstName, last_name: lastName, age, phone }]);

    if (error) {
      alert("❌ خطأ أثناء التسجيل: " + error.message);
    } else {
      alert("✅ تم تسجيل المريض الجديد بنجاح");
      registerForm.reset();
      modal.style.display = "none";
    }
  };
});