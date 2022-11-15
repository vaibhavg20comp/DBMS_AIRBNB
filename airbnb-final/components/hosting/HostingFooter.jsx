import {Button,Progress} from 'flowbite-react' ;
import Link from 'next/link';


function HostingFooter({id,objlen,onclick,onclickBack,buttondisable}) {
  return (
    <div className="fixed  float-right w-1/2  inset-x-1/2 bottom-0 bg-white h-20 ">
    <Progress
      progress={10 + 9*id}
      size="sm"
      color="red"
    />
      <div className='flex items-center justify-between  my-[1rem] m-10'>
      <span className='text-xl font-bold text-gray-500 dark:text-white'>
      <Link className='underline font-extrabold' href={id===0?'/':'#'} onClick={onclickBack}>Back</Link>
      </span>
      <span className=''>
        <Button onClick={onclick} disabled={buttondisable}  color="red" className='w-[6rem] bg-black text-white font-extrabold'>
            Next
        </Button>
      </span>
      </div>
  </div>
  )
}

export default HostingFooter