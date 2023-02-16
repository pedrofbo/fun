export interface FunFact {
  id: string;
  authorId: string;
  content: string;
  submissionTime: Date;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  externalLinks: {
    id: string;
    url: string;
  }[];
}

export const FunFactBlock = (funFact: FunFact) => {
  const references = funFact.externalLinks.map((link, index) => {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="hover:text-[#3366cc]"
        key={link.url}
      >
        {index + 1}
        {"         "}
      </a>
    );
  });
  const referenceBlock =
    funFact.externalLinks.length > 0 ? (
      <div className="text-md italic">Referências: {references}</div>
    ) : (
      <></>
    );

  return (
    <div className="gap-4 md:gap-8">
      <div className="flex max-w-3xl flex-col gap-4 rounded-xl border-2 border-[#9b16f3bb] p-4 dark:border-none dark:bg-[#9b16f3bb]">
        <p className="text-md italic">Fun fact do dia:</p>
        <div className="text-lg">{funFact.content}</div>
        <div className="text-md text-right italic">
          {funFact.author.lastName}, {funFact.author.firstName}
        </div>
        {referenceBlock}
      </div>
    </div>
  );
};
