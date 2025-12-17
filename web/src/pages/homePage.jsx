import { Link } from "react-router-dom";
import { TextType, LiquidEther, TargetCursor } from "../components/index.js";
import Logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";

import showcaseTR from "../assets/video/HomePageShowcaseTR.mp4";
import showcaseEN from "../assets/video/HomePageShowcaseEN.mp4";
import showcaseDE from "../assets/video/HomePageShowcaseDE.mp4";
import showcaseFR from "../assets/video/HomePageShowcaseFR.mp4";
import showcaseES from "../assets/video/HomePageShowcaseES.mp4";
import showcaseIT from "../assets/video/HomePageShowcaseIT.mp4";
import showcasePT from "../assets/video/HomePageShowcasePT.mp4";
import showcaseRU from "../assets/video/HomePageShowcaseRU.mp4";
import showcaseJA from "../assets/video/HomePageShowcaseJA.mp4";
import showcaseKO from "../assets/video/HomePageShowcaseKO.mp4";
import showcaseAR from "../assets/video/HomePageShowcaseAR.mp4";
import showcaseZH from "../assets/video/HomePageShowcaseZH.mp4";


export default function HomePage() {
  const { t, i18n } = useTranslation();
  const features = t("home.features.items", { returnObjects: true });
  const lang = i18n.language?.toLowerCase() || "en";

  const getShowcaseVideo = () => {
    if (lang.startsWith("tr")) return showcaseTR;
    if (lang.startsWith("de")) return showcaseDE;
    if (lang.startsWith("fr")) return showcaseFR;
    if (lang.startsWith("es")) return showcaseES;
    if (lang.startsWith("it")) return showcaseIT;
    if (lang.startsWith("pt")) return showcasePT;
    if (lang.startsWith("ru")) return showcaseRU;
    if (lang.startsWith("ja")) return showcaseJA;
    if (lang.startsWith("ko")) return showcaseKO;
    if (lang.startsWith("ar")) return showcaseAR;
    if (lang.startsWith("zh")) return showcaseZH;
    return showcaseEN;
  };
  const showcaseSrc = getShowcaseVideo();
  return (
    <div className="relative w-full h-screen bg-homepage overflow-hidden">
      {/* LiquidEther - Canvas için özel override */}
      <div className="absolute inset-0 [&_canvas]:pointer-events-auto [&_canvas]:touch-action-auto">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={15}
          cursorSize={80}
          isViscous={false}
          viscous={20}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
          takeoverDuration={0.5}
          autoResumeDelay={4000}
          autoRampDuration={1.0}
        />
        <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 w-full flex justify-between items-center px-6 lg:px-20 py-4 pointer-events-auto">
        <img
          src={Logo}
          alt="TaskProse Logo"
          className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-target"
          draggable="false"
        />

        <div className="flex items-center gap-3 lg:gap-6">
          <Link
            to="/"
            className="cursor-target text-purple-400 hover:-translate-y-1 transition-all duration-200 px-2 lg:px-4 py-2 flex items-center gap-1 lg:gap-2 text-sm lg:text-base"
          >
            <span className="text-purple-400">◆</span>
            {t("home.nav.home")}
          </Link>
          <Link
            to="/auth"
            className="cursor-target text-white hover:text-purple-300 hover:-translate-y-1 transition-all duration-200 px-2 lg:px-4 py-2 flex items-center gap-1 lg:gap-2 text-sm lg:text-base"
          >
            <span className="text-purple-400">◆</span>
            {t("home.nav.start")}
          </Link>
          <Link
            to="https://github.com/TheRainor"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target text-white hover:text-purple-300 hover:-translate-y-1 transition-all duration-200 px-2 lg:px-4 py-2 flex items-center gap-1 lg:gap-2 text-sm lg:text-base"
          >
            <span className="text-purple-400">◆</span>
            Github
          </Link>
          <a
            href="/Taskprose-Setup-1.0.0.exe"
            download
            className="cursor-target bg-purple-600 text-white hover:bg-purple-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 px-3 lg:px-6 py-2 lg:py-3 rounded-lg shadow-lg flex items-center gap-1 lg:gap-2 text-sm lg:text-base"
          >
            <span className="text-purple-200">◆</span>
            {t("home.nav.download")}
          </a>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col pointer-events-none">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 pt-20 lg:pt-0">
          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col gap-4 lg:gap-6 pointer-events-auto text-center lg:text-left mb-8 lg:mb-0">
            <TextType
              className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
              text={t("home.hero.title", { returnObjects: true })}
              textColors={["#FF9FFC", "#B19EEF", "#FFFFFF"]}
              typingSpeed={100}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              style={{
                willChange: "contents",
                contain: "layout style paint",
              }}
            />
            <p className="text-purple-100 text-base lg:text-lg max-w-md mx-auto lg:mx-0">
              {t("home.hero.subtitle")}
            </p>

            <Link
              to="/auth"
              className="cursor-target bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:translate-x-2 transition-all duration-300 font-medium w-fit mx-auto lg:mx-0"
            >
              {t("home.hero.cta")}
            </Link>
          </div>

          {/* Right Side - Video */}
          <div className="flex-1 flex justify-center pointer-events-auto max-w-sm lg:max-w-none">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="cursor-target rounded-2xl shadow-2xl w-full max-w-lg lg:max-w-xl border border-purple-500/20"
              style={{
                willChange: "auto",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              <source src={showcaseSrc} type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Feature Section */}
        <section className="pb-8 lg:pb-16 px-6 lg:px-20 pointer-events-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {features.map((text, index) => (
                <div
                  key={index}
                  className="cursor-target flex flex-col items-center text-center bg-white/5 backdrop-blur-sm border border-purple-500/20 p-4 lg:p-6 rounded-xl shadow-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <i
                    className={`bi ${
                      [
                        "bi-list-task",
                        "bi-bar-chart-line-fill",
                        "bi-bell-fill",
                        "bi-cloud-fill",
                      ][index]
                    } text-2xl lg:text-3xl text-purple-400 mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300`}
                  ></i>
                  <p className="text-white font-medium text-sm lg:text-base">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
