import React from 'react'


// ChatBox component, which receives messages and displays them.
export function ChatBox(props: { messages: string[] }) {

    return (
        <>
            {props.messages.map((message, index) => (
                <p key={index} style={{ wordBreak: "break-all" }}>{message}</p>
            ))}
        </>
    )
}