import Link from "next/link";

export interface FunFact {
  id: string,
  authorId: string,
  content: string,
  submissionTime: Date
  author: {
    id: string,
    firstName: string,
    lastName: string
  }
}

export const FunFactBlock = (funFact: FunFact) => {

  return (
    <div className="gap-4 md:gap-8">
      <Link
        className="flex max-w-3xl flex-col gap-4 rounded-xl p-4 border-2 border-[#9b16f3bb] dark:bg-[#9b16f3bb] dark:border-none"
        href="https://create.t3.gg/en/usage/first-steps"
      >
        <p className="text-md italic">Fun fact do dia:</p>
        <div className="text-lg">
          {funFact.content}
        </div>
        <div className="text-md text-right italic">
          {funFact.author.lastName}, {funFact.author.firstName}
        </div>
      </Link>
    </div>
  )
};
