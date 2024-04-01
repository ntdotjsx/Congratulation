import { useState } from 'react';
import Swal from 'sweetalert2';
import mecLogo from './assets/mec.png';
import './App.css';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

function App() {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const webhookUrl = 'https://discord.com/api/webhooks/1220074728446754878/4HfmnyaK2dRNdG1Y6atmxqthwNJrJEuCigiBWZlKVhQGdleMFegBC7WrHFS4KP8o43Mv';

  const sendToDiscord = async (message, userName) => {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": "Congratulations bot",
          "avatar_url": "https://i.imgur.com/4M34hi2.png",
          "embeds": [
            {
              "author": {
                "name": userName,
              },
              "title": "Send Message",
              "description": message,
              "color": 15258703,
              "footer": {
                "text": new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
              }
            }
          ]
        })
      });

      if (response.ok) {
        console.log('Message sent to Discord!');
      } else {
        console.error('Failed to send message to Discord:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message to Discord:', error);
    }
  };  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const { value: userName } = await Swal.fire({
        title: 'Input your name',
        input: 'text',
        inputPlaceholder: 'What your name?',
        showCancelButton: true,
        confirmButtonText: 'Send',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'คุณต้องกรอกชื่อก่อนส่งข้อความ'
          }
        }
      });
  
      if (userName) {
        // เช็คคำหยาบ
        if (hasBadWords(userName)) {
          Toast.fire({
            icon: "warning",
            title: "กรุณาใช้ชื่อที่สุภาพ"
          });
          return;
        }

        // เช็คคำหยาบในข้อความ
        if (hasBadWords(inputText)) {
          Toast.fire({
            icon: "warning",
            title: "กรุณาใช้คำที่สุภาพ"
          });
          return;
        }
  
        try {
          const firestore = getFirestore();
          await addDoc(collection(firestore, 'messages'), {
            text: inputText,
            name: userName,
            timestamp: new Date().toISOString()
          });
  
          // ส่งข้อความไปยัง Discord
          const messageToDiscord = `sent: ${inputText}`;
          await sendToDiscord(messageToDiscord, userName); // ส่ง userName ด้วย
  
          setInputText('');
  
          Toast.fire({
            icon: "success",
            title: "The message has been sent."
          });
  
          setTimeout(() => {
            navigate("congrat");
          }, 3000);
  
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    }
  };

  // ฟังก์ชันตรวจสอบคำหยาบ
  const hasBadWords = (text) => {
    const badWords = ['ควย', 'เหี้ย', 'หี', 'เย็ด', 'แตด']; // เพิ่มคำหยาบตามต้องการ
    for (let word of badWords) {
      if (text.includes(word)) {
        return true;
      }
    }
    return false;
  };

  const generateRandomPosition = () => {
    const xPos = Math.random() * (window.innerWidth - 50);
    const yPos = Math.random() * (window.innerHeight - 50);
    return { left: xPos + "px", top: yPos + "px" };
  };

  const emojis = ["🎉", "🎈", "🎁", "🥳", "🌟", "❤️", "😊", "🍾", "💐", "🎊", "Congrat Naa"];

  const emojiComponents = emojis.map((emoji, index) => {
    const { left, top } = generateRandomPosition();
    return (
      <div
        key={index}
        className="emoji"
        style={{ fontSize: "24px", position: "absolute", left, top }}
      >
        {emoji}
      </div>
    );
  });

  return (
    <div>
      <div className="emoji-container" id="emoji-container">
        {emojiComponents}
      </div>
      <div>
        <a >
          <img src={mecLogo} className="logo react" alt="IT logo" />
        </a>
      </div>
      <h1 className='xxx'>Congratulations</h1>
      <div className="card">
        <input type="text" placeholder="มีอะไรอยากจะบอกเพื่อนๆไหม?" value={inputText} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <p className="read-the-docs">
        Navamintrachinee Mukdahan Industrial and Community Education College
      </p>
    </div>
  );
}

export default App;
