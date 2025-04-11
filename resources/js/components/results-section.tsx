import type React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  User,
  ImageIcon,
  Heart,
  Flame,
  Camera,
  Sparkles,
  Copy,
  CheckCheck,
  Download,
  VerifiedIcon,
  LockIcon
} from "lucide-react";
import type { XProfile } from "../types/index";
import html2canvas from "html2canvas";
import { marked } from "marked";
import { createRoot } from "react-dom/client";

interface ResultsSectionProps {
  username: string;
  profileData: XProfile | null;
  roast: string | null;
  darkMode: boolean;
  copied: boolean;
  copyToClipboard: () => void;
  lang: string;
}

export function ResultsSection({
  username,
  profileData,
  roast,
  darkMode,
  copied,
  copyToClipboard,
  lang,
}: ResultsSectionProps) {
  const resultsRef = useRef(null);
  const isInView = useInView(resultsRef, { once: true });

  // Staggered text animation for the roast
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      key="results"
      className="max-w-6xl mx-auto px-2 md:px-0"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={resultsRef}
    >
      {/* Results Header */}
      <motion.div
        className="text-center mb-6 md:mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h2
          className={`text-2xl md:text-4xl font-black ${
            darkMode ? "text-white" : "text-black"
          } mb-2`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          { lang == 'en' ? "Roast Results" : "Hasil Roast"}
        </motion.h2>
        <motion.div
          className="h-1.5 md:h-2 w-32 md:w-40 mx-auto bg-black rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          style={{
            width: window.innerWidth >= 768 ? "10rem" : "8rem",
          }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
        <ProfileCard
          username={username}
          profileData={profileData}
          darkMode={darkMode}
        />

        <RoastCard
          username={username}
          roast={roast}
          darkMode={darkMode}
          copied={copied}
          copyToClipboard={copyToClipboard}
          container={container}
          item={item}
          profileData={profileData}
          lang={lang}
        />
      </div>
    </motion.div>
  );
}

interface ProfileCardProps {
  username: string;
  profileData: XProfile | null;
  darkMode: boolean;
}

