import Marketspace from "@/app/components/marketspace";

export default function Home() {
  return (
    <>
      <div className="text-xs mt-2 text-center text-pink-600">
        Due to asynchronous data indexing, there may be instances where the list data is not updated in time after the transaction is completed. Please be
        patient and wait for the update.
      </div>
      <Marketspace />
    </>
  );
}
