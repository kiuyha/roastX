import { useState, useEffect } from "react";
import { useAnimationControls } from "framer-motion";
import { ThemeToggle } from "./components/theme-toggle";
import { Header } from "./components/header";
import { InputForm } from "./components/input-form";
import { ResultsSection } from "./components/results-section";
import { LoadingOverlay } from "./components/loading-overlay";
import { useTheme } from "./hooks/use-theme";
import { BackgroundPattern } from "./components/background-pattern";
import { DecorationElements } from "./components/decoration-elements";
import Footer from "./components/footer";
import { XProfile } from "./types/index";

export default function Home({ lang }: { lang: string }) {
  const [username, setUsername] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<XProfile | null>(null);
  const [stage, setStage] = useState<
    "idle" | "turnstile" | "roasting" | "complete"
  >("idle");
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const flameControls = useAnimationControls();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (input instanceof HTMLInputElement) {
      input.blur();
    }
    setLoading(true);
    if (turnstileToken) {
      await fetchData();
    }else{
      setStage("turnstile");
    }
    return;
  };

  const fetchData = async () => {
    const input = document.getElementById("username") as HTMLInputElement;
    try {
      setStage("roasting");

      const response = await fetch(`/${lang}/fetch-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") as string,
        },
        body: JSON.stringify({ username, turnstileToken }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || (
          lang == 'en' ? 
          'Something went wrong, please refresh the page and try again' :
          'Terjadi kesalahan, silahkan refresh halaman dan coba lagi'));
        input?.focus();
        return;
      }

      const { dataProfile, roastText} = data;
      // Set hasil
      setProfileData(dataProfile);
      setRoast(roastText);
      setShowResults(true);
      setError(null);
    } catch (error) {
      setError(
        lang == 'en' ?
        "Something went wrong, please refresh the page and try again" :
        "Terjadi kesalahan, silahkan refresh halaman dan coba lagi");
      console.error(error);
      input?.focus();
    } finally {
      setLoading(false);
    } 
  }

  const resetForm = () => {
    setShowResults(false);
    setRoast(null);
    setProfileData(null);
    setUsername("");
    setTurnstileToken("");
  };

  const copyToClipboard = () => {
    if (!roast) return;

    navigator.clipboard.writeText(`Roast for @${username}:\n\n${roast}`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main
      className={`min-h-screen font-mono overflow-x-hidden transition-colors duration-300 ${
        darkMode ? "bg-zinc-900" : "bg-gray-200"
      } relative`}
    >
      <BackgroundPattern darkMode={darkMode} />

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="relative w-full z-10">
        <DecorationElements darkMode={darkMode} />

        <Header
          showResults={showResults}
          resetForm={resetForm}
          darkMode={darkMode}
        />

        <div className="pt-20 md:pt-24 pb-8 md:pb-10 px-3 md:px-8">
          {!showResults ? (
            <InputForm
              username={username}
              setUsername={setUsername}
              turnstileToken={turnstileToken}
              setTurnstileToken={setTurnstileToken}
              stage={stage}
              handleSubmit={handleSubmit}
              fetchData={fetchData}
              loading={loading}
              error={error}
              darkMode={darkMode}
              flameControls={flameControls}
              lang={lang}
            />
          ) : (
            <ResultsSection
              username={username}
              profileData={profileData}
              roast={roast}
              darkMode={darkMode}
              copied={copied}
              copyToClipboard={copyToClipboard}
              lang={lang}
            />
          )}

          {loading && <LoadingOverlay stage={stage} darkMode={darkMode} lang={lang} />}
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </main>
  );
}