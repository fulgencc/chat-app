import React, { useState } from 'react';
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from 'reactstrap';
import { HubConnection } from '@aspnet/signalr';

export interface INickModalProps {
  hubConnection: HubConnection | undefined
  setNickProp: React.Dispatch<React.SetStateAction<string | undefined>>
}

/** A modal which asks the user for a nickname. */
export function NickModal(props: INickModalProps) {
  const [modalOpen, setModalOpen] = useState(true);
  const [nick, setNick] = useState<string>('');

  // Can split this up so I pass a function instead of hubConnection, 
  // but wanted to keep all functionality within the component.
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(false);
    props.setNickProp(nick);

    if (props.hubConnection) {
      props.hubConnection.send('addnewuser', nick);
    }
    else {
      alert('Hub Connection not established.');
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      centered={true}
      onSubmit={handleModalSubmit} >
      <form>
        <ModalHeader>Please input your nickname</ModalHeader>
        <ModalBody>
          <input
            id="nickname"
            type="text"
            className="form-control"
            onChange={e => setNick(e.target.value)}
            required
            autoComplete="off"
            maxLength={15}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit">Confirm</Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}