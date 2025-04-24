import{j as e}from"../vendor/react-DITM8GMD.js";import{m as t}from"../vendor/framer-motion-Did_cceX.js";function s({stage:a,darkMode:n,lang:i}){return e.jsxs(t.div,{className:"fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},children:[e.jsxs("div",{className:"relative mb-8",children:[e.jsx("span",{className:"loader"}),e.jsx("style",{children:`
          .loader {
            position: relative;
            width: 108px;
            height: 48px; /* Tetapkan tinggi tetap */
            display: flex;
            justify-content: space-between;
          }
          .loader::after,
          .loader::before {
            content: "";
            display: inline-block;
            width: 48px; /* Ukuran lingkaran mata */
            height: auto; /* Ukuran lingkaran mata */
            background-color: #fff;
            background-size: 40px 40px;
            background-image: radial-gradient(
              circle 50px,
              #0d161b 30%,
              transparent 31%
            );
            overflow: hidden;

            background-repeat: no-repeat;
            background-position: center; /* Posisi bola mata putih di tengah */
            border-radius: 50%;
            animation: eyeMove 10s infinite, blink 10s infinite;
          }
          @keyframes eyeMove {
            0%,
            10% {
              background-position: 0px 0px;
            }
            13%,
            40% {
              background-position: -15px 0px;
            }
            43%,
            70% {
              background-position: 15px 0px;
            }
            73%,
            90% {
              background-position: 0px 15px;
            }
            93%,
            100% {
              background-position: 0px 0px;
            }
          }
          @keyframes blink {
            0%,
            10%,
            12%,
            20%,
            22%,
            40%,
            42%,
            60%,
            62%,
            70%,
            72%,
            90%,
            92%,
            98%,
            100% {
              transform: scaleY(1); /* Buka mata (normal) */
            }
            11%,
            21%,
            41%,
            61%,
            71%,
            91%,
            99% {
              transform: scaleY(0.1); /* Kedip (mata tertutup) */
            }
          }
        `})]}),e.jsxs("div",{className:"text-center px-4",children:[e.jsxs("p",{className:"text-white text-lg md:text-xl font-bold",children:[a=="turnstile"&&(i=="en"?"Verifying whether human or robot...":"Memverifikasi apakah manusia atau robot... "),a=="roasting"&&(i=="en"?"Processing spicy roast... 🔥":"Memproses roast yang pedas... 🔥")]}),e.jsx("div",{className:"w-48 md:w-64 h-1.5 md:h-2 bg-gray-700 rounded-full mx-auto mt-3 md:mt-4 overflow-hidden",children:e.jsx(t.div,{className:`h-full ${n?"bg-yellow-400":"bg-red-500"}`,initial:{width:0},animate:{width:"100%"},transition:{duration:5,ease:"easeInOut",repeat:Number.POSITIVE_INFINITY,repeatType:"loop"}})})]})]})}export{s as L};
