'use client';

import React, { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import Message from '@/components/Message';
import { FaMessage } from 'react-icons/fa6';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.status === 200) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.log('Error fetching messages: ', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {}, [messages]);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="flex-1 bg-blue-50 dark:bg-[#121212] text-black dark:text-white">
      <div className="container m-auto xl:py-8 max-w-6xl">
        <div className="bg-white dark:dark:bg-[#1f2937] px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4 flex items-end">
            Your Messages
            <FaMessage className="text-3xl mx-2 inline-block" />
          </h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  getMessages={getMessages}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
