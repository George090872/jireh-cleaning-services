import CleaningReviews from '@/components/CleaningReviews';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

import Footer from "@/components/Footer";
import {CleaningAbout,CleaningWork,CleaningFAQ} from "@/components/CleaningContent";
export default function Index(){return <><Header isDark/><main><Hero/><CleaningAbout/><Services/><CleaningWork/><CleaningReviews/><CleaningFAQ/></main><Footer/></>}
