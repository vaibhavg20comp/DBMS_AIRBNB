import React,{useState} from 'react'

function HouseRules({items,setResponse}) {
  const [checked,setChecked] =useState([]);
  return (
    <div className='grid gap-4 m-[3rem] w-[35rem] md:grid-cols-3'>
      {
        items?.map((item,index)=>(
          <div key={index} className='w-[11rem] h-[9rem]'>
                  <input type="checkbox" id={item.id} className='hidden peer'
                  onChange={(e)=>{
                    if(e.target.checked){
                      setChecked([...checked,item.name]);
                    }else{
                      setChecked(
                        checked.filter((p)=>p.name!==item.name)
                      );
                    }
                    setResponse([...checked,item.name]);
                    }}
                    value={checked}
                  />
                  <label htmlFor={item.id} className="inline-flex justify-between items-center h-full w-full text-gray-500 bg-white   border-x border-y rounded-md border-grayish cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-gray-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                    <div className="block m-auto">
                        {/* If needed svg can be put here only nothing else */}
                        <div className="flex flex-col w-full h-full text-md font-semibold">{item.name}</div>
                    </div>
                  </label>
          </div>
        ))
      }
    </div>
  )
}

export default HouseRules