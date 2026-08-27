import React from 'react'
import logoImg from '../assets/logo.jpg'

function Logo({ width = '40px' }) {
    return (
        <img
            src={logoImg}
            alt="Logo"
            style={{ width: width, height: 'auto' }}
        />
    )
}

export default Logo