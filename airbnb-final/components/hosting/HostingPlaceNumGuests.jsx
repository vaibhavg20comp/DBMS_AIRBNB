import React, { useState,useEffect } from 'react'
import AppCounter from '../AppCounter'

function HostingPlaceNumGuests({setResponse}) {
  const [guests,setGuests] = useState(4);
  const [beds,setBeds] = useState(1);
  const [bedrooms,setBedrooms] = useState(1);
  const [bathrooms,setBathrooms] = useState(1);
  
  useEffect(() => {
    setResponse({guests:guests,beds:beds,bedrooms:bedrooms,bathrooms:bathrooms});
  }, [guests,beds,bedrooms,bathrooms]);
  
  return (
    <div className='grid grid-cols-1 absolute top-[11rem] left-[7rem] w-[25rem] gap-y-3'>
    <div className="flex py-4 w-25 justify-between ">
      <h2 className="font-bold">Guests</h2>
      <AppCounter
        value={guests}
        maxValue={16}
        onIncrease={() =>
          setGuests((n)=>(n+1)<=16?n+1:16)
        }
        onDescrease={() =>
          setGuests((n)=>(n-1)>=0?n-1:0)
        }
      />
    </div>
    <div className="flex py-4 max-w-[25rem] justify-between ">
      <h2 className="font-bold">Beds</h2>
      <AppCounter
        value={beds}
        maxValue={16}
        onIncrease={() =>
          setBeds((n)=>(n+1)<=16?n+1:16)
        }
        onDescrease={() =>
          setBeds((n)=>(n-1)>=1?n-1:1)
        }
      />
    </div>
    <div className="flex py-4 max-w-[25rem] justify-between ">
      <h2 className="font-bold">Bedrooms</h2>
      <AppCounter
        value={bedrooms}
        maxValue={16}
        onIncrease={() =>
          setBedrooms((n)=>(n+1)<=16?n+1:16)
        }
        onDescrease={() =>
          setBedrooms((n)=>(n-1)>=1?n-1:1)
        }
      />
    </div>
    <div className="flex py-4 max-w-[25rem] justify-between ">
      <h2 className="font-bold">Bathrooms</h2>
      <AppCounter
        value={bathrooms}
        maxValue={16}
        onIncrease={() =>
          setBathrooms((n)=>(n+1)<=16?n+1:16)
        }
        onDescrease={() =>
          setBathrooms((n)=>(n-1)>=0?n-1:0)
        }
      />
    </div>
  </div>
  )
}

export default HostingPlaceNumGuests