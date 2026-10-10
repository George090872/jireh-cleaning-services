import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QuoteCalculator() {
  useEffect(() => {
    const id = 'tally-embed-script';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <><Header /><main className="bg-[#f3f3f6] py-12 md:py-16 px-5">
    <div className="max-w-3xl mx-auto text-primary">
      <h1 className="text-3xl md:text-4xl text-center mb-8">Request a Free Estimate</h1>
      <section className="bg-white rounded-3xl p-4 md:p-8 shadow-sm">
        <iframe src="https://tally.so/embed/xXjrkv?alignLeft=1&hideTitle=1&dynamicHeight=1" width="100%" height="1100" frameBorder="0" marginHeight={0} marginWidth={0} title="Jireh Cleaning free estimate form" />
        <p className="text-sm text-center mt-6">Having trouble with the form? <a className="underline font-semibold" href="https://tally.so/r/xXjrkv" target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</p>
      </section>
    </div>
  </main><Footer /></>;
}

