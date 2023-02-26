import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { type FeatureFlag } from "../server/trpc/router/featureFlag";

export const Header = (featureFlags: FeatureFlag | undefined) => {
  const themeButton = DarkModeToggle();
  const flags = featureFlags
    ? featureFlags
    : { darkModeToggle: false, urlShortener: false };
  const [funFactListIcon, urlShortenerIcon] = GetEmoji();

  const urlShortenerBlock = flags.urlShortener ? (
    <Link href="/url_shortener">
      <div className="flex flex-col justify-center border-l-2 border-[#15162c] pl-8 dark:border-[#9b16f3bb]">
        <h1 className="text-4xl font-extrabold">{urlShortenerIcon}</h1>
      </div>
    </Link>
  ) : (
    <></>
  );

  const HomeNavigator = (
    <div className="flex gap-8">
      <Link href="/">
        <div className="grid grid-cols-2">
          <Image src="/ff.png" alt="F.F." height={48} width={48}></Image>
          <div className="flex flex-col justify-center">
            <h1 className="text-center text-4xl font-extrabold">F.F.</h1>
          </div>
        </div>
      </Link>
      <Link href="/funFacts">
        <div className="flex flex-col justify-center border-l-2 border-[#15162c] pl-8 dark:border-[#9b16f3bb]">
          <h1 className="text-4xl font-extrabold">{funFactListIcon}</h1>
        </div>
      </Link>
      {urlShortenerBlock}
    </div>
  );

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-start p-8">{HomeNavigator}</div>
      <div className="flex flex-col items-end p-8">
        {flags.darkModeToggle ? themeButton : <></>}
      </div>
    </div>
  );
};

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div></div>;
  }

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className="rounded-3xl border-2 border-[#15162c] p-2 dark:border-[#9b16f3bb]">
        <img
          src={`/${theme === "dark" ? "dark_mode" : "light_mode"}.png`}
          alt="test"
          className="h-10 w-10"
        />
      </div>
    </button>
  );
};

const GetEmoji = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return ["🙃", "📝"] as const;
  }

  const funFactList = theme === "dark" ? "😎" : "🙃";
  const urlShortener = theme === "dark" ? "🔗" : "📝";

  return [funFactList, urlShortener] as const;
};

export default Header;
