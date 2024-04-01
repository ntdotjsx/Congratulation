import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'; // Import Firebase configuration
import '../App.css'; // Import CSS for animations

function FloatingMessage({ name, text, onAnimationEnd }) {
    const [position, setPosition] = useState({ top: '0px', left: '0px' });
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false);
            onAnimationEnd();
        }, 10000); // Message disappears after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setPosition({
            top: `${Math.random() * (window.innerHeight - 50)}px`,
            left: `${Math.random() * (window.innerWidth - 200)}px`
        });
    }, []); // Run once when component mounts

    return showMessage ? (
        <div className="floating-message" style={position}>
            <p>{text} by {name}</p>
        </div>
    ) : null;
}


function Congrat() {
    const [messages, setMessages] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
          const firestore = getFirestore(app);
          const messagesCollection = collection(firestore, 'messages');
          const snapshot = await getDocs(messagesCollection);
          const messagesData = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name, // ดึงฟิลด์ name มาด้วย
              ...data
            };
          });
          setMessages(messagesData);
        };
      
        fetchMessages();
      }, []);
      

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 6) % messages.length);
        }, 10000); // Change message every 10 seconds

        return () => clearInterval(interval);
    }, [messages]);

    useEffect(() => {
        setVisibleMessages(messages.slice(index, index + 6));
    }, [index, messages]);

    const removeMessage = () => {
        setVisibleMessages((prevVisibleMessages) => {
            // Filter out the first message from visibleMessages
            return prevVisibleMessages.slice(1);
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeMessage(); // Remove the first message every 10 seconds
        }, 10000); // Remove message every 10 seconds

        return () => clearTimeout(timeout);
    }, [visibleMessages]);


    return (
        <>
            {visibleMessages.map((message, index) => (
                <FloatingMessage
                    key={index}
                    name={message.name} // เพิ่มการส่ง props name
                    text={message.text}
                    onAnimationEnd={removeMessage}
                />
            ))}

            <h2 className='typewriter'>ขอแสดงความยินดีกับความสำเร็จอีกขั้นที่สำคัญของชีวิตคุณ Congratulations!</h2>

            <p className="read-the-docs">
                Navamintrachinee Mukdahan Industrial and Community Education College
            </p>
        </>
    );
}

export default Congrat;
