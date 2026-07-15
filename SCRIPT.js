import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const SUPABASE_URL = 'https://yrybsyvpiorvidpouurv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWJzeXZwaW9ydmlkcG91dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzA1NDAsImV4cCI6MjA5ODYwNjU0MH0.DmmK05xmbAdCy85q9ikKMls062YGMt-jdMt6u_Tc5iQ';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
async function Query() {
    const formData = new FormData();
    const pdf = document.getElementById("pdfInput").files[0];
    const {data, error} = await supabase.auth.getUser();
    formData.append("pdf", pdf);
    formData.append("user_id", data.user.id);
    await fetch(
        "http://127.0.0.1:5000/queries",
        {
            method: "POST",
            body: formData
        }
    )
}
window.Query = Query;

window.Authentication = async function Authentication() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  const email = emailEl.value.trim();
  const password = passwordEl.value;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!password || password.length < 6) {
    alert("Please enter a valid password (min 6 chars).");
    return;
  }

  await supabase.auth.signUp({email, password});
  #const {data, error} = await supabase.auth.getUser();
};