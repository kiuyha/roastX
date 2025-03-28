import type React from "react";
import { motion, AnimatePresence, type AnimationControls } from "framer-motion";
import {
  AtSign,
  Flame,
  ArrowRight,
  Zap,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface InputFormProps {
  username: string;
  setUsername: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  flameControls: AnimationControls;
  lang: string;
}

export function InputForm({
  username,
  setUsername,
  handleSubmit,
  loading,
  error,
  darkMode,
  flameControls,
  lang,
}: InputFormProps) {
  return (
    <motion.div
      key="input-form"
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-6 md:mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img
          src="/roastxlogo.webp"
          alt="RoastX Logo"
          className="h-30 md:h-40 w-auto mx-auto mb-5 md:mb-8"
        />

        <p
          className={`${
            darkMode ? "text-gray-300" : "text-black"
          } text-lg md:text-xl max-w-md mx-auto font-bold px-2`}
        >
          { lang === "en" ? "Roasting your X account, ready to ignite your mind?" : "Roasting akun X-mu, siap kena mental? 💀"}
        </p>
      </motion.div>

      <PeopleRostedCard darkMode={darkMode} lang={lang}/>

      <motion.div
        className={`${
          darkMode ? "bg-cyan-600" : "bg-[#00DDFF]"
        } border-4 md:border-8 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden mx-2 md:mx-0`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{
          y: -5,
          boxShadow: "6px 11px 0px 0px rgba(0,0,0,1)",
        }}
      >
        <div className="p-4 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="flex flex-col space-y-2 md:space-y-3">
              <label
                htmlFor="username"
                className={`text-xl md:text-2xl font-black ${
                  darkMode ? "text-white" : "text-black"
                } flex items-center gap-2`}
              >
                <div className="w-5 h-5 md:w-6 md:h-6 ">
                  <svg className={darkMode ? "fill-white" : "fill-black"} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </div>
                { lang === "en" ? "Username X or Twitter" : "Username X atau Twitter"}
              </label>
              <div className="relative">
                <motion.div
                  className="absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <AtSign
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      darkMode ? "text-gray-300" : "text-black"
                    }`}
                  />
                </motion.div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 md:pl-14 pr-3 md:pr-4 py-3 md:py-5 ${
                    darkMode
                      ? "bg-zinc-800 text-white placeholder-gray-500"
                      : "bg-white text-black placeholder-black/50"
                  } border-3 md:border-4 border-black rounded-md text-base md:text-xl focus:outline-none focus:ring-4 focus:ring-black transition-all`}
                  placeholder="username"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full ${
                darkMode
                  ? "bg-pink-600 hover:bg-pink-700 text-white"
                  : "bg-[#FF3366] hover:bg-[#FF1F4B] text-black"
              } font-black text-lg md:text-xl py-3 md:py-5 px-4 md:px-6 border-4 md:border-8 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 md:gap-3`}
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
              }}
              whileTap={{
                x: 0,
                y: 0,
                boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              }}
            >
              {!loading && (
                <>
                  <Flame className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Roast! 🔥</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                className={`mt-4 md:mt-6 p-3 md:p-4 ${
                  darkMode ? "bg-red-600" : "bg-red-500"
                } border-3 md:border-4 border-black rounded-md`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className={`text-base md:text-lg font-bold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <FeatureSection darkMode={darkMode} lang={lang} />
    </motion.div>
  );
}

