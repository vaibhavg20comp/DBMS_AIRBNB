import React from 'react'
import { Card } from 'flowbite-react'
function HostingPlaceAmenities({items,setResponse}) {
  
  return (
    <div className='bg-indigo-800'>
      {
        items.map(item=>{
          <div className='flex bg-black'>
            <h6 className='text-normal'>
              {item.title}
            </h6>
            {
              item.amenities?.map(amenity=>{
                <Card>
                  <img src="" alt="" />
                  hello
                  <title>{amenity.name}</title>
                </Card>
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default HostingPlaceAmenities