import ScrollingExample from '@/components/scrolling/ScrollingExample';

export default function Page() {

  return (
    <div className="relative w-1/2 min-w-[300px] max-w-[500px] aspect-video flex-shrink-0 flex items-center">
      <div className="relative !w-full h-0 overflow-hidden pb-[56%] rounded-md bg-no-repeat bg-[length:200px] bg-center !bottom-0 !left-0 transform-gpu">
        <ScrollingExample image={'https://nmedia.tvcf.co.kr/media/print/0000565/A000565274C0C4.jpg'}/>
      </div>
    </div>
  )
}