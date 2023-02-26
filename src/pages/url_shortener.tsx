import copy from "copy-to-clipboard";
import Image from "next/image";
import { type FormEvent, useState } from "react";

import Header from "../components/header";
import { loadingBlock } from "../components/loadingBlock";
import { trpc } from "../utils/trpc";

const UrlShortenerPage = () => {
  const featureFlags = trpc.featureFlag.getFeatureFlags.useQuery();
  const defaultUrl = "https://fun.pyoh.dev";
  const [url, setShortUrl] = useState(defaultUrl);
  const urlShortener = trpc.urlShortener.shorten.useQuery({ url: url });

  const shortenUrl = (event: FormEvent) => {
    const form = event.target as HTMLFormElement;
    setShortUrl(form.url.value ? (form.url.value as string) : url);
  };

  let shortUrlBlock = (
    <div className="flex">
      <div className="max-w-fuil mt-1 rounded bg-[#3b3b3b]/10 py-4 px-10 text-[#90a3af] dark:bg-[#3b3b3b]">
        {loadingBlock}
      </div>
      <button className="mt-1 ml-2 rounded bg-[#3b3b3b]/10 p-2 dark:bg-[#3b3b3b]">
        <Image src="/copy.png" alt="copy" height={24} width={24}></Image>
      </button>
    </div>
  );
  if (urlShortener.data) {
    shortUrlBlock = (
      <div className="flex">
        <div className="max-w-fuil mt-1 rounded bg-[#3b3b3b]/10 py-2 px-10 text-[#90a3af] dark:bg-[#3b3b3b]">
          <p>{urlShortener.data.shortUrl}</p>
        </div>
        <button
          onClick={() => {
            copy(urlShortener.data.shortUrl);
          }}
          className="mt-1 ml-2 rounded bg-[#3b3b3b]/10 p-2 hover:bg-[#3b3b3b]/20 dark:bg-[#3b3b3b] dark:hover:bg-[#3b3b3b]/60"
        >
          <Image src="/copy.png" alt="copy" height={24} width={24}></Image>
        </button>
      </div>
    );
  }

  let body = (
    <div className="flex min-h-screen flex-col items-center pt-10">
      {loadingBlock}
    </div>
  );
  if (featureFlags.data && featureFlags.data.urlShortener) {
    body = (
      <div className="flex min-h-screen flex-col items-center gap-10 p-4">
        <form onSubmit={shortenUrl} method="dialog">
          <label>URL</label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder={defaultUrl}
            className="mt-1 block w-96 rounded bg-[#3b3b3b]/10 py-2 px-3 pl-8 focus:border-2 focus:border-[#9b16f3bb] focus:outline-none dark:bg-[#3b3b3b]"
          />
          <button
            type="submit"
            className="mt-3 ml-1 rounded bg-[#9b16f3bb] px-3 py-1 text-white"
          >
            Shorten
          </button>
        </form>

        <div>
          <p>Short URL</p>
          <div className="flex">{shortUrlBlock}</div>
        </div>
      </div>
    );
  } else if (featureFlags.data && !featureFlags.data.urlShortener) {
    body = (
      <div className="flex min-h-screen flex-col items-center">
        <div className="max-w-5xl">
          <h1 className="py-8 text-center text-3xl font-extrabold">
            Agora você vai dizer{" "}
            <span className="italic">
              &quot;Onde está a página do encurtador de URLs?&quot;
            </span>
          </h1>
          <Image
            src="/josephjoestar.jpg"
            alt="Next you'll say"
            height={900}
            width={1600}
          ></Image>
        </div>
        <h1 className="py-8 text-center text-3xl font-extrabold">
          Felizmente, pelo menos você tem uma plataforma inteira de Fun Facts
          para explorar
        </h1>
      </div>
    );
  }

  return (
    <>
      <main className="bg-white text-black dark:bg-[#15162c] dark:text-white">
        {Header(featureFlags.data)}
        {body}
      </main>
    </>
  );
};

export default UrlShortenerPage;
