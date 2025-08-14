import React from 'react'

const Image = ({src, className, alt}) => {
  return (
    <div>
      <img src= {src} alt={alt} className={className}/>
    </div>
  )
}

export default Image