import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='input-wrapper'>
            {label && (
                <label className='input-label' htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`input-field ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input