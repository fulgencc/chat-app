import React, { useEffect } from 'react'


/** ChatBox component, which receives an array of string messages and displays them. */
export function ChatBox(props: { messages: string[] }) {

    useEffect(() => {

        // If a message has been received or sent, scroll to the bottom of the chat.
        const chatBox = document.getElementById('ChatBox') as HTMLElement;
        chatBox.scrollTo(0, chatBox.scrollHeight);
    }, [props.messages])

    return (
        <div id='ChatBox' style={{ height: '300px', overflowY: 'scroll' }}>
            {props.messages.map((message, index) => (
                <p key={index} style={{ wordBreak: "break-all" }}>{message}</p>
            ))}
        </div>
    )
}