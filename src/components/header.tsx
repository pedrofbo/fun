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
      <div className="group flex justify-center border-l-2 border-[#15162c] pl-8 font-extrabold dark:border-[#9b16f3bb]">
        <p className="hidden flex-col justify-center group-hover:flex">
          URL Shortener
        </p>
        <h1 className="text-4xl">{urlShortenerIcon}</h1>
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
        <div className="group flex justify-center border-l-2 border-[#15162c] pl-8 font-extrabold dark:border-[#9b16f3bb]">
          <p className="hidden flex-col justify-center group-hover:flex">
            Fun Facts
          </p>
          <h1 className="text-4xl">{funFactListIcon}</h1>
        </div>
      </Link>
      {urlShortenerBlock}
    </div>
  );

  const OptionsNavigator = (
    <div className="flex gap-4">
      {flags.darkModeToggle ? themeButton : <></>}
      <div className="rounded-3xl border-2 border-[#15162c] px-2 pt-2 pb-1 dark:border-none dark:bg-[#9b16f3bb]">
        <a
          href="https://github.com/pedrofbo/fun"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/github.png"
            alt="Github Source Code"
            height={48}
            width={48}
          ></Image>
        </a>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-start p-8">{HomeNavigator}</div>
      <div className="flex flex-col items-end p-8">{OptionsNavigator}</div>
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
