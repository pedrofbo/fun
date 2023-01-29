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

  return (
    <div>
      <div>The current theme is: {theme}</div>
      <div><button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Button</button></div>
      <div><button onClick={() => setTheme("dark")}>Dark Mode</button></div>
      <div><button onClick={() => setTheme("system")}>System Mode</button></div>
      {/* <div>
        <Image src={`/${theme === "dark" ? "dark_mode" : "light_mode"}.svg`} alt="test" height={50} width={50} className="fill-purple-500" />
      </div> */}
    </div>
  )
};

export default Header
