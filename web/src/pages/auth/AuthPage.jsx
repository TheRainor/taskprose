import { useEffect } from "react";
import bgVideo from "../../assets/video/background.mp4";
import { useAuth } from "../../hooks/index.js";

export default function AuthPage() {
  const {
    isLoginMode,
    showLogin,
    showRegister,
    handleLogin,
    handleRegister,
    navigate,
    controlTokens,
    setUser,
  } = useAuth();

  // Token control and redirect
  useEffect(() => {
    (async () => {
      const data = await controlTokens();
      const { first_name, last_name, email } = data.user;
      setUser({ first_name, last_name, email });
      if (data.success) {
        navigate("/todo/all");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <video
        className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="relative flex flex-col lg:flex-row items-center lg:justify-between gap-8 min-h-screen px-4 lg:px-16">
        {/* Sol Overlay - Login modunda gizli */}
        <div
          className={`transform slide-up wind-effect z-10 ${
            isLoginMode ? "hidden" : ""
          }`}
        >
          <div className="max-w-md text-center text-white p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                ✓
              </div>
              <h1 className="text-4xl font-bold">TaskProse</h1>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Görevlerinizi Organize Edin
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Modern ve kullanıcı dostu arayüzü ile görevlerinizi kolayca
              yönetin, önceliklerinizi belirleyin ve üretkenliğinizi artırın.
            </p>

            <div className="space-y-4 text-white text-left text-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  📊
                </div>
                <span>Detaylı analiz ve raporlama</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  ⚡
                </div>
                <span>Hızlı ve responsive tasarım</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  🔒
                </div>
                <span>Güvenli veri koruması</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        {isLoginMode && (
          <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-3xl p-8 shadow-2xl slide-up wind-effect z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Hoş Geldiniz! 👋
              </h3>
              <p className="text-white text-opacity-80">
                Hesabınıza giriş yapın
              </p>
            </div>

            <form id="loginForm" onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  E-posta
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="username"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Şifre
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-white bg-opacity-20 border-white border-opacity-30 rounded focus:ring-primary cursor-pointer"
                  />
                  <span className="ml-2 text-white text-sm">Beni hatırla</span>
                </div>
                <button className="text-white text-opacity-90 text-sm hover:text-white transition-colors">
                  Şifremi unuttum?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-950 hover:from-indigo-800 hover:via-violet-800 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white border-opacity-30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white text-opacity-80">
                    veya
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-white bg-opacity-20 text-white py-3 px-4 rounded-xl hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                  <span>G</span>
                </button>
                <button className="flex-1 bg-white bg-opacity-20 text-white py-3 px-4 rounded-xl hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                  <span>A</span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white text-opacity-80 inline">
                  Hesabınız yok mu?
                </p>
                <button
                  onClick={showRegister}
                  className="ml-2 px-6 py-3 bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Register Form */}
        {!isLoginMode && (
          <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-3xl p-8 shadow-2xl slide-up wind-effect z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Hesap Oluştur 🚀
              </h3>
              <p className="text-white text-opacity-80">
                Hemen ücretsiz kayıt ol
              </p>
            </div>

            <form
              id="registerForm"
              onSubmit={handleRegister}
              className="space-y-6"
            >
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-white text-sm font-medium mb-2">
                    Ad
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Adınız"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white text-sm font-medium mb-2">
                    Soyad
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Soyadınız"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  E-posta
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="username"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Şifre
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Şifre Tekrar
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-950 hover:from-indigo-800 hover:via-violet-800 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Kayıt Ol
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white text-opacity-80 inline">
                Zaten bir hesabınız var mı?
              </p>
              <button
                onClick={showLogin}
                className="ml-2 px-6 py-3 bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        )}

        {/* Sağ Overlay - Register modunda gizli */}
        <div
          className={`transform slide-up wind-effect z-10 ${
            !isLoginMode ? "hidden" : ""
          }`}
        >
          <div className="max-w-md text-center text-white p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                ✓
              </div>
              <h1 className="text-4xl font-bold">TaskProse</h1>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Görevlerinizi Organize Edin
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Modern ve kullanıcı dostu arayüzü ile görevlerinizi kolayca
              yönetin, önceliklerinizi belirleyin ve üretkenliğinizi artırın.
            </p>

            <div className="space-y-4 text-white text-left text-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  📊
                </div>
                <span>Detaylı analiz ve raporlama</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  ⚡
                </div>
                <span>Hızlı ve responsive tasarım</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  🔒
                </div>
                <span>Güvenli veri koruması</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
