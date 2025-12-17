import { useEffect } from "react";
import { Plasma } from "../../components/index.js";
import { useAuth } from "../../hooks/index.js";
import Logo from "../../assets/Logo.png";
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const { t } = useTranslation();
  const {
    isLoginMode,
    showLogin,
    showRegister,
    handleLogin,
    handleRegister,
    navigate,
    controlTokens,
    setUser,
    setRememberMe,
    rememberMe,
    setSavedEmail,
    savedEmail,
    setSavedPassword,
    savedPassword,
  } = useAuth();

  // Token control and redirect
  useEffect(() => {
    (async () => {
      const { success, first_name, last_name, email } = await controlTokens();
      setUser({ first_name, last_name, email });
      if (success) navigate("/todo/all");
    })();

    // 2️⃣ LocalStorage’dan otomatik form doldurma
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setSavedEmail(savedEmail); // useState ile tanımlanmış input state
      setSavedPassword(savedPassword);
      setRememberMe(true); // checkbox state
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white antialiased">
      {/* Arka plan efekti (istersen tut) */}
      <div className="fixed inset-0 pointer-events-none">
        <Plasma
          className="w-full h-full opacity-30 blur-[2px]"
          color="#6d28d9"
          speed={0.6}
          direction="forward"
          scale={1.3}
          opacity={0.6}
          mouseInteractive={false}
        />
      </div>

      {/* Sayfa container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        {/* Ana kart */}
        <div className="w-full max-w-6xl rounded-[28px] border border-white/10 bg-[#0c1424]/80 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md overflow-hidden">
          <div className="flex flex-row">
            {" "}
            {/* küçük ekranda da yan yana */}
            {/* Sol Panel - her zaman görünür, gradient + slogan */}
            <div className="relative hidden md:block w-[45%] min-h-[640px] border-r border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#1e3a8a]" />
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_120%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute top-6 left-6 text-sm font-semibold tracking-wide flex items-center gap-2 opacity-95">
                <div className="size-12 rounded-full bg-white text-[#0b1220] grid place-items-center font-bold">
                  <img
                    src={Logo}
                    alt="TaskProse Logo"
                    className="w-8 h-8 object-contain"
                    draggable="false"
                  />
                </div>
                <span className="text-2xl font-semibold">TaskProse</span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center space-y-4">
                <h2 className="text-3xl font-extrabold drop-shadow-sm leading-tight">
                  {t("auth.left.title")}
                </h2>

                <p className="text-white/70 text-2xl max-w-md leading-relaxed">
                  {t("auth.left.desc")}
                </p>

                <div className="mt-3 space-y-1 self-start text-left">
                  <p className="text-2xl font-bold">
                    {t("auth.left.bullets.0")}
                  </p>
                  <p className="text-2xl font-bold">
                    {t("auth.left.bullets.1")}
                  </p>
                  <p className="text-2xl font-bold">
                    {t("auth.left.bullets.2")}
                  </p>
                </div>
              </div>
            </div>
            {/* Sağ Panel - Form alanı */}
            <div
              key={isLoginMode ? "login" : "register"}
              className={
                `w-full md:w-[55%] opacity-0 ` +
                `${isLoginMode ? "animate-from-right" : "animate-from-left"}`
              }
            >
              <div className="px-6 sm:px-10 md:px-12 lg:px-14 py-10 sm:py-12">
                <div className="w-full max-w-md mx-auto">
                  {/* Header */}
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {t("auth.login.title")}
                  </h1>
                  <p className="mt-2 text-white/70">
                    {t("auth.login.subtitle")}
                  </p>

                  {/* Login / Register */}
                  {isLoginMode ? (
                    <>
                      <form
                        id="loginForm"
                        onSubmit={handleLogin}
                        className="mt-8 space-y-6"
                      >
                        <div>
                          <label className="mb-2 block text-sm font-medium text-white/90 opacity-0 animate-form-in [animation-delay:80ms]">
                            {t("auth.login.emailLabel")}
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={savedEmail}
                            onChange={(e) => setSavedEmail(e.target.value)}
                            autoComplete="username"
                            className="w-full rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            placeholder={t("auth.login.emailPlaceholder")}
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-white/90 opacity-0 animate-form-in [animation-delay:80ms]">
                            {t("auth.login.passwordLabel")}
                          </label>
                          <input
                            name="password"
                            type="password"
                            value={savedPassword}
                            onChange={(e) => setSavedPassword(e.target.value)}
                            autoComplete="current-password"
                            className="w-full rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            placeholder="••••••••"
                            required
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="size-4 rounded border-white/20 bg-transparent text-violet-500 focus:ring-violet-500/60"
                            />
                            <span className="text-sm text-white/80 opacity-0 animate-form-in [animation-delay:80ms]">
                              {t("auth.login.rememberMe")}
                            </span>
                          </label>
                          <button
                            type="button"
                            className="text-sm text-white/70 hover:text-white/90 opacity-0 animate-form-in [animation-delay:80ms]"
                          >
                            {t("auth.login.forgot")}
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-full bg-violet-600 hover:bg-violet-500 transition-colors py-3.5 font-semibold opacity-0 animate-form-in [animation-delay:80ms]"
                        >
                          {t("auth.login.submit")}
                        </button>
                      </form>

                      {/* Divider */}
                      <div className="my-8 relative opacity-0 animate-form-in [animation-delay:80ms]">
                        <div className="h-px w-full bg-white/10" />
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0c1424] px-3 text-xs text-white/60">
                          {t("auth.login.divider")}
                        </span>
                      </div>

                      {/* Sosyal */}
                      <div className="flex items-center gap-3 opacity-0 animate-form-in [animation-delay:80ms]">
                        <button className="flex-1 rounded-full border border-white/15 bg-transparent px-4 py-3 hover:bg-white/5 transition">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="mx-auto"
                          >
                            <g transform="scale(0.90) translate(1.3,1.3)">
                              <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                            </g>
                          </svg>
                        </button>

                        <button className="flex-1 rounded-full border border-white/15 bg-transparent px-4 py-3 hover:bg-white/5 transition">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="mx-auto"
                          >
                            <g transform="scale(0.80) translate(2.5,2.5)">
                              <path d="M2 2h6.7l4.7 6.1L17.9 2H22l-7.8 9 7.9 11H15.3l-5-6.2L6.1 22H2l8.6-9.8L2 2z" />
                            </g>
                          </svg>
                        </button>

                        <button className="flex-1 rounded-full border border-white/15 bg-transparent px-4 py-3 hover:bg-white/5 transition">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="mx-auto"
                          >
                            <g transform="scale(0.92) translate(0.9,0.9)">
                              <path d="M21.6 12.23c0-.52-.05-1.02-.14-1.5H12v3h5.44c-.23 1.45-1.65 4-5.44 4-3.3 0-6-2.69-6-6s2.7-6 6-6c1.58 0 2.93.57 3.96 1.5l2.12-2.12C16.48 3.36 14.4 2.5 12 2.5 6.98 2.5 2.9 6.58 2.9 11.6S6.98 20.7 12 20.7c5.33 0 9.6-3.7 9.6-8.47z" />
                            </g>
                          </svg>
                        </button>
                      </div>

                      {/* Kayıt linki */}
                      <p className="mt-6 text-sm text-white/70 opacity-0 animate-form-in [animation-delay:80ms]">
                        {t("auth.login.noAccount")}{" "}
                        <button
                          onClick={showRegister}
                          className="text-violet-400 hover:text-violet-300 underline-offset-2 hover:underline text-lg cursor-pointer"
                        >
                          {t("auth.login.registerLink")}
                        </button>
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="mt-9 text-xl font-semibold opacity-0 animate-form-in [animation-delay:80ms]">
                        {t("auth.register.title")}
                      </h2>
                      <form
                        id="registerForm"
                        onSubmit={handleRegister}
                        className="mt-7 space-y-6"
                      >
                        <div className="flex gap-3">
                          <input
                            name="first_name"
                            type="text"
                            placeholder={t(
                              "auth.register.firstNamePlaceholder"
                            )}
                            className="flex-1 rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            required
                          />
                          <input
                            name="last_name"
                            type="text"
                            placeholder={t("auth.register.lastNamePlaceholder")}
                            className="flex-1 rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            required
                          />
                        </div>
                        <div>
                          <input
                            name="email"
                            type="email"
                            placeholder={t("auth.register.emailPlaceholder")}
                            autoComplete="username"
                            className="w-full rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            required
                          />
                        </div>
                        <div>
                          <input
                            name="password"
                            type="password"
                            placeholder={t("auth.register.passwordPlaceholder")}
                            autoComplete="new-password"
                            className="w-full rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            required
                          />
                        </div>
                        <div>
                          <input
                            name="confirmPassword"
                            type="password"
                            placeholder={t(
                              "auth.register.confirmPasswordPlaceholder"
                            )}
                            autoComplete="new-password"
                            className="w-full rounded-full bg-[#0f1a2c] border border-white/10 px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500/70 opacity-0 animate-form-in [animation-delay:80ms]"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-full bg-violet-600 hover:bg-violet-500 transition-colors py-3.5 font-semibold opacity-0 animate-form-in [animation-delay:80ms]"
                        >
                          {t("auth.register.submit")}
                        </button>
                      </form>

                      <p className="mt-6 text-sm text-white/70 opacity-0 animate-form-in [animation-delay:80ms]">
                        {t("auth.register.haveAccount")}{" "}
                        <button
                          onClick={showLogin}
                          className="ml-2 text-violet-400 hover:text-violet-300 underline-offset-2 hover:underline text-lg cursor-pointer"
                        >
                          {t("auth.register.loginLink")}
                        </button>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
