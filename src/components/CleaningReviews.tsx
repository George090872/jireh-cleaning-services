import {useEffect,useState} from 'react';
import {Star,ChevronLeft,ChevronRight} from 'lucide-react';
// Names, ratings and relative dates checked on the linked Google listing, October 3, 2026.
const reviews=[
['Idris Obajemu','7 months ago','Fantastic service. Left my apartment squeaky clean and spotless. I recommend 100 times. I sure will call again'],
['Lemuel Barango','8 months ago','Huge shoutout to Jireh Cleaning for the deep clean! I’m super picky about my Kitchen and Bathroom, and they nailed it. Professional, on time, and the house smells amazing. 10/10 would recommend if you want your weekends back!'],
['Lanre Layemi','2 months ago',"Fantastic service! I booked the deep clean package, and my whole house is spotless. Jireh was professional, thorough, and paid great attention to detail. I highly recommend them to anyone looking for a reliable cleaning service, and I'll definitely be using them again!"],
['Obi Ogbogu','2 months ago','Very professional and timely. Left my home in the hands of these guys and they did a fantastic job. I recommend!!!'],
['Atum Ra','2 months ago','The cleaning services offered are top notch! Got my apartment looking squeaky clean!'],
['Esivue Eshilama','2 months ago','Great service! I would definitely recommend to any one who needs a deep clean done.']
];
export default function CleaningReviews(){const [page,setPage]=useState(0);
 const [perPage,setPerPage]=useState(()=>window.matchMedia('(min-width: 768px)').matches?3:1);
 useEffect(()=>{
   const query=window.matchMedia('(min-width: 768px)');
   const update=()=>{setPerPage(query.matches?3:1);setPage(0)};
   query.addEventListener('change',update);
   return ()=>query.removeEventListener('change',update);
 },[]);
 const pageCount=Math.ceil(reviews.length/perPage);
 return <section className="bg-primary py-16 md:py-24 text-white"><div className="container-custom section-padding"><h2 className="text-3xl md:text-5xl mb-10 text-center">What our customers say</h2><div aria-live="polite" className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">{reviews.slice(page*perPage,page*perPage+perPage).map(([name,date,quote])=><figure key={name} className="bg-white text-primary border border-primary/20 rounded-2xl p-7 flex flex-col min-h-80"><div role="img" aria-label="5 out of 5 stars" className="flex gap-1 mb-5 text-primary">{Array.from({length:5},(_,i)=><Star key={i} size={18} fill="currentColor" aria-hidden="true"/>)}</div><blockquote className="text-base leading-7 flex-1 mb-6">“{quote}”</blockquote><figcaption><span className="font-semibold block">{name}</span><span className="text-sm text-primary/70">{date}</span></figcaption></figure>)}</div><div className="flex justify-center items-center gap-3 mt-6"><button type="button" onClick={()=>setPage(p=>(p-1+pageCount)%pageCount)} aria-label="Previous reviews" className="w-11 h-11 md:w-8 md:h-8 rounded-full border border-white/50 flex items-center justify-center"><ChevronLeft size={16}/></button><span className="text-sm" aria-label={`Review page ${page+1} of ${pageCount}`}>{page+1} / {pageCount}</span><button type="button" onClick={()=>setPage(p=>(p+1)%pageCount)} aria-label="Next reviews" className="w-11 h-11 md:w-8 md:h-8 rounded-full border border-white/50 flex items-center justify-center"><ChevronRight size={16}/></button></div></div></section>}
