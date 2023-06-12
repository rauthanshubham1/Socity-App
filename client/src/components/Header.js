import React from 'react'
import "../componentsStyle/Header.css"

const Header = ({ heading }) => {
    return (
        <div className='heading'>
            {heading}
        </div>
    )
}

export default Header;