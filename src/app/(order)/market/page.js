import CFXsInfo from '@/app/(order)/market/_components/CFXsInfo';
import PriceList from '@/app/(order)/market/_components/PriceList';

export default function Home() {
  return (
    <div className="pt-[40px]">
      <CFXsInfo />
      <PriceList />
      {/*<Marketspace />*/}
    </div>
  );
}
