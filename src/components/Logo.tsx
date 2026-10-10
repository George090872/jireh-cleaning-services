import { useId } from 'react';

const Logo = ({ isDark = false }: { isDark?: boolean }) => {
  const filterId = `logo-background-${useId().replace(/:/g, '')}`;
  return (
    <div className="relative shrink-0 w-[125px] h-8">
      <svg viewBox="80 300 630 184" width="125" height="32" role="img" aria-label="Jireh Cleaning" className="block overflow-hidden">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 -1 -1 0 2.7" result="mask" />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>
        </defs>
        <image href="/jireh-logo.png" width="802" height="732" filter={`url(#${filterId})`} style={isDark ? {filter: `url(#${filterId}) brightness(0) invert(1)`} : undefined} />
      </svg>
    </div>
  );
};

export default Logo;
