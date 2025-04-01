import{r as $,j as e}from"../vendor/react-CJ2V4BqM.js";import{h as H}from"../vendor/html2canvas-BfYXEYrK.js";import{m as I}from"../vendor/marked-DK8KC6kv.js";import{c as U}from"../vendor/react-dom-BRm_IiUy.js";import{u as L,m as a}from"../vendor/framer-motion-CLzqDuJ2.js";import{U as C,C as P,B as S,L as E,I as z,H as B,F as W,S as O,b as V,c as A,D as X}from"../vendor/lucide-react-VHczbaVM.js";function te({username:l,profileData:t,roast:s,darkMode:d,copied:j,copyToClipboard:f,lang:u}){const n=$.useRef(null);L(n,{once:!0});const h={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1,delayChildren:.3}}},_={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.5}}};return e.jsxs(a.div,{className:"max-w-6xl mx-auto px-2 md:px-0",initial:{opacity:0,x:300},animate:{opacity:1,x:0},exit:{opacity:0},transition:{duration:.5},ref:n,children:[e.jsxs(a.div,{className:"text-center mb-6 md:mb-10",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.2},children:[e.jsx(a.h2,{className:`text-2xl md:text-4xl font-black ${d?"text-white":"text-black"} mb-2`,initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.3,type:"spring"},children:u=="en"?"Roast Results":"Hasil Roast"}),e.jsx(a.div,{className:"h-1.5 md:h-2 w-32 md:w-40 mx-auto bg-black rounded-full overflow-hidden",initial:{width:0},animate:{width:"8rem"},style:{width:window.innerWidth>=768?"10rem":"8rem"},transition:{delay:.4,duration:.8}})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8",children:[e.jsx(Y,{username:l,profileData:t,darkMode:d}),e.jsx(q,{username:l,roast:s,darkMode:d,copied:j,copyToClipboard:f,container:h,item:_,profileData:t,lang:u})]})]},"results")}function Y({username:l,profileData:t,darkMode:s}){return e.jsx(a.div,{className:`lg:col-span-2 ${s?"bg-lime-600":"bg-lime-400"} border-3 md:border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-fit`,initial:{x:-100,opacity:0},animate:{x:0,opacity:1,transition:{delay:.2}},whileHover:{y:-5,boxShadow:"4px 9px 0px 0px rgba(0,0,0,1)"},children:e.jsxs("div",{className:"p-4 md:p-6",children:[e.jsxs("h2",{className:`text-xl md:text-2xl font-black mb-4 md:mb-6 ${s?"text-white":"text-black"} flex items-center gap-2 md:gap-3 border-b-3 md:border-b-4 border-black pb-2 md:pb-3`,children:[e.jsx(C,{className:"w-5 h-5 md:w-6 md:h-6"}),"Profil @",l]}),e.jsxs("div",{className:"flex flex-col space-y-4 md:space-y-6 mb-4 md:mb-6",children:[t!=null&&t.profilePicUrl?e.jsxs(a.div,{className:"relative mx-auto w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",initial:{scale:0},animate:{scale:1},transition:{delay:.4,type:"spring"},whileHover:{rotate:5},children:[e.jsx("img",{src:new URL(t.profilePicUrl).searchParams.get("url")??t.profilePicUrl,alt:`${l}'s profile`,className:"w-full h-full object-cover",referrerPolicy:"no-referrer",onError:d=>{d.currentTarget.src="https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"}}),e.jsx(a.div,{className:"absolute inset-0 flex items-center justify-center bg-black/50",initial:{opacity:0},whileHover:{opacity:1},children:e.jsx(P,{className:"w-6 h-6 md:w-8 md:h-8 text-white"})})]}):e.jsx("div",{className:"mx-auto w-24 h-24 md:w-32 md:h-32 rounded-md bg-white border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center",children:e.jsx(C,{className:"w-12 h-12 md:w-16 md:h-16 text-black"})}),e.jsxs("div",{className:"text-center",children:[e.jsxs(a.div,{className:`font-black ${s?"text-white":"text-black"} text-xl md:text-3xl flex justify-center items-center gap-2`,initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},children:[e.jsxs(a.p,{children:["@",l]}),(t==null?void 0:t.isVerified)&&e.jsx(S,{className:"fill-blue-500"}),(t==null?void 0:t.isPrivate)&&e.jsx(E,{})]}),(t==null?void 0:t.fullName)&&e.jsx(a.p,{className:`${s?"text-gray-300":"text-black"} text-base md:text-xl mt-1`,initial:{opacity:0},animate:{opacity:1},transition:{delay:.6},children:t.fullName})]}),(t==null?void 0:t.biography)&&e.jsx(a.div,{className:`${s?"bg-zinc-800":"bg-white"} p-3 md:p-4 border-3 md:border-4 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},children:e.jsx("p",{className:`text-base md:text-lg ${s?"text-white":"text-black"}`,dangerouslySetInnerHTML:{__html:t.biography}})})]}),e.jsxs(a.div,{className:"grid grid-cols-3 gap-2 md:gap-4 text-center",initial:{opacity:0},animate:{opacity:1,transition:{staggerChildren:.1,delayChildren:.8}},children:[e.jsx(R,{icon:e.jsx(z,{className:`w-5 h-5 md:w-6 md:h-6 ${s?"text-white":"text-black"} mx-auto mb-1 md:mb-2`}),value:t==null?void 0:t.tweetsCount,label:"Tweets",darkMode:s}),e.jsx(R,{icon:e.jsx(C,{className:`w-5 h-5 md:w-6 md:h-6 ${s?"text-white":"text-black"} mx-auto mb-1 md:mb-2`}),value:t==null?void 0:t.followersCount,label:"Followers",darkMode:s}),e.jsx(R,{icon:e.jsx(B,{className:`w-5 h-5 md:w-6 md:h-6 ${s?"text-white":"text-black"} mx-auto mb-1 md:mb-2`}),value:t==null?void 0:t.followsCount,label:"Following",darkMode:s})]})]})})}function R({icon:l,value:t,label:s,darkMode:d}){return e.jsxs(a.div,{className:`${d?"bg-zinc-800":"bg-white"} border-3 md:border-4 border-black rounded-md p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`,initial:{y:20,opacity:0},animate:{y:0,opacity:1},whileHover:{y:-5},children:[l,e.jsx("p",{className:`font-black ${d?"text-white":"text-black"} text-lg md:text-2xl`,children:t}),e.jsx("p",{className:`${d?"text-gray-300":"text-black"} font-bold text-xs md:text-base`,children:s})]})}function q({username:l,roast:t,darkMode:s,copied:d,copyToClipboard:j,container:f,item:u,profileData:n,lang:h}){const _=$.useRef(null),[k,v]=$.useState(!1),F=async()=>{if(!(!_.current||!t))try{v(!0);const i=document.createElement("div");i.style.padding="20px",i.style.backgroundColor=s?"#18181b":"#FF5F1F",i.style.borderRadius="8px",i.style.maxWidth="600px";const c=document.createElement("div");c.style.display="flex",c.style.alignItems="center",c.style.marginBottom="15px",c.style.padding="10px",c.style.backgroundColor=s?"rgba(0,0,0,0.3)":"rgba(255,255,255,0.3)",c.style.borderRadius="8px";const m=document.createElement("img");m.src=(n==null?void 0:n.profilePicUrl)||"https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png",m.alt=l,m.style.width="64px",m.style.height="64px",m.style.borderRadius="8px",m.style.border="3px solid #000000",m.style.objectFit="cover";const y=document.createElement("div");y.style.marginLeft="15px";const o=document.createElement("div");o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.gap="4px",o.style.color=s?"#cccccc":"#333333";const g=document.createElement("div");g.innerText=`@${l}`,g.style.fontWeight="bold",g.style.fontSize="18px",g.style.color=s?"#ffffff":"#000000",o.appendChild(g);const w=document.createElement("span");if(w.style.display="flex",w.style.alignItems="center",w.style.gap="2px",o.appendChild(w),U.createRoot(w).render([(n==null?void 0:n.isVerified)&&e.jsx(S,{className:"fill-blue-500"}),(n==null?void 0:n.isPrivate)&&e.jsx(E,{})]),n!=null&&n.fullName){const x=document.createElement("div");x.innerText=n.fullName,x.style.fontSize="14px",x.style.color=s?"#cccccc":"#333333",y.appendChild(o),y.appendChild(x)}else y.appendChild(o);c.appendChild(m),c.appendChild(y);const b=document.createElement("div");b.style.backgroundColor=s?"#27272a":"#ffffff",b.style.borderRadius="8px",b.style.padding="20px",b.style.border="3px solid #000000",await(async()=>{for(const x of t.split(`
`))if(x.trim()){const r=document.createElement("p");r.innerHTML=await I(x),r.style.color=s?"#ffffff":"#000000",r.style.fontSize="16px",r.style.fontWeight="bold",r.style.marginBottom="12px",r.style.paddingLeft="16px",b.appendChild(r)}})();const p=document.createElement("div");p.style.marginTop="15px",p.style.textAlign="center",p.style.fontWeight="bold",p.style.color=s?"#ffffff":"#000000",p.style.opacity="0.7",p.innerText="RoastX by kiuyha",i.appendChild(c),i.appendChild(b),i.appendChild(p),document.body.appendChild(i);const T=await H(i,{backgroundColor:s?"#18181b":"#FF5F1F",logging:!1,useCORS:!0,allowTaint:!0});document.body.removeChild(i),T.toBlob(x=>{if(!x){console.error("Failed to create blob");return}const r=URL.createObjectURL(x),N=document.createElement("a");N.download=`roastx-${l}-${Date.now()}.png`,N.href=r,N.click(),URL.revokeObjectURL(r),v(!1)},"image/png")}catch(i){console.error("Error capturing roast:",i),v(!1)}};return e.jsx(a.div,{className:`lg:col-span-3 ${s?"bg-orange-600":"bg-orange-400"} border-3 md:border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden`,initial:{x:100,opacity:0},animate:{x:0,opacity:1,transition:{delay:.3}},whileHover:{y:-5,boxShadow:"4px 9px 0px 0px rgba(0,0,0,1)"},children:e.jsxs("div",{className:"p-4 md:p-6",children:[e.jsxs("h2",{className:`text-xl md:text-2xl font-black mb-4 md:mb-6 ${s?"text-white":"text-black"} flex items-center gap-2 md:gap-3 border-b-3 md:border-b-4 border-black pb-2 md:pb-3`,children:[e.jsx(W,{className:`w-5 h-5 md:w-6 md:h-6 ${s?"text-yellow-300":"text-red-600"}`}),h=="en"?"Result":"Hasil Roast"]}),e.jsx(a.div,{className:`${s?"bg-zinc-800":"bg-white"} border-3 md:border-4 border-black rounded-md p-3 md:p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 md:mb-6`,initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},ref:_,children:t?e.jsx(a.div,{variants:f,initial:"hidden",animate:"show",className:`${s?"text-white":"text-black"} space-y-3 md:space-y-4 text-base md:text-lg font-bold`,children:t.split(`
`).map((i,c)=>e.jsx(a.div,{variants:u,className:"relative",children:e.jsx("p",{className:`${s?"text-white":"text-black"} text-base md:text-lg font-bold pl-4 md:pl-6`,dangerouslySetInnerHTML:{__html:I(i)}})},c))}):e.jsx("p",{className:`${s?"text-white":"text-black"} text-base md:text-lg font-bold`,children:h=="en"?"No roast generated yet.":"Belum ada roast yang dibuat."})}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4",children:[e.jsxs(a.div,{className:"flex items-center gap-2",initial:{opacity:0},animate:{opacity:1},transition:{delay:1.2},children:[e.jsx(a.div,{animate:{rotate:[0,10,-10,10,0]},transition:{duration:2,repeat:Number.POSITIVE_INFINITY},children:e.jsx(O,{className:`w-5 h-5 md:w-6 md:h-6 ${s?"text-yellow-300":"text-yellow-500"}`})}),e.jsx("p",{className:`${s?"text-white":"text-black"} font-bold text-sm md:text-base`,children:h=="en"?"Created by AI, don't get mad ( ˶ˆᗜˆ˵ )":"Dibuat oleh AI, jadi jangan baper yak ( ˶ˆᗜˆ˵ )"})]}),e.jsxs("div",{className:"flex gap-2 md:gap-3",children:[e.jsx(a.button,{onClick:j,className:`flex items-center gap-1 md:gap-2 ${s?"text-white bg-zinc-800":"text-black bg-white"} font-bold px-3 md:px-4 py-2 md:py-3 rounded-md border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base`,whileHover:{x:-2,y:-2,boxShadow:"5px 5px 0px 0px rgba(0,0,0,1)"},whileTap:{x:0,y:0,boxShadow:"3px 3px 0px 0px rgba(0,0,0,1)"},initial:{opacity:0},animate:{opacity:1},transition:{delay:1.3},children:d?e.jsxs(e.Fragment,{children:[e.jsx(V,{className:"w-4 h-4 md:w-5 md:h-5"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(A,{className:"w-4 h-4 md:w-5 md:h-5"}),"Copy"]})}),e.jsxs(a.button,{onClick:F,disabled:k||!t,className:`flex items-center gap-1 md:gap-2 ${s?"text-white bg-cyan-600":"text-black bg-cyan-400"} font-bold px-3 md:px-4 py-2 md:py-3 rounded-md border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm md:text-base disabled:opacity-50`,whileHover:{x:-2,y:-2,boxShadow:"5px 5px 0px 0px rgba(0,0,0,1)"},whileTap:{x:0,y:0,boxShadow:"3px 3px 0px 0px rgba(0,0,0,1)"},initial:{opacity:0},animate:{opacity:1},transition:{delay:1.35},children:[e.jsx(X,{className:"w-4 h-4 md:w-5 md:h-5"}),k?"Saving...":"Save Image"]})]})]})]})})}export{te as R};
