import { type NextPage } from "next";

import { FunBlock } from "../components/funBlock";

const Home: NextPage = () => {
  const date = new Date().toJSON().slice(0, 10);
  return FunBlock(date);
};

export default Home;
