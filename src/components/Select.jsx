import React, { useId } from 'react'

function Select({
    label,
    options,
    className="",
    ...props
},ref) {
  const id = useId();   
  return (
    <div className="select-wrapper">
        {label && <label className="select-label" htmlFor={id}>{label}</label>}
       <select className={`select-field ${className}`} ref={ref} id={id} {...props}>
            {options?.map((option)=>{
                return <option key={option} value={option}>{option}</option>
            })}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)