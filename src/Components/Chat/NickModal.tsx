import React, { useState } from 'react';
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from 'reactstrap';

export function NickModal(props: any) {
  const [modalOpen, setModalOpen] = useState(true);
  const [nick, setNick] = useState<string>('');

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(false);
    props.setNick(nick);
    props.hubConnection!.send('addnewuser', nick);
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