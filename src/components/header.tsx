import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { FeatureFlag } from '../server/trpc/router/featureFlag';

export const Header = (featureFlags: FeatureFlag | undefined) => {
  const themeButton = DarkModeToggle();
  const flags = featureFlags ? featureFlags : { darkModeToggle: false }

  return (
    <div className="p-8 flex flex-col items-end">
      {flags.darkModeToggle ? themeButton : <></>}
    </div>
  )
};

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return <div></div>
  }

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className="p-2 border-2 rounded-3xl border-[#15162c] dark:border-[#9b16f3bb]">
        <img src={`/${theme === "dark" ? "dark_mode" : "light_mode"}.png`} alt="test" className="h-10 w-10" />
      </div>
    </button>
  );
}

export default Header;