function ProfileCard({ username, profileData, darkMode }: ProfileCardProps) {
  return (
    <motion.div
      className={`lg:col-span-2 ${
        darkMode ? "bg-lime-600" : "bg-lime-400"
      } border-3 md:border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-fit`}
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { delay: 0.2 },
      }}
      whileHover={{
        y: -5,
        boxShadow: "4px 9px 0px 0px rgba(0,0,0,1)",
      }}
    >
      <div className="p-4 md:p-6">
        <h2
          className={`text-xl md:text-2xl font-black mb-4 md:mb-6 ${
            darkMode ? "text-white" : "text-black"
          } flex items-center gap-2 md:gap-3 border-b-3 md:border-b-4 border-black pb-2 md:pb-3`}
        >
          <User className="w-5 h-5 md:w-6 md:h-6" />
          Profil @{username}
        </h2>

        <div className="flex flex-col space-y-4 md:space-y-6 mb-4 md:mb-6">
          {profileData?.profilePicUrl ? (
            <motion.div
              className="relative mx-auto w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ rotate: 5 }}
            >
              <img
                src={
                  new URL(profileData.profilePicUrl).searchParams.get("url") ?? profileData.profilePicUrl
                }
                width="200"
                height="200"
                alt={`${username}'s profile`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png";
                }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
            </motion.div>
          ) : (
            <div className="mx-auto w-24 h-24 md:w-32 md:h-32 rounded-md bg-white border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <User className="w-12 h-12 md:w-16 md:h-16 text-black" />
            </div>
          )}

          <div className="text-center">
            <motion.div
              className={`font-black ${
                darkMode ? "text-white" : "text-black"
              } text-xl md:text-3xl flex justify-center items-center gap-2`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p>@{username}</motion.p>
              {profileData?.isVerified && <VerifiedIcon  className="fill-blue-500"/>}
              {profileData?.isPrivate && <LockIcon/>}

            </motion.div>
            {profileData?.fullName && (
              <motion.p
                className={`${
                  darkMode ? "text-gray-300" : "text-black"
                } text-base md:text-xl mt-1`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {profileData.fullName}
              </motion.p>
            )}
          </div>

          {profileData?.biography && (
            <motion.div
              className={`${
                darkMode ? "bg-zinc-800" : "bg-white"
              } p-3 md:p-4 border-3 md:border-4 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p
                className={`text-base md:text-lg ${
                  darkMode ? "text-white" : "text-black"
                }`}
                dangerouslySetInnerHTML={{ __html: profileData.biography }}
              >
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          className="grid grid-cols-3 gap-2 md:gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.8,
            },
          }}
        >
          <ProfileStat
            icon={
              <ImageIcon
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  darkMode ? "text-white" : "text-black"
                } mx-auto mb-1 md:mb-2`}
              />
            }
            value={profileData?.tweetsCount}
            label="Tweets"
            darkMode={darkMode}
          />
          <ProfileStat
            icon={
              <User
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  darkMode ? "text-white" : "text-black"
                } mx-auto mb-1 md:mb-2`}
              />
            }
            value={profileData?.followersCount}
            label="Followers"
            darkMode={darkMode}
          />
          <ProfileStat
            icon={
              <Heart
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  darkMode ? "text-white" : "text-black"
                } mx-auto mb-1 md:mb-2`}
              />
            }
            value={profileData?.followsCount}
            label="Following"
            darkMode={darkMode}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ProfileStatProps {
  icon: React.ReactNode;
  value: number | undefined;
  label: string;
  darkMode: boolean;
}

function ProfileStat({ icon, value, label, darkMode }: ProfileStatProps) {
  return (
    <motion.div
      className={`${
        darkMode ? "bg-zinc-800" : "bg-white"
      } border-3 md:border-4 border-black rounded-md p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5 }}
    >
      {icon}
      <p
        className={`font-black ${
          darkMode ? "text-white" : "text-black"
        } text-lg md:text-2xl`}
      >
        {value}
      </p>
      <p
        className={`${
          darkMode ? "text-gray-300" : "text-black"
        } font-bold text-xs md:text-base`}
      >
        {label}
      </p>
    </motion.div>
  );
}

interface RoastCardProps {
  username: string;
  roast: string | null;
  darkMode: boolean;
  copied: boolean;
  copyToClipboard: () => void;
  container: any;
  item: any;
  profileData: XProfile | null;
  lang: string;
}

function RoastCard({
  username,
  roast,
  darkMode,
  copied,
  copyToClipboard,
  container,
  item,
  profileData,
  lang
}: RoastCardProps) {
  const roastContentRef = useRef<HTMLDivElement>(null);
  const [capturing, setCapturing] = useState(false);

  const captureRoast = async () => {
    if (!roastContentRef.current || !roast) return;

    try {
      setCapturing(true);

      // Create a wrapper div for better styling of the captured image
      const captureWrapper = document.createElement("div");
      captureWrapper.style.padding = "20px";
      captureWrapper.style.backgroundColor = darkMode ? "#18181b" : "#FF5F1F"; // Background color
      captureWrapper.style.borderRadius = "8px";
      captureWrapper.style.maxWidth = "600px";

      // Create profile header
      const profileHeader = document.createElement("div");
      profileHeader.style.display = "flex";
      profileHeader.style.alignItems = "center";
      profileHeader.style.marginBottom = "15px";
      profileHeader.style.padding = "10px";
      profileHeader.style.backgroundColor = darkMode
        ? "rgba(0,0,0,0.3)"
        : "rgba(255,255,255,0.3)";
      profileHeader.style.borderRadius = "8px";

      // Profile image
      const profileImg = document.createElement("img");
      profileImg.src =
        profileData?.profilePicUrl || "https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
        ;
      profileImg.alt = username;
      profileImg.style.width = "64px";
      profileImg.style.height = "64px";
      profileImg.style.borderRadius = "8px";
      profileImg.style.border = "3px solid #000000";
      profileImg.style.objectFit = "cover";

      // Username container
      const usernameContainer = document.createElement("div");
      usernameContainer.style.marginLeft = "15px";

      // container for username and their icon
      const usernameTextContainer = document.createElement("div");
      usernameTextContainer.style.display = "flex";
      usernameTextContainer.style.alignItems = "center";
      usernameTextContainer.style.justifyContent = "center";
      usernameTextContainer.style.gap = "4px";
      usernameTextContainer.style.color = darkMode ? "#cccccc" : "#333333"
      
      // Username text
      const usernameText = document.createElement("div");
      usernameText.innerText = `@${username}`;
      usernameText.style.fontWeight = "bold";
      usernameText.style.fontSize = "18px";
      usernameText.style.color = darkMode ? "#ffffff" : "#000000";
      usernameTextContainer.appendChild(usernameText);

      // their icon
      const usernameIcon = document.createElement("span");
      usernameIcon.style.display = "flex";
      usernameIcon.style.alignItems = "center";
      usernameIcon.style.gap = "2px";
      usernameTextContainer.appendChild(usernameIcon);
      const rootUsernameIcon = createRoot(usernameIcon);
      rootUsernameIcon.render([
        profileData?.isVerified && <VerifiedIcon className="fill-blue-500" />,
        profileData?.isPrivate && <LockIcon />
      ]);
    

      // Full name text (if available)
      if (profileData?.fullName) {
        const fullNameText = document.createElement("div");
        fullNameText.innerText = profileData.fullName;
        fullNameText.style.fontSize = "14px";
        fullNameText.style.color = darkMode ? "#cccccc" : "#333333";
        usernameContainer.appendChild(usernameTextContainer);
        usernameContainer.appendChild(fullNameText);
      } else {
        usernameContainer.appendChild(usernameTextContainer);
      }

      // Append profile elements
      profileHeader.appendChild(profileImg);
      profileHeader.appendChild(usernameContainer);

      // Create a simplified version of the roast content to avoid CSS issues
      const simplifiedRoast = document.createElement("div");
      simplifiedRoast.style.backgroundColor = darkMode ? "#27272a" : "#ffffff";
      simplifiedRoast.style.borderRadius = "8px";
      simplifiedRoast.style.padding = "20px";
      simplifiedRoast.style.border = "3px solid #000000";

      // Add the roast text
      const processRoast = async () => {
        // Split the roast string by newlines and process each paragraph
        for (const paragraph of roast.split("\n")) {
          if (paragraph.trim()) {
            const p = document.createElement("p");
            p.innerHTML = await marked(paragraph);
            p.style.color = darkMode ? "#ffffff" : "#000000";
            p.style.fontSize = "16px";
            p.style.fontWeight = "bold";
            p.style.marginBottom = "12px";
            p.style.paddingLeft = "16px";
            simplifiedRoast.appendChild(p);
          }
        }
      };
      await processRoast();

      // Add a watermark
      const watermark = document.createElement("div");
      watermark.style.marginTop = "15px";
      watermark.style.textAlign = "center";
      watermark.style.fontWeight = "bold";
      watermark.style.color = darkMode ? "#ffffff" : "#000000";
      watermark.style.opacity = "0.7"; // Make the watermark slightly transparent
      watermark.innerText = `RoastX by kiuyha`; // Watermark text

      // Append elements to the wrapper
      captureWrapper.appendChild(profileHeader);
      captureWrapper.appendChild(simplifiedRoast);
      captureWrapper.appendChild(watermark);

      // Temporarily append to document for capturing
      document.body.appendChild(captureWrapper);

      // Use html2canvas to capture the element
      const canvas = await html2canvas(captureWrapper, {
        backgroundColor: darkMode ? "#18181b" : "#FF5F1F",
        logging: false, // Disable logging to avoid console spam
        useCORS: true, // Enable CORS for images
        allowTaint: true,
      });

      // Remove the temporary element
      document.body.removeChild(captureWrapper);

      // Convert canvas to blob
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          console.error("Failed to create blob");
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `roastx-${username}-${Date.now()}.png`;
        link.href = url;
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
        setCapturing(false);
      }, "image/png");
    } catch (error) {
      console.error("Error capturing roast:", error);
      setCapturing(false);
    }
  };

  return (
    <motion.div
      className={`lg:col-span-3 ${
        darkMode ? "bg-orange-600" : "bg-orange-400"
      } border-3 md:border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden`}
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { delay: 0.3 },
      }}
      whileHover={{
        y: -5,
        boxShadow: "4px 9px 0px 0px rgba(0,0,0,1)",
      }}
    >
      <div className="p-4 md:p-6">
        <h2
          className={`text-xl md:text-2xl font-black mb-4 md:mb-6 ${
            darkMode ? "text-white" : "text-black"
          } flex items-center gap-2 md:gap-3 border-b-3 md:border-b-4 border-black pb-2 md:pb-3`}
        >
          <Flame
            className={`w-5 h-5 md:w-6 md:h-6 ${
              darkMode ? "text-yellow-300" : "text-red-600"
            }`}
          />
          { lang == 'en' ? 'Result' : "Hasil Roast"}
        </h2>

        <motion.div
          className={`${
            darkMode ? "bg-zinc-800" : "bg-white"
          } border-3 md:border-4 border-black rounded-md p-3 md:p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 md:mb-6`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          ref={roastContentRef}
        >
          {roast ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`${
                darkMode ? "text-white" : "text-black"
              } space-y-3 md:space-y-4 text-base md:text-lg font-bold`}
            >
            {roast.split("\n").map((paragraph, index) => (
                <motion.div key={index} variants={item} className="relative">
                  <p
                    className={`${
                      darkMode ? "text-white" : "text-black"
                    } text-base md:text-lg font-bold pl-4 md:pl-6`}
                    dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
                  />
                </motion.div>
              ))}

            </motion.div>
          ) : (
            <p
              className={`${
                darkMode ? "text-white" : "text-black"
              } text-base md:text-lg font-bold`}
            >
              { lang == 'en' ? "No roast generated yet." : "Belum ada roast yang dibuat."}
            </p>
          )}
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Sparkles
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  darkMode ? "text-yellow-300" : "text-yellow-500"
                }`}
              />
            </motion.div>
            <p
              className={`${
                darkMode ? "text-white" : "text-black"
              } font-bold text-sm md:text-base`}
            >
              { lang == 'en' ? "Created by AI, don't get mad ( ˶ˆᗜˆ˵ )" : "Dibuat oleh AI, jadi jangan baper yak ( ˶ˆᗜˆ˵ )"}
            </p>
          </motion.div>

          <div className="flex gap-2 md:gap-3">
            <motion.button
              onClick={copyToClipboard}
              className={`flex items-center gap-1 md:gap-2 ${
                darkMode ? "text-white bg-zinc-800" : "text-black bg-white"
              } font-bold px-3 md:px-4 py-2 md:py-3 rounded-md border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base`}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {copied ? (
                <>
                  <CheckCheck className="w-4 h-4 md:w-5 md:h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 md:w-5 md:h-5" />
                  Copy
                </>
              )}
            </motion.button>

            <motion.button
              onClick={captureRoast}
              disabled={capturing || !roast}
              className={`flex items-center gap-1 md:gap-2 ${
                darkMode ? "text-white bg-cyan-600" : "text-black bg-cyan-400"
              } font-bold px-3 md:px-4 py-2 md:py-3 rounded-md border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base disabled:opacity-50`}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 }}
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              {capturing ? "Saving..." : "Save Image"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
