import React from 'react'
import "../componentsStyle/Inbox.css"

const Inbox = () => {
    return (
        <div class="message">
            <div class="avatar">
                <img src="avatar1.jpg" alt="Avatar" />
            </div>
            <div class="content">
                <h3>John Doe</h3>
            </div>
        </div>
    )
}

export default Inbox