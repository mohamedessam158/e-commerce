import React from 'react'


export default function Category({item}) {
  return (
    <>
    <div key={item._id} className="col-sm-12 col-md-4">
          <div className='product cursor-pointer rounded-4 p-3'>
            
            <img src={item.image} alt="" className='w-100'  height={"400px"}/>
            <span className='text-main'>{item.slug}</span>
            <h5 className='my-2 fw-bold'>{item.name}</h5>
            
          </div>
        </div>
    </>
  )
}
