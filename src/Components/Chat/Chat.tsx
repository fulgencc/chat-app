import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

// interface IMessage {
//     nick: string | null,
//     message: string,
//     messages: [],
//     hubConnection: HubConnection
// }

export function Chat(props: any) {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState<string>('');
    const [nick, setNick] = useState<string | null>();
    const [hubConnection, sethubConnection] = useState<HubConnection>();

    useEffect(() => {

        setNick(window.prompt('Your name: ', 'John'));

        sethubConnection(
            () => {
                const s = new HubConnectionBuilder()
                    .withUrl("https://localhost:53889/chat")
                    .build();

                if (s) {
                    s.start().then(() => console.log('Connection started!'))
                        .catch(err => console.log('Error while establishing connection :('));
                    s.on('sendtoall', (nick: string, receivedMessage: string) => {
                        setText(`${nick} : ${receivedMessage}`);

                    })
                }
                return s;
            });

    }, []);

    useEffect(() => {
        setMessages([...messages, text]);
        setText('');

    }, [text]);

    function sendMessage(): void {
        hubConnection!
            .invoke('sendToAll', nick, message)
            .catch(err => console.error(err));

        setMessage('');
    }

    return (
        <div>
            <br />
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>Send It</button>

            <div>
                {messages.map((message, index) => (
                    <span style={{ display: 'block' }} key={index}> {message} </span>
                ))}
            </div>
        </div>
    );
}