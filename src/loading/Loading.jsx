import React from 'react';
//styles 
import './loading.scss';
export default function Loading() {
    let data = false
    setTimeout(()=>{
        data = true;
    },1000)
  return (
    <>
    <div className={`load-wrapper ${data?'load-stop':''}`}>
        <div className='three-body'>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    </div>
    </>
  )
}
