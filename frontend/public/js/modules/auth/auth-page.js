export function showLogin() {
  const loginDiv    = document.getElementById("loginDiv");
  const registerDiv = document.getElementById("registerDiv");
  const overlay1    = document.getElementById("overlay1");
  const overlay2    = document.getElementById("overlay2");

  registerDiv.classList.add("hidden");
  overlay2.classList.remove("hidden");
  loginDiv.classList.remove("hidden");
  overlay1.classList.add("hidden");
}

export function showRegister() {
  const loginDiv    = document.getElementById("loginDiv");
  const registerDiv = document.getElementById("registerDiv");
  const overlay1    = document.getElementById("overlay1");
  const overlay2    = document.getElementById("overlay2");

  loginDiv.classList.add("hidden");
  overlay1.classList.remove("hidden");
  registerDiv.classList.remove("hidden");
  overlay2.classList.add("hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  // Redirect if already logged in
  if (document.cookie.includes("jwt_access")) {
    window.location.href = "/to-do/all";
    return;
  }

  // Loop the background video
  const video = document.getElementById("bgVideo");
  if (video) {
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
    });
  }

  const btnLogin    = document.getElementById("btn_login");
  const btnRegister = document.getElementById("btn_register");

  btnLogin?.addEventListener("click", () => showLogin());
  btnRegister?.addEventListener("click", () => showRegister());
});
