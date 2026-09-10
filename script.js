const pages = ["login","forgot","dashboard","attendance","humcomp","success","subjects","grades","schedule","announcements"];
const pageTitle = {dashboard:"DASHBOARD",attendance:"MY ATTENDANCE",humcomp:"HUMCOMP ATTENDANCE",success:"SUCCESS",subjects:"SUBJECTS",grades:"GRADES",schedule:"SCHEDULE",announcements:"ANNOUNCEMENTS"};

function showPage(name){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));

  if(name==="login"){document.getElementById("loginPage").classList.add("active"); return;}
  if(name==="forgot"){document.getElementById("forgotPage").classList.add("active"); return;}

  document.getElementById("appPage").classList.add("active");
  const view=document.getElementById(name);
  if(view) view.classList.add("active-view");
  document.getElementById("pageTitle").textContent=pageTitle[name]||"STUDENT PORTAL";
  document.querySelectorAll(".sidebar nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
  window.scrollTo({top:0,behavior:"smooth"});
}

function go(name){ showPage(name); }

document.addEventListener("click", e=>{
  const btn=e.target.closest("[data-page]");
  if(btn) go(btn.dataset.page);
});

document.getElementById("loginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const id=document.getElementById("studentId").value.trim();
  const pass=document.getElementById("password").value;
  const msg=document.getElementById("loginMessage");
  if(!id || !pass){msg.textContent="Please enter your Student ID and Password."; return;}
  if(id==="2026-0001" && pass==="123456"){
    msg.textContent="";
    showPage("dashboard");
  }else{
    msg.textContent="Invalid Student ID or Password. Please try again.";
  }
});

document.getElementById("togglePassword").addEventListener("click",()=>{
  const input=document.getElementById("password");
  input.type=input.type==="password"?"text":"password";
});

document.getElementById("logoutBtn").addEventListener("click",()=>{
  document.getElementById("studentId").value="";
  document.getElementById("password").value="";
  document.getElementById("loginMessage").textContent="";
  showPage("login");
});

document.getElementById("mobileMenu").addEventListener("click",()=>{
  document.querySelector(".sidebar").classList.toggle("open");
});

document.querySelectorAll(".sidebar nav button").forEach(btn=>{
  btn.addEventListener("click",()=>document.querySelector(".sidebar").classList.remove("open"));
});

document.getElementById("doneAttendance").addEventListener("click",()=>{
  const now=new Date();
  document.getElementById("successDate").textContent=now.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+" • "+now.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
  showPage("success");
});

document.getElementById("showAll").addEventListener("click",()=>{
  document.querySelector(".extra-history").style.display="flex";
  document.getElementById("showAll").textContent="Showing all";
});

document.getElementById("recoverBtn").addEventListener("click",()=>{
  const id=document.getElementById("forgotId").value.trim();
  const msg=document.getElementById("forgotMessage");
  if(!id){msg.textContent="Please enter your Student ID.";return;}
  if(id==="2026-0001"){
    msg.style.color="#bfffe1";
    msg.textContent="Recovery instructions would be provided here.";
  }else{
    msg.style.color="#ffd5d5";
    msg.textContent="Student ID not found. Please check and try again.";
  }
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") document.querySelector(".sidebar")?.classList.remove("open");
});