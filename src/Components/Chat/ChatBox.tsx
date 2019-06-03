import React, { useEffect, useState } from 'react'



export function ChatBox(props: any) {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        setMessages([...messages, props.message]);
    }, [props.message]);

    return (
        <>
                {messages.map((message, index) => (
                    <p key={index} style={{wordBreak: "break-all"}}>{message}</p>
                    // <span style={{ display: 'block' }} key={index}> {message} </span>
                ))}

        </>
    )
}