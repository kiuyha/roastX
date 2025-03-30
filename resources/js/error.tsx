import { BackgroundPattern } from "./components/background-pattern";
import { ThemeToggle } from "./components/theme-toggle";
import { useTheme } from "./hooks/use-theme";
import Footer from "./components/footer";
import {motion} from 'framer-motion';

export default function Error({lang, errorCode}: {lang: string, errorCode: string}) {
    const {darkMode, setDarkMode} = useTheme();
    const errorMessage =
        errorCode === "404"
        ? lang === "en"
            ? "Page not found"
            : "Halaman tidak ditemukan"
        : lang === "en"
        ? "An error occurred"
        : "Terjadi kesalahan";
    return (
        <main
            className={`min-h-screen font-mono overflow-x-hidden transition-colors duration-300 ${
            darkMode ? "bg-zinc-900" : "bg-gray-200"
            } relative`}
        >
            <BackgroundPattern darkMode={darkMode} />
    
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    
            <div className="flex flex-col relative w-full h-screen text-black dark:text-white">
                <div className="flex flex-col justify-center items-center flex-grow text-center p-8">
                    <h1 className="text-6xl font-bold">Oops!</h1>
                    <p className="text-lg mt-4">{errorMessage}</p>
                    <p className="mt-2">
                        {lang === "en" ? "Error Code: " : "Kode Kesalahan: "}
                        <span className="font-semibold">{errorCode}</span>
                    </p>
                    <div className="mt-6">
                        <motion.a
                        href={`/${lang}`}
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                        font-black text-lg md:text-xl py-3 md:py-5 px-4 md:px-6 border-4 md:border-8 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 md:gap-3"
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
                            <span>
                                {lang === "en"
                                ? "Back to homepage"
                                : "Kembali ke Halaman Utama"}
                            </span>
                        </motion.a>
                    </div>
                </div>
                <Footer darkMode={darkMode} />
            </div>
        </main>
    )
}