import React from 'react'
import "../componentsStyle/Inbox.css"

const Inbox = ({ name, url }) => {
    return (
        <div className="message">
            <div className="avatar">
                <img src={url} alt="Avatar" />
            </div>
            <div className="content">
                <h3>{name}</h3>
            </div>
        </div>
    )
}

export default Inbox