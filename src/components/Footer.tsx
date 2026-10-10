import {Link} from 'react-router-dom';
import {Facebook, Instagram, Phone} from 'lucide-react';
import Logo from './Logo';
import {services} from '@/data/services';

function TikTok(){return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M16.6 2h-3.3v13.3a3 3 0 1 1-2.6-3V8.9a6.4 6.4 0 1 0 6 6.4V8.5a8.4 8.4 0 0 0 4.9 1.6V6.8A5 5 0 0 1 16.6 2Z"/></svg>}
function WhatsApp(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-6 h-6" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.8A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.3 7.5c-.8.3-.8 1.3-.5 2.2.8 2.2 2.6 4.1 4.8 4.9 1 .4 2 .3 2.5-.5l.4-1.1-2.3-1.1-.9 1c-1.4-.6-2.5-1.7-3-3l.8-.8-1-2Z"/></svg>}
const socialLinks=[
 {label:'Facebook',url:'https://www.facebook.com/profile.php?id=61584528872324',icon:<Facebook size={22}/>},
 {label:'Instagram',url:'https://www.instagram.com/jirehcleaningottawa/',icon:<Instagram size={22}/>},
 {label:'TikTok',url:'https://www.tiktok.com/@jirehcleaning0?lang=en',icon:<TikTok/>},
 {label:'WhatsApp',url:'https://wa.me/13435511899',icon:<WhatsApp/>},
];
export default function Footer(){return <footer className="bg-primary text-white py-16"><div className="container-custom section-padding">
 <div className="grid lg:grid-cols-[minmax(240px,1fr)_140px_minmax(0,2fr)] gap-6 xl:gap-8 mb-14">
  <section><Logo isDark/><p className="text-white/75 text-base leading-7 mt-6">Professional cleaning services you can trust.<br/><span className="inline-block">There's clean, and there's Jireh clean.</span></p><nav aria-label="Social media" className="flex gap-3 mt-6 mb-4">{socialLinks.map(s=><a key={s.label} aria-label={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-tertiary">{s.icon}</a>)}</nav><a href="tel:+13435511899" className="inline-flex items-center gap-3 border border-tertiary text-tertiary rounded-full px-5 py-3 font-semibold"><Phone size={20}/>Call (343) 551-1899</a></section>
  <section><h2 className="text-sm uppercase tracking-widest text-tertiary mb-6">Helpful Links</h2><nav className="flex flex-col gap-5"><a href="/#about">About Jireh</a><a href="/#faq">FAQs</a><a href="/#work">Why Choose Jireh</a><Link to="/quote">Free Estimates</Link></nav></section>
  <section><h2 className="text-sm uppercase tracking-widest text-tertiary mb-6">Services</h2><ul className="grid sm:grid-cols-2 lg:grid-cols-[max-content_max-content] gap-x-6 xl:gap-x-8 gap-y-5">{services.map(s=><li key={s.slug}><Link className="hover:underline lg:whitespace-nowrap" to={'/services/'+s.slug}>{s.title}</Link></li>)}</ul></section>
 </div>
 <section className="pb-12"><h2 className="text-sm uppercase tracking-widest text-tertiary mb-6">Areas We Serve</h2><ul className="flex flex-wrap gap-3">{['Ottawa','Kanata','Nepean','Barrhaven','Orléans','Gloucester','Stittsville','Gatineau','Wendover','Vanier','Carleton Place'].map(city=><li key={city} className="rounded-full border border-white/60 px-4 py-2">{city}</li>)}</ul></section><p className="border-t border-white/30 pt-8 text-white/80 text-sm">© {new Date().getFullYear()} Jireh Cleaning. All rights reserved.</p></div></footer>}
