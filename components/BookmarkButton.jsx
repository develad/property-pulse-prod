'use client';

import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toastSuccess, toastError } from './Toasts';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';

const BookmarkButton = ({ property }) => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toastError('You need to sign in to bookmark a property', theme);
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toastSuccess(data.message, theme);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toastError('Something went wrong', theme);
    }
  };

  if (loading) {
    return (
      <button className="animate-pulse bg-slate-500 hover:bg-slate-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        Loading ...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
