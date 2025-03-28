import{r as C,j as e}from"../vendor/react-CJ2V4BqM.js";import{h as F}from"../vendor/html2canvas-BfYXEYrK.js";import{m as R}from"../vendor/marked-DK8KC6kv.js";import{u as T,m as s}from"../vendor/framer-motion-CLzqDuJ2.js";import{U as v,C as E,I as H,H as I,F as L,S as U,b as P,c as z,D as W}from"../vendor/lucide-react-CMa1GUhV.js";function J({username:l,profileData:a,roast:t,darkMode:n,copied:u,copyToClipboard:_,lang:g}){const x=C.useRef(null);T(x,{once:!0});const h={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1,delayChildren:.3}}},w={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.5}}};return e.jsxs(s.div,{className:"max-w-6xl mx-auto px-2 md:px-0",initial:{opacity:0,x:300},animate:{opacity:1,x:0},exit:{opacity:0},transition:{duration:.5},ref:x,children:[e.jsxs(s.div,{className:"text-center mb-6 md:mb-10",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.2},children:[e.jsx(s.h2,{className:`text-2xl md:text-4xl font-black ${n?"text-white":"text-black"} mb-2`,initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.3,type:"spring"},children:g=="en"?"Roast Results":"Hasil Roast"}),e.jsx(s.div,{className:"h-1.5 md:h-2 w-32 md:w-40 mx-auto bg-black rounded-full overflow-hidden",initial:{width:0},animate:{width:"8rem"},style:{width:window.innerWidth>=768?"10rem":"8rem"},transition:{delay:.4,duration:.8}})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8",children:[e.jsx(B,{username:l,profileData:a,darkMode:n}),e.jsx(O,{username:l,roast:t,darkMode:n,copied:u,copyToClipboard:_,container:h,item:w,profileData:a,lang:g})]})]},"results")}function B({username:l,profileData:a,darkMode:t}){return e.jsx(s.div,{className:`lg:col-span-2 ${t?"bg-lime-600":"bg-lime-400"} border-3 md:border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-fit`,initial:{x:-100,opacity:0},animate:{x:0,opacity:1,transition:{delay:.2}},whileHover:{y:-5,boxShadow:"4px 9px 0px 0px rgba(0,0,0,1)"},children:e.jsxs("div",{className:"p-4 md:p-6",children:[e.jsxs("h2",{className:`text-xl md:text-2xl font-black mb-4 md:mb-6 ${t?"text-white":"text-black"} flex items-center gap-2 md:gap-3 border-b-3 md:border-b-4 border-black pb-2 md:pb-3`,children:[e.jsx(v,{className:"w-5 h-5 md:w-6 md:h-6"}),"Profil @",l]}),e.jsxs("div",{className:"flex flex-col space-y-4 md:space-y-6 mb-4 md:mb-6",children:[a!=null&&a.profilePicUrl?e.jsxs(s.div,{className:"relative mx-auto w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",initial:{scale:0},animate:{scale:1},transition:{delay:.4,type:"spring"},whileHover:{rotate:5},children:[e.jsx("img",{src:a.profilePicUrl,alt:`${l}'s profile`,className:"w-full h-full object-cover",referrerPolicy:"no-referrer",onError:n=>{n.currentTarget.src="https://via.placeholder.com/128"}}),e.jsx(s.div,{className:"absolute inset-0 flex items-center justify-center bg-black/50",initial:{opacity:0},whileHover:{opacity:1},children:e.jsx(E,{className:"w-6 h-6 md:w-8 md:h-8 text-white"})})]}):e.jsx("div",{className:"mx-auto w-24 h-24 md:w-32 md:h-32 rounded-md bg-white border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center",children:e.jsx(v,{className:"w-12 h-12 md:w-16 md:h-16 text-black"})}),e.jsxs("div",{className:"text-center",children:[e.jsxs(s.p,{className:`font-black ${t?"text-white":"text-black"} text-xl md:text-3xl`,initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},children:["@",l]}),(a==null?void 0:a.fullName)&&e.jsx(s.p,{className:`${t?"text-gray-300":"text-black"} text-base md:text-xl mt-1`,initial:{opacity:0},animate:{opacity:1},transition:{delay:.6},children:a.fullName})]}),(a==null?void 0:a.biography)&&e.jsx(s.div,{className:`${t?"bg-zinc-800":"bg-white"} p-3 md:p-4 border-3 md:border-4 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},children:e.jsx("p",{className:`text-base md:text-lg ${t?"text-white":"text-black"}`,dangerouslySetInnerHTML:{__html:a.biography}})})]}),e.jsxs(s.div,{className:"grid grid-cols-3 gap-2 md:gap-4 text-center",initial:{opacity:0},animate:{opacity:1,transition:{staggerChildren:.1,delayChildren:.8}},children:[e.jsx(N,{icon:e.jsx(H,{className:`w-5 h-5 md:w-6 md:h-6 ${t?"text-white":"text-black"} mx-auto mb-1 md:mb-2`}),value:a==null?void 0:a.tweetsCount,label:"Tweets",darkMode:t}),e.jsx(N,{icon:e.jsx(v,{className:`w-5 h-5 md:w-6 md:h-6 ${t?"text-white":"text-black"} mx-auto mb-1 md:mb-2`}),value:a==null?void 0:a.followersCount,label:"Followers",darkMode:t}),e.jsx(N,{icon:e.jsx(I,{className:`w-5 h-5 md:w-6 md:h-6 ${t?"text-white":"text-black"} mx-auto mb-1 md:mb-2`}),value:a==null?void 0:a.followsCount,label:"Following",darkMode:t})]})]})})}function N({icon:l,value:a,label:t,darkMode:n}){return e.jsxs(s.div,{className:`${n?"bg-zinc-800":"bg-white"} border-3 md:border-4 border-black rounded-md p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`,initial:{y:20,opacity:0},animate:{y:0,opacity:1},whileHover:{y:-5},children:[l,e.jsx("p",{className:`font-black ${n?"text-white":"text-black"} text-lg md:text-2xl`,children:a}),e.jsx("p",{className:`${n?"text-gray-300":"text-black"} font-bold text-xs md:text-base`,children:t})]})}function O({username:l,roast:a,darkMode:t,copied:n,copyToClipboard:u,container:_,item:g,profileData:x,lang:h}){const w=C.useRef(null),[$,f]=C.useState(!1),S=async()=>{if(!(!w.current||!a))try{f(!0);const i=document.createElement("div");i.style.padding="20px",i.style.backgroundColor=t?"#18181b":"#FF5F1F",i.style.borderRadius="8px",i.style.maxWidth="600px";const d=document.createElement("div");d.style.display="flex",d.style.alignItems="center",d.style.marginBottom="15px",d.style.padding="10px",d.style.backgroundColor=t?"rgba(0,0,0,0.3)":"rgba(255,255,255,0.3)",d.style.borderRadius="8px";const o=document.createElement("img");o.src=(x==null?void 0:x.profilePicUrl)||"/placeholder.svg?height=64&width=64",o.alt=l,o.style.width="64px",o.style.height="64px",o.style.borderRadius="8px",o.style.border="3px solid #000000",o.style.objectFit="cover";const y=document.createElement("div");y.style.marginLeft="15px";const p=document.createElement("div");if(p.innerText=`@${l}`,p.style.fontWeight="bold",p.style.fontSize="18px",p.style.color=t?"#ffffff":"#000000",x!=null&&x.fullName){const r=document.createElement("div");r.innerText=x.fullName,r.style.fontSize="14px",r.style.color=t?"#cccccc":"#333333",y.appendChild(p),y.appendChild(r)}else y.appendChild(p);d.appendChild(o),d.appendChild(y);const b=document.createElement("div");b.style.backgroundColor=t?"#27272a":"#ffffff",b.style.borderRadius="8px",b.style.padding="20px",b.style.border="3px solid #000000",await(async()=>{for(const r of a.split(`
`))if(r.trim()){const c=document.createElement("p");c.innerHTML=await R(r),c.style.color=t?"#ffffff":"#000000",c.style.fontSize="16px",c.style.fontWeight="bold",c.style.marginBottom="12px",c.style.paddingLeft="16px",b.appendChild(c)}})();const m=document.createElement("div");m.style.marginTop="15px",m.style.textAlign="center",m.style.fontWeight="bold",m.style.color=t?"#ffffff":"#000000",m.style.opacity="0.7",m.innerText="RoastX by kiuyha",i.appendChild(d),i.appendChild(b),i.appendChild(m),document.body.appendChild(i);const k=await F(i,{backgroundColor:t?"#18181b":"#FF5F1F",logging:!1,useCORS:!0,allowTaint:!0});document.body.removeChild(i),k.toBlob(r=>{if(!r){console.error("Failed to create blob");return}const c=URL.createObjectURL(r),j=document.createElement("a");j.download=`roastx-${l}-${Date.now()}.png`,j.href=c,j.click(),URL.revokeObjectURL(c),f(!1)},"image/png")}catch(i){console.error("Error capturing roast:",i),f(!1)}};return e.jsx(s.div,{className:`lg:col-span-3 ${t?"bg-orange-600":"bg-orange-400"} border-3 md:border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden`,initial:{x:100,opacity:0},animate:{x:0,opacity:1,transition:{delay:.3}},whileHover:{y:-5,boxShadow:"4px 9px 0px 0px rgba(0,0,0,1)"},children:e.jsxs("div",{className:"p-4 md:p-6",children:[e.jsxs("h2",{className:`text-xl md:text-2xl font-black mb-4 md:mb-6 ${t?"text-white":"text-black"} flex items-center gap-2 md:gap-3 border-b-3 md:border-b-4 border-black pb-2 md:pb-3`,children:[e.jsx(L,{className:`w-5 h-5 md:w-6 md:h-6 ${t?"text-yellow-300":"text-red-600"}`}),h=="en"?"Result":"Hasil Roast"]}),e.jsx(s.div,{className:`${t?"bg-zinc-800":"bg-white"} border-3 md:border-4 border-black rounded-md p-3 md:p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 md:mb-6`,initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},ref:w,children:a?e.jsx(s.div,{variants:_,initial:"hidden",animate:"show",className:`${t?"text-white":"text-black"} space-y-3 md:space-y-4 text-base md:text-lg font-bold`,children:a.split(`
`).map((i,d)=>e.jsx(s.div,{variants:g,className:"relative",children:e.jsx("p",{className:`${t?"text-white":"text-black"} text-base md:text-lg font-bold pl-4 md:pl-6`,dangerouslySetInnerHTML:{__html:R(i)}})},d))}):e.jsx("p",{className:`${t?"text-white":"text-black"} text-base md:text-lg font-bold`,children:h=="en"?"No roast generated yet.":"Belum ada roast yang dibuat."})}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4",children:[e.jsxs(s.div,{className:"flex items-center gap-2",initial:{opacity:0},animate:{opacity:1},transition:{delay:1.2},children:[e.jsx(s.div,{animate:{rotate:[0,10,-10,10,0]},transition:{duration:2,repeat:Number.POSITIVE_INFINITY},children:e.jsx(U,{className:`w-5 h-5 md:w-6 md:h-6 ${t?"text-yellow-300":"text-yellow-500"}`})}),e.jsx("p",{className:`${t?"text-white":"text-black"} font-bold text-sm md:text-base`,children:h=="en"?"Created by AI, don't get mad ( ˶ˆᗜˆ˵ )":"Dibuat oleh AI, jadi jangan baper yak ( ˶ˆᗜˆ˵ )"})]}),e.jsxs("div",{className:"flex gap-2 md:gap-3",children:[e.jsx(s.button,{onClick:u,className:`flex items-center gap-1 md:gap-2 ${t?"text-white bg-zinc-800":"text-black bg-white"} font-bold px-3 md:px-4 py-2 md:py-3 rounded-md border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base`,whileHover:{x:-2,y:-2,boxShadow:"5px 5px 0px 0px rgba(0,0,0,1)"},whileTap:{x:0,y:0,boxShadow:"3px 3px 0px 0px rgba(0,0,0,1)"},initial:{opacity:0},animate:{opacity:1},transition:{delay:1.3},children:n?e.jsxs(e.Fragment,{children:[e.jsx(P,{className:"w-4 h-4 md:w-5 md:h-5"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(z,{className:"w-4 h-4 md:w-5 md:h-5"}),"Copy"]})}),e.jsxs(s.button,{onClick:S,disabled:$||!a,className:`flex items-center gap-1 md:gap-2 ${t?"text-white bg-cyan-600":"text-black bg-cyan-400"} font-bold px-3 md:px-4 py-2 md:py-3 rounded-md border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base disabled:opacity-50`,whileHover:{x:-2,y:-2,boxShadow:"5px 5px 0px 0px rgba(0,0,0,1)"},whileTap:{x:0,y:0,boxShadow:"3px 3px 0px 0px rgba(0,0,0,1)"},initial:{opacity:0},animate:{opacity:1},transition:{delay:1.35},children:[e.jsx(W,{className:"w-4 h-4 md:w-5 md:h-5"}),$?"Saving...":"Save Image"]})]})]})]})})}export{J as R};
