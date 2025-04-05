import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer className={`w-full py-6 px-4 flex items-center justify-between`}>
      <p
        className={`text-sm font-bold ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        by kiuyha
      </p>

      <p
        className={`text-sm font-bold ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Remake of 
        <a href="https://roastgram.vercel.app" className="href underline ml-1">
          Roastgram
        </a>
      </p>

      <div className="flex gap-2">
        <a
          href="https://github.com/kiuyha/roastx"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-md ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow`}
        >
          <FaGithub
            className={`w-5 h-5 ${darkMode ? "text-white" : "text-black"}`}
          />
        </a>

        {/* <a
          href="https://instagram.com/alang.kun"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-md ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow`}
        >
          <FaInstagram
            className={`w-5 h-5 ${darkMode ? "text-white" : "text-black"}`}
          />
        </a> */}
      </div>
    </footer>
  );
}
