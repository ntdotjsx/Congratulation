import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDocumentCount = async () => {
      const firestore = getFirestore(app);
      const messagesCollection = collection(firestore, 'messages');
      const snapshot = await getDocs(messagesCollection);
      const count = snapshot.size;
      console.log('Total documents in "messages" collection:', count);
      setCount(count);
    };
    fetchDocumentCount();
  }, []);

  return (
    <p>Total documents in "messages" collection: {count}</p>
  );
}

export default Count;
