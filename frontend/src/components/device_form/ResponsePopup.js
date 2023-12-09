import React, {useEffect, useState} from "react";

function ResponsePopup(props) {
    const { trigger, setTrigger, message } = props;

    return trigger ? (
        <div className="message-popup">
            {/*<div className='component-form'>*/}
                {message}
                {/*<button className="close-btn" onClick={() => setTrigger(false)}>*/}
                {/*    OK*/}
                {/*</button>*/}
            {/*</div>*/}
        </div>
    ) : null;
}

export default ResponsePopup
