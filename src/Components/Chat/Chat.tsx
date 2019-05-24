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

        //setNick(window.prompt('Your name: ', 'John'));

        sethubConnection(
            () => {
                const s = new HubConnectionBuilder()
                    .withUrl("http://localhost:53889/chat")
                    .build();

                if (s) {
                    s.start()
                        .then(() => {
                            setNick(window.prompt('Your name: ', 'John'));
                            console.log('Connection successful!')
                        })
                        .catch(err => console.log('Error while establishing connection: ' + { err }));

                    s.on('sendtoall', (nick: string, receivedMessage: string) => {
                        setText(`${nick}: ${receivedMessage}`);
                    })

                    s.on('newuserconnected', (nick: string) => {
                        setText(`${nick} has connected.`);
                    })
                    s.off('userdisconnected', (nick: string) => {
                        setText(`${nick} has disconnected.`);
                    })

                }
                return s;
            });

        // onConnected();
    }, []);

    useEffect(() => {
        if (nick) {
            hubConnection!.send('AddNewUser', nick);
        }
    }, [nick])

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

    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div>
            <br />
            <div>
                {messages.map((message, index) => (
                    <span style={{ display: 'block' }} key={index}> {message} </span>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={onEnter}
            />
            <button onClick={sendMessage}>Send It</button>
        </div >
    );
}