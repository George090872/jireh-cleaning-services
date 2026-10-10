import Logo from "./Logo";
import { services } from "@/data/services";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
export default function Header({isDark=false}:{isDark?:boolean}) {
 const [mobile,setMobile]=useState(false),[expanded,setExpanded]=useState(false);
 const ink=isDark?'text-white':'text-primary';
 return <header className={`sticky top-0 z-50 shadow-sm ${isDark?'bg-primary':'bg-white'} ${ink}`} onKeyDown={e=>{if(e.key==='Escape'){setExpanded(false);setMobile(false)}}}>
 <div className="container-custom section-padding"><div className="flex items-center justify-between gap-5 min-h-20">
 <Link to="/" aria-label="Jireh Cleaning home"><Logo isDark={isDark}/></Link>
 <button className="xl:hidden p-2" aria-label="Toggle navigation" aria-expanded={mobile} onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
 <nav aria-label="Main navigation" className={`${mobile?'flex':'hidden'} xl:flex xl:self-stretch flex-col xl:flex-row gap-6 xl:items-center absolute xl:static top-full left-0 right-0 p-6 xl:p-0 ${isDark?'bg-primary':'bg-white'}`}>
 
 <div className="xl:flex xl:items-center xl:self-stretch" onMouseEnter={()=>{if(window.matchMedia("(hover: hover) and (min-width: 1280px)").matches)setExpanded(true)}} onMouseLeave={()=>setExpanded(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setExpanded(false)}}><button aria-expanded={expanded} aria-controls="services-menu" onClick={()=>setExpanded(!expanded)} className="flex items-center gap-1">Services <ChevronDown size={16}/></button> {expanded&&<div id="services-menu" className="xl:absolute xl:top-full xl:left-1/2 xl:-translate-x-1/2 w-full xl:max-w-[680px] bg-white text-primary p-6 rounded-2xl shadow-xl max-h-[65vh] overflow-y-auto"><div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">{services.map(s=><Link className="px-3 py-4 rounded hover:bg-tertiary/20 leading-6" key={s.slug} to={'/services/'+s.slug} onClick={()=>{setExpanded(false);setMobile(false)}}>{s.title}</Link>)}</div></div>}</div>
 <a href="/#work" onClick={()=>setMobile(false)}>Why Choose Jireh</a><a href="/#about" onClick={()=>setMobile(false)}>About</a><a href="/#faq" onClick={()=>setMobile(false)}>FAQ</a>
 <a href="tel:+13435511899" className="flex items-center gap-2"><Phone size={16}/>(343) 551-1899</a>
 <Link to="/quote" onClick={()=>{setMobile(false);setExpanded(false)}} className="rounded-full bg-tertiary text-primary font-semibold px-5 py-3 hover:bg-tertiary/90">Request a Free Estimate</Link>

 </nav></div></div></header>;
}
