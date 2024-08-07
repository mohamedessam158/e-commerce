import React from 'react'
import style from './Loading.module.css'
export default function Loading() {
  return (
    <>
 <div className='d-flex justify-content-center align-items-center'><span className={style.loader}></span></div>
    </>
  )
}
