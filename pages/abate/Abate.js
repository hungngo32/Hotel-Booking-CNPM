import React from 'react'


const Abate = () => {
    const abate=JSON.parse(localStorage.getItem('abate'))
  return (
    <div>{JSON.stringify(abate)}</div>
  )
}

export default Abate