import { type NextPage } from "next";
import { useRouter } from "next/router";

import { FunBlock } from "../../components/funBlock";

const FunFactPage: NextPage = () => {
  const router = useRouter();
  const { date } = router.query;

  return FunBlock(date as string);
};

export default FunFactPage;
