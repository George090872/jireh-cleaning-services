import {House, SprayCan, Package, Building2, Monitor, Brush, HeartHandshake, HardHat, Sparkles} from 'lucide-react';
import './ServiceIcon.css';

const icons = {
  'recurring-cleaning': House,
  'one-time-cleaning': SprayCan,
  'move-in-move-out-cleaning': Package,
  'apartment-condo-cleaning': Building2,
  'office-cleaning': Monitor,
  'deep-seasonal-cleaning': Brush,
  'cleaning-for-seniors': HeartHandshake,
  'post-renovation-construction-cleaning': HardHat,
};

export default function ServiceIcon({slug}: {slug: string}) {
  const Icon = icons[slug as keyof typeof icons] ?? House;
  return <span className={`service-icon service-icon--${slug}`} aria-hidden="true">
    <Icon className="service-icon__drawing" strokeWidth={1.7}/>
    <Sparkles className="service-icon__sparkle" strokeWidth={2}/>
  </span>;
}
