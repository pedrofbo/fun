import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image';

export const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themeButton = (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className="p-2 border-2 rounded-3xl border-[#15162c] dark:border-[#9b16f3bb]">
        <img src={`/${theme === "dark" ? "dark_mode" : "light_mode"}.png`} alt="test" className="h-10 w-10" />
      </div>
    </button>
  );

  return (
    <div className="p-8 flex flex-col items-end">
      {themeButton}
    </div>
  )
};

export default Header