function PeopleRostedCard ({ darkMode, lang }: { darkMode: boolean, lang: string }) {
  const [roastedPeople, setRoastedPeople] = useState<number>(0);
  const [previousRoastedPeople, setPreviousRoastedPeople] = useState<number>(0);

  const updatePeopleRoasted = async () => {
    const fetchRoastedPeople = async () => {
      try {
        const response = await fetch(`/people-roasted`);
        if (!response.ok) {
          console.error("Failed to update people roasted count");
          return;
        }
        const data = await response.json();
        setPreviousRoastedPeople(roastedPeople);
        setRoastedPeople(data.roastedPeople); 
      } catch (error) {
        console.error("Error fetching roasted people:", error);
      }
    };
    fetchRoastedPeople(); // Initial fetch
    const interval = setInterval(fetchRoastedPeople, 8000); 
    return () => clearInterval(interval);
  };

  useEffect(() => {
    updatePeopleRoasted(); 
  }, []); 

  useEffect(() => {
    if (roastedPeople !== previousRoastedPeople) {
      const duration = 500; 
      const stepTime = 10;
      const steps = duration / stepTime;
      const stepIncrement = (roastedPeople - previousRoastedPeople) / steps;

      let currentStep = 0;

      const countUpInterval = setInterval(() => {
        setPreviousRoastedPeople((prev) => prev + stepIncrement);
        currentStep += 1;

        if (currentStep >= steps) {
          clearInterval(countUpInterval);
          setPreviousRoastedPeople(roastedPeople); 
        }
      }, stepTime);

      return () => clearInterval(countUpInterval);
    }
  }, [roastedPeople, previousRoastedPeople]);

  return (
    roastedPeople > 0 &&
    <motion.div
      className={`flex items-center gap-2 md:gap-4 ${
        darkMode ? "bg-zinc-800" : "bg-white"
      } mb-5 md:mb-10 border-3 md:border-4 border-black rounded-md p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5 }}
    >
      <User className={`
        ${darkMode ? "fill-white" : "fill-black"} 
        w-6 h-6 md:w-8 md:h-8`} />
      <p
        className={`font-black ${
          darkMode ? "text-white" : "text-black"
        } text-lg md:text-2xl transition-all duration-500 ease-in-out`}
      >
        {Math.round(previousRoastedPeople)}
      </p>
      <p
        className={`${
          darkMode ? "text-gray-300" : "text-black"
        } text-sm md:text-base`}
      >
        {roastedPeople > 1 ?
          (lang == "en" ? "people have been roasted" : "orang telah diroasting")
          : ( lang == "en" ? "person has been roasted" : "orang telah diroasting")}
      </p>
    </motion.div>
  );
};

function FeatureSection({ darkMode, lang }: { darkMode: boolean, lang: string }) {
  return (
    <motion.div
      className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <FeatureCard
        title={ lang == "en" ? "Super Fast" : "Super Cepat"}
        description= { lang == "en" ? "Roasting result in seconds" : "Hasil roasting dalam hitungan detik"}
        icon={
          <Zap
            className={`w-6 h-6 md:w-8 md:h-8 ${
              darkMode ? "text-yellow-300" : "text-white"
            }`}
          />
        }
        bgColor={darkMode ? "bg-purple-700" : "bg-[#9933FF]"}
        iconBgColor={darkMode ? "bg-purple-900" : "bg-purple-600"}
        darkMode={darkMode}
      />

      <FeatureCard
        title={ lang == "en" ? "Spicy Roast" : "Roast Pedas"}
        description={ lang == "en" ? "Guaranteed to burn your mind" : "Dijamin bikin mental terbakar"}
        icon={
          <Flame
            className={`w-6 h-6 md:w-8 md:h-8 ${
              darkMode ? "text-yellow-300" : "text-white"
            }`}
          />
        }
        bgColor={darkMode ? "bg-green-700" : "bg-green-500"}
        iconBgColor={darkMode ? "bg-green-900" : "bg-green-600"}
        darkMode={darkMode}
      />

      <FeatureCard
        title="AI Powered"
        description={ lang == "en" ? "Created with the latest AI technology" : "Dibuat dengan teknologi AI terbaru"}
        icon={
          <Sparkles
            className={`w-6 h-6 md:w-8 md:h-8 ${
              darkMode ? "text-yellow-300" : "text-white"
            }`}
          />
        }
        bgColor={darkMode ? "bg-orange-700" : "bg-orange-500"}
        iconBgColor={darkMode ? "bg-orange-900" : "bg-orange-600"}
        darkMode={darkMode}
      />
    </motion.div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
  darkMode: boolean;
}

function FeatureCard({
  title,
  description,
  icon,
  bgColor,
  iconBgColor,
  darkMode,
}: FeatureCardProps) {
  return (
    <motion.div
      className={`${bgColor} border-4 md:border-8 border-black rounded-none p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
      whileHover={{
        y: -5,
        x: -5,
        boxShadow: "7px 7px 0px 0px rgba(0,0,0,1)",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className={`${iconBgColor} p-2 md:p-3 rounded-md border-2 border-black mb-2 md:mb-3`}
          whileHover={{ rotate: 10 }}
        >
          {icon}
        </motion.div>
        <h3
          className={`text-lg md:text-xl font-bold ${
            darkMode ? "text-white" : "text-black"
          } mb-1 md:mb-2`}
        >
          {title}
        </h3>
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-black"
          } text-sm md:text-base`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
