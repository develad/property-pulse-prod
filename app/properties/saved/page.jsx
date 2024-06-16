'use client';

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toastError } from '@/components/Toasts';
import { useTheme } from 'next-themes';
import { FaBookmark } from 'react-icons/fa';

const SavedPropertiesPage = () => {
  const { theme } = useTheme();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks');

        if (res.status === 200) {
          const { bookmarks } = await res.json();
          setProperties(bookmarks);
        } else {
          console.log(res.statusText);
          toastError('Failed to fetch properties', theme);
        }
      } catch (error) {
        console.log(error);
        toastError('Failed to fetch properties', theme);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-3xl xl:text-4xl mb-4 text-center font-bold underline">
        Saved Properties
        <FaBookmark className="ml-2 inline-block text-3xl xl:text-4xl pb-1 xl:pb-2" />
      </h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
