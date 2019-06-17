import React, { useState } from 'react'

export interface ISendMessageButtonProps {
  sendMessage: (message: string) => Promise<void>,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export function SendMessageButton(props: ISendMessageButtonProps) {
  const [message, setMessage] = useState<string>('');

  const handleMessage = async () => {
    await props.sendMessage(message)
    setMessage('');
  }

  /** Event handler to send message when pressing "enter" */
  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleMessage();
    }

  }

  return (
    <>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={onEnter}
        maxLength={255}
      />
      <button onClick={handleMessage}>Send It</button>
    </>
  )
}