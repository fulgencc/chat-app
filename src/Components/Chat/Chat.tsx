import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Container, Modal, ModalBody, Button, ModalFooter, Label } from 'reactstrap';
import { ChatBox } from './ChatBox';
// interface IMessage {
//     nick: string | null,
//     message: string,
//     messages: [],
//     hubConnection: HubConnection
// }

export function Chat(props: any) {
    const [message, setMessage] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [nick, setNick] = useState<string>();
    const [hubConnection, sethubConnection] = useState<HubConnection>();
    const [modalOpen, setModalOpen] = useState(true);


    useEffect(() => {

        //setNick(window.prompt('Your name: ', 'John'));

        sethubConnection(
            () => {
                const s = new HubConnectionBuilder()
                    .withUrl("http://localhost:60709/chat")
                    .build();

                if (s) {
                    s.start()
                        .then(() => {
                            // setNick(window.prompt('Your name: ', 'John'));
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
    }, [modalOpen]);

    useEffect(() => {
        if (nick) {
            hubConnection!.send('AddNewUser', nick);
        }
    }, [modalOpen])

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
        <Container>
            <br />
            <Modal isOpen={modalOpen} >
                <ModalBody>
                    <Label for="nickname">Please input your nickname: </Label>
                    <input
                        id="nickname"
                        type="text"
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                </ModalFooter>
            </Modal>
            <ChatBox message={text} />
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={onEnter}
            />
            <button onClick={sendMessage}>Send It</button>
        </Container >
    );
}