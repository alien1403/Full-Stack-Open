import '../src/index.css'
import React, {useEffect, useState} from 'react'
const Notification = ({ message, type }) => {
    if(message === null){
        return null;
    }
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        if(message !== null && type !== "test"){
            setVisible(true);

            const timeout = setTimeout(() => {
                setVisible(false)
            }, 3000);

            return () => {
                clearTimeout(timeout)
            };
        }
    }, [message, type]);

    if(!visible)
        return null

    return (
        <div className={type} >
            {message}
        </div>
    )
}

export default Notification