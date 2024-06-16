'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import Spinner from '@/components/Spinner';
import { toastSuccess, toastError } from '@/components/Toasts';
import { useTheme } from 'next-themes';

const ProfilePage = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this property?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        // Remove the property from state
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);
        toastSuccess('Property Deleted', theme);
      } else {
        toastError('Failed to delete property', theme);
      }
    } catch (error) {
      console.log(error);
      toastError('Failed to delete property', theme);
    }
  };

  return (
    <section className="bg-blue-50 dark:bg-transparent min-h-[84vh]">
      <div className="container max-w-5xl mx-auto md:py-24">
        <div className="bg-white dark:bg-slate-800 px-6 py-8 mb-4 shadow-xl rounded-xl m-4 md:m-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 md:ml-8 md:mr-28 mb-8 md:mb-0">
              <h1 className="text-3xl font-bold mb-4 underline">
                Your Profile
              </h1>
              <div className="mb-4">
                <Image
                  className="h-32 w-32 rounded-full"
                  src={profileImage || profileDefault}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-2/4 md:pl-4">
              <h2 className="text-3xl underline font-bold mb-4">
                Your Listings
              </h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div
                    key={property._id}
                    className="mb-10"
                  >
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        {property.location.street} {property.location.city}{' '}
                        {property.location.state}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
