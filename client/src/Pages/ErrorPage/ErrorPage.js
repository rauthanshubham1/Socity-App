import React from 'react'
import "./ErrorPage.css"
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <div className='errorPageContainer'>
            <img width="100%" height="100%" src="https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png" alt="" />
            <button className='button-9' onClick={handleReturn}>Return to previous page</button>
        </div>
    )
}

export default ErrorPage