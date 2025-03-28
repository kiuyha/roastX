import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  showResults: boolean;
  resetForm: () => void;
  darkMode: boolean;
}

export function Header({ showResults, resetForm, darkMode }: HeaderProps) {
  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-10 py-3 md:py-4 px-4 md:px-6 ${
        darkMode
          ? "bg-zinc-900/90 backdrop-blur-sm"
          : "bg-[#FF5F1F]/90 backdrop-blur-sm"
      } transition-colors duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          onClick={resetForm}
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="/roastxlogo.webp"
            alt="RoastX Logo"
            className="h-10 w-auto md:h-10"
          />
        </motion.div>
      
        <div className="flex items-center gap-2 mr-14">
          {showResults && (
            <motion.button
              onClick={resetForm}
              className={`${darkMode ? "bg-red-500" : "bg-red-500"} ${
                darkMode ? "text-white" : "text-black"
              } font-bold px-3 py-1.5 md:px-4 md:py-2 border-3 md:border-4 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 md:gap-2 text-sm md:text-base`}
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)",
              }}
              whileTap={{
                x: 0,
                y: 0,
                boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Reset
            </motion.button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
}


function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const languages: Record<string, string> = {
    "en" : "🇬🇧" ,
    "id": "🇮🇩" 
  };
  const selectedLang: string = window.location.pathname.split("/")[1];
  const selectedFlag: string = languages[selectedLang];

  return (
    <div className="relative inline-block text-left text-gray-900 dark:text-white md:border-2 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-center text-sm">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 md:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedFlag} {selectedLang.toUpperCase()}
      </button>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 mt-2 w-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {Object.entries(languages).map(([code, flag]) => (
            <a href={`/${code}`}
                key={code}
                className="flex items-center no-underline gap-2 px-4 py-2 dark:hover:bg-gray-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {flag} {code.toUpperCase()}
            </a>
          ))}
        </motion.ul>
      )}
    </div>
  );
}