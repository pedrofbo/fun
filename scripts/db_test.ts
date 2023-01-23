import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const insertDB = (
  content: string,
  author: { firstName: string, lastName: string },
  link: string
) => {
  return prisma.funFact.create({
    data: {
      content: content,
      author: {
        create: {
          firstName: author.firstName,
          lastName: author.lastName
        }
      },
      externalLinks: {
        create: {
          url: link
        }
      }
    }
  });
};

const result = insertDB(
  "This is a long fun fact. A fun fact so long that I hope it spans multiple lines. One new fun fact every day, that's the goal. I don't think I can achieve it alone, but that is why I have a team of people that can help me do so.",
  { firstName: "Bob", lastName: "Fun" },
  "https://www.youtube.com/watch?v=wONI34aquiU"
).then(r => console.log(r))
console.log(result)
