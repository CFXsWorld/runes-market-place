import Image from "next/image";
import Marketspace from "@/app/components/marketspace";

export default function Home(props) {
  console.log(props);
  return (
    <>
      <Marketspace />
    </>
  );
}
