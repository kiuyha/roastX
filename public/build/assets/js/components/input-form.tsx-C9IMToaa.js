import{j as e,r as m}from"../vendor/react-CJ2V4BqM.js";import{m as i,A as y}from"../vendor/framer-motion-CLzqDuJ2.js";import{A as j,F as u,a as f,U as v,Z as N,S as _}from"../vendor/lucide-react-D5e_nBrO.js";function P({username:t,setUsername:s,handleSubmit:r,loading:n,error:o,darkMode:a,flameControls:b,lang:l}){return e.jsxs(i.div,{className:"max-w-2xl mx-auto",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,x:-300},transition:{duration:.5},children:[e.jsxs(i.div,{className:"text-center mb-6 md:mb-10",initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.2},children:[e.jsx("img",{src:"/roastxlogo.webp",alt:"RoastX Logo",className:"h-30 md:h-40 w-auto mx-auto mb-5 md:mb-8"}),e.jsx("p",{className:`${a?"text-gray-300":"text-black"} text-lg md:text-xl max-w-md mx-auto font-bold px-2`,children:l==="en"?"Roasting your X account, ready to ignite your mind?":"Roasting akun X-mu, siap kena mental? 💀"})]}),e.jsx(I,{darkMode:a,lang:l}),e.jsx(i.div,{className:`${a?"bg-cyan-600":"bg-[#00DDFF]"} border-4 md:border-8 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden mx-2 md:mx-0`,initial:{y:50,opacity:0},animate:{y:0,opacity:1},transition:{delay:.4},whileHover:{y:-5,boxShadow:"6px 11px 0px 0px rgba(0,0,0,1)"},children:e.jsxs("div",{className:"p-4 md:p-8",children:[e.jsxs("form",{onSubmit:r,className:"space-y-4 md:space-y-6",children:[e.jsxs("div",{className:"flex flex-col space-y-2 md:space-y-3",children:[e.jsxs("label",{htmlFor:"username",className:`text-xl md:text-2xl font-black ${a?"text-white":"text-black"} flex items-center gap-2`,children:[e.jsx("div",{className:"w-5 h-5 md:w-6 md:h-6 ",children:e.jsxs("svg",{className:a?"fill-white":"fill-black",role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("title",{children:"X"}),e.jsx("path",{d:"M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"})]})}),l==="en"?"Username X or Twitter":"Username X atau Twitter"]}),e.jsxs("div",{className:"relative",children:[e.jsx(i.div,{className:"absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4",animate:{x:[0,5,0]},transition:{duration:2,repeat:Number.POSITIVE_INFINITY},children:e.jsx(j,{className:`w-5 h-5 md:w-6 md:h-6 ${a?"text-gray-300":"text-black"}`})}),e.jsx("input",{type:"text",id:"username",value:t,onChange:c=>s(c.target.value),className:`w-full pl-10 md:pl-14 pr-3 md:pr-4 py-3 md:py-5 ${a?"bg-zinc-800 text-white placeholder-gray-500":"bg-white text-black placeholder-black/50"} border-3 md:border-4 border-black rounded-md text-base md:text-xl focus:outline-none focus:ring-4 focus:ring-black transition-all`,placeholder:"username",required:!0})]})]}),e.jsx(i.button,{type:"submit",disabled:n,className:`w-full ${a?"bg-pink-600 hover:bg-pink-700 text-white":"bg-[#FF3366] hover:bg-[#FF1F4B] text-black"} font-black text-lg md:text-xl py-3 md:py-5 px-4 md:px-6 border-4 md:border-8 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 md:gap-3`,whileHover:{x:-2,y:-2,boxShadow:"6px 6px 0px 0px rgba(0,0,0,1)"},whileTap:{x:0,y:0,boxShadow:"4px 4px 0px 0px rgba(0,0,0,1)"},children:!n&&e.jsxs(e.Fragment,{children:[e.jsx(u,{className:"w-5 h-5 md:w-6 md:h-6"}),e.jsx("span",{children:"Roast! 🔥"}),e.jsx(i.div,{animate:{x:[0,5,0]},transition:{duration:1,repeat:Number.POSITIVE_INFINITY},children:e.jsx(f,{className:"w-5 h-5 md:w-6 md:h-6"})})]})})]}),e.jsx(y,{children:o&&e.jsx(i.div,{className:`mt-4 md:mt-6 p-3 md:p-4 ${a?"bg-red-600":"bg-red-500"} border-3 md:border-4 border-black rounded-md`,initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},children:e.jsx("p",{className:`text-base md:text-lg font-bold ${a?"text-white":"text-black"}`,children:o})})})]})}),e.jsx(F,{darkMode:a,lang:l})]},"input-form")}function I({darkMode:t,lang:s}){const[r,n]=m.useState(0),[o,a]=m.useState(0),b=async()=>{const l=async()=>{try{const x=await fetch("/people-roasted");if(!x.ok){console.error("Failed to update people roasted count");return}const p=await x.json();a(r),n(p.roastedPeople)}catch(x){console.error("Error fetching roasted people:",x)}};l();const c=setInterval(l,8e3);return()=>clearInterval(c)};return m.useEffect(()=>{b()},[]),m.useEffect(()=>{if(r!==o){const p=(r-o)/50;let h=0;const g=setInterval(()=>{a(w=>w+p),h+=1,h>=50&&(clearInterval(g),a(r))},10);return()=>clearInterval(g)}},[r,o]),r>0&&e.jsxs(i.div,{className:`flex items-center gap-2 md:gap-4 ${t?"bg-zinc-800":"bg-white"} mb-5 md:mb-10 border-3 md:border-4 border-black rounded-md p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`,initial:{y:20,opacity:0},animate:{y:0,opacity:1},whileHover:{y:-5},children:[e.jsx(v,{className:`
        ${t?"fill-white":"fill-black"} 
        w-6 h-6 md:w-8 md:h-8`}),e.jsx("p",{className:`font-black ${t?"text-white":"text-black"} text-lg md:text-2xl transition-all duration-500 ease-in-out`,children:Math.round(o)}),e.jsx("p",{className:`${t?"text-gray-300":"text-black"} text-sm md:text-base`,children:r>1?s=="en"?"people have been roasted":"orang telah diroasting":s=="en"?"person has been roasted":"orang telah diroasting"})]})}function F({darkMode:t,lang:s}){return e.jsxs(i.div,{className:"mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0",initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.6},children:[e.jsx(d,{title:s=="en"?"Super Fast":"Super Cepat",description:s=="en"?"Roasting result in seconds":"Hasil roasting dalam hitungan detik",icon:e.jsx(N,{className:`w-6 h-6 md:w-8 md:h-8 ${t?"text-yellow-300":"text-white"}`}),bgColor:t?"bg-purple-700":"bg-[#9933FF]",iconBgColor:t?"bg-purple-900":"bg-purple-600",darkMode:t}),e.jsx(d,{title:s=="en"?"Spicy Roast":"Roast Pedas",description:s=="en"?"Guaranteed to burn your mind":"Dijamin bikin mental terbakar",icon:e.jsx(u,{className:`w-6 h-6 md:w-8 md:h-8 ${t?"text-yellow-300":"text-white"}`}),bgColor:t?"bg-green-700":"bg-green-500",iconBgColor:t?"bg-green-900":"bg-green-600",darkMode:t}),e.jsx(d,{title:"AI Powered",description:s=="en"?"Created with the latest AI technology":"Dibuat dengan teknologi AI terbaru",icon:e.jsx(_,{className:`w-6 h-6 md:w-8 md:h-8 ${t?"text-yellow-300":"text-white"}`}),bgColor:t?"bg-orange-700":"bg-orange-500",iconBgColor:t?"bg-orange-900":"bg-orange-600",darkMode:t})]})}function d({title:t,description:s,icon:r,bgColor:n,iconBgColor:o,darkMode:a}){return e.jsx(i.div,{className:`${n} border-4 md:border-8 border-black rounded-none p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`,whileHover:{y:-5,x:-5,boxShadow:"7px 7px 0px 0px rgba(0,0,0,1)"},children:e.jsxs("div",{className:"flex flex-col items-center text-center",children:[e.jsx(i.div,{className:`${o} p-2 md:p-3 rounded-md border-2 border-black mb-2 md:mb-3`,whileHover:{rotate:10},children:r}),e.jsx("h3",{className:`text-lg md:text-xl font-bold ${a?"text-white":"text-black"} mb-1 md:mb-2`,children:t}),e.jsx("p",{className:`${a?"text-gray-300":"text-black"} text-sm md:text-base`,children:s})]})})}export{P as I};
