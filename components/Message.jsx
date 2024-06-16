'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { toastSuccess, toastError } from './Toasts';
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';
import MessageImages from './MessageImages';

const Message = ({ message, getMessages }) => {
  const { theme } = useTheme();
  const { unreadCount, setUnreadCount } = useGlobalContext();

  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toastSuccess('Marked as Read', theme);
        } else {
          toastSuccess('Marked as New', theme);
        }
      }
    } catch (error) {
      console.log(error);
      toastError('Something went wrong', theme);
    } finally {
      getMessages();
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toastSuccess('Message Deleted', theme);
      }
    } catch (error) {
      console.log(error);
      toastError('Message was not deleted', theme);
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white dark:bg-slate-800 p-4 rounded-md shadow-md border dark:border-none border-gray-200">
      {!isRead && (
        <div className="w-fit ml-auto mb-3 bg-yellow-300 text-black px-2 py-1 rounded-md">
          New
        </div>
      )}
      <MessageImages images={message.property.images} />
      <h2 className="text-xl my-4">
        <span className="font-bold mr-2">Property Inquiry:</span>
        <Link
          href={`/properties/${message.property._id}`}
          className="underline text-blue-500 block w-fit"
        >
          {message.property.name}
        </Link>
      </h2>
      <p className="text-gray-700 dark:text-white bg-yellow-200 dark:bg-slate-700 w-fit">
        {message.body}
      </p>

      <ul className="mt-4">
        <li>
          <strong className="mr-2">Sender Name:</strong>
          {message.name}
        </li>
        <li>
          <strong className="mr-2">Reply Email: </strong>
          <a
            href={`mailto:${message.email}`}
            className="text-blue-500"
          >
            {message.email}
          </a>
        </li>
        <li>
          <strong className="mr-2">Reply Phone: </strong>
          <a
            href={`tel:${message.phone}`}
            className="text-blue-500"
          >
            {message.phone}
          </a>
        </li>
        <li>
          <strong className="mr-2">Received:</strong>
          {new Date(message.createdAt)
            .toLocaleString('en-GB', {
              timeStyle: 'short',
              dateStyle: 'medium',
            })
            .split(',')
            .join(' | ')}
        </li>
        <li className="flex items-end mt-2">
          <strong className="mr-2">Sent from Profile:</strong>
          <Image
            src={message.sender.image}
            alt="user avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="w-8 h-8 rounded-full mx-2 inline-block mb-1"
          />
          {message.sender.username}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? 'bg-slate-950' : 'bg-blue-500 text-white'
        } text-white py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
