import React from 'react'

export default function Brand({item}) {
  return (
    <>
     <div className="col-sm-12 col-md-4">
            <div className='product rounded-3 cursor-pointer p-3'>
              <img src={item.image} alt="" className='w-100' />
              <span className='text-main'>{item.slug}</span>
            <h5 className='my-2 fw-bold'>{item.name}</h5>
            </div>
          </div>
    </>
  )
}
