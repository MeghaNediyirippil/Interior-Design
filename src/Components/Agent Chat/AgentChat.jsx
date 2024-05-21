import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { listuser, message, viewmessage } from '../Services/allApis';
import './AgentChat.css';
import gifImage from '../../Assets/msgGif2.gif'

function AgentChat() {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userlist, setUserlist] = useState([]);
  const [sender, setSender] = useState(null);
  const [sendername, setSendername] = useState(null);

  const username = localStorage.getItem('username');

console.log(username);

  // useEffect(() => {
  //   // fetchMessage(sender);
  // }, []);

  useEffect(() => {
    fetchusers();
  }, []);


  const fetchusers = async () => {
    try {
      // const agentId = localStorage.getItem('agentId');
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const result = await listuser(headers);
      console.log(result.data);
      setUserlist(result.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
      setLoading(false);
    }
  };


  const fetchMessage = async (senderId, sendernames) => {
    try {
      setSender(senderId);
      setSendername(sendernames);

      // const agentId = localStorage.getItem('agentId');
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const result = await viewmessage(senderId, headers);
      console.log(result.data);
      setMessages(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };
  console.log(sendername);

  const sendMessage = async (e) => {
    e.preventDefault();
    const agentId = localStorage.getItem('agentId');
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    try {
      await message(sender, { message: messageText }, headers);
      fetchMessage(sender, sendername);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container fluid className="containser-chat">
      <Row>
        <Col md={4} className="sidebar border shadow rounded" style={{ background: "#1F272A" }}>
          <h3>User Name</h3>
          {<div className="user-list">
            {userlist.map((user, index) => (
              <div key={index} className={`user ${user.type || ''}`}>
                <div className='first-letter'>{user.username[0]}</div>
                <button onClick={() => fetchMessage(user?.id, user?.username)} className='username-button'>{user.username}</button>
              </div>
            ))}

          </div>

          }


        </Col>
        <Col md={8} className="chat-container border shadow rounded">
          {sender ? <div className='users'>
            <div className='first-letter'>{sendername[0]}</div>
            <div className='username-name'>{sendername}</div>
          </div> : (<>
            <img src={gifImage} alt="" className='msg-gif' />
          </>)}

          {sender ?
            <div style={{ height: '450px' }} className="messages">
              {loading ? (
                <></>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type} ${msg.receiver_username === username ? "" : "receiver"} receiver-msg `}>
                    <div className={`name-center ${msg.receiver_username === username ? "" : "reverse"}`}>
                      <p className='msg-first-letter me-2'>{msg.sender_username[0]}</p>
                      <p className='me-2 m-0 msgmsg'>{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div> : <></>}
          {/* Chat input form */}
          {sender ?
            <div style={{ display: 'flex', alignItems: 'center',margin:'10px' }}>
              <Form onSubmit={sendMessage} style={{ flex: '1' }}>
                <Form.Group controlId="formChat" style={{ marginBottom: '0' }}>
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className='mb-2'
                  />
                </Form.Group>
              </Form>
              <Button variant="primary" type="submit" className='send-btn mb-2' onClick={sendMessage}>
                <i className="fas fa-paper-plane"></i>
              </Button>
            </div>

            : <></>}
        </Col>
      </Row>
    </Container>
  )
}

export default AgentChat;
