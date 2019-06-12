import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Container } from 'reactstrap';
import { ChatBox } from './ChatBox';
import { NickModal } from './NickModal';
import { SendMessageButton } from './SendMessageButton';

export function Chat() {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const [nick, setNick] = useState<string>();
    const [hubConnection, setHubConnection] = useState<HubConnection>();

    // Set the Hub Connection on mount.
    useEffect(() => {

        // Set the initial SignalR Hub Connection.
        const createHubConnection = async () => {

            // Build new Hub Connection, url is currently hard coded.
            const hubConnect = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_ENDPOINT_PATH!)
                .build();
            try {
                await hubConnect.start()
                console.log('Connection successful!')

                // Bind event handlers to the hubConnection.
                hubConnect.on('sendtoall', (nick: string, receivedMessage: string) => {
                    setMessages(m => [...m, `${nick}: ${receivedMessage}`]);
                })
                hubConnect.on('newuserconnected', (nick: string) => {
                    setMessages(m => [...m, `${nick} has connected.`]);
                })
                // **TODO**
                // hubConnection.off('userdisconnected', (nick: string) => {
                //  
                //     setMessages(m => [...m, `${nick} has disconnected.`]);
                // })
            }
            catch (err) {
                alert(err);
                console.log('Error while establishing connection: ' + { err })
            }
            setHubConnection(hubConnect);

        }

        createHubConnection();

    }, []);

    /** Send message to server with client's nickname and message. */
    function sendMessage(message: string): void {
        if (hubConnection && message !== '') {
            hubConnection
                .invoke('sendToAll', nick, message)
                .catch(err => console.error(err));

        }
    }

    return (
        <Container>
            <NickModal hubConnection={hubConnection} setNick={setNick} />
            {nick && <>
                <ChatBox messages={messages} />
                <SendMessageButton sendMessage={sendMessage} message={message} setMessage={setMessage} />
            </>}
        </Container >
    );
}