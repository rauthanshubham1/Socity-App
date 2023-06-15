import React from 'react'
import "../componentsStyle/Inbox.css"

const Inbox = () => {
    return (
        <div className="message">
            <div className="avatar">
                <img src="avatar1.jpg" alt="Avatar" />
            </div>
            <div className="content">
                <h3>John Doe</h3>
            </div>
        </div>
    )
}

export default Inbox