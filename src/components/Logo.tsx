const Logo = ({ isDark = false }: { isDark?: boolean }) => {
  return (
    <div className="relative shrink-0 w-[160px] h-[63px]">
      <svg viewBox="0 0 1073 425" width="160" height="63" role="img" aria-label="Jireh Cleaning" className="block">
        <image href={isDark ? "/jireh-logo-white.png" : "/jireh-logo.png"} width="1073" height="425" />
      </svg>
    </div>
  );
};

export default Logo;
