'use client';
import { useState, useEffect } from 'react';
import { signIn, getProviders, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

const icons = {
  google: <FaGoogle className="mr-2" />,
};

export function MdiHomeCircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19.07 4.93C17.22 3 14.66 1.96 12 2c-2.66-.04-5.21 1-7.06 2.93C3 6.78 1.96 9.34 2 12c-.04 2.66 1 5.21 2.93 7.06C6.78 21 9.34 22.04 12 22c2.66.04 5.21-1 7.06-2.93C21 17.22 22.04 14.66 22 12c.04-2.66-1-5.22-2.93-7.07M17 12v6h-3.5v-5h-3v5H7v-6H5l7-7l7.5 7z"></path>
    </svg>
  );
}

const LoginPage = () => {
  const [session, setSession] = useState(null);
  const [providers, setProviders] = useState(null);

  const router = useRouter();

  const getSessionData = async () => {
    const sessionData = await getSession();
    if (sessionData) {
      setSession(sessionData);
      router.push('/');
    }
    const res = await getProviders();
    setProviders(res);
  };

  useEffect(() => {
    getSessionData();
  }, []);

  if (!session) {
    return (
      <div className="container mx-auto mt-16 flex flex-col items-center py-4 px-8 text-gray-800 dark:text-white">
        <h1 className="text-center mb-4 text-4xl">Welcome to PropertyPulse</h1>
        <p className="text-center mb-4 text-xl">
          Use your favorite provider to{' '}
          <span className="block">Sign-In | Register</span>
        </p>
        <MdiHomeCircle className="w-12 h-12 mb-8 fill-gray-800 dark:fill-white" />
        {providers &&
          Object.values(providers).map((provider, index) => (
            <button
              key={index}
              onClick={() => signIn(provider.id)}
              className="flex items-center dark:text-white text-gray-800 bg-blue-100 dark:bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              {icons[provider.id]}
              <span>Login or Register</span>
            </button>
          ))}
      </div>
    );
  }
};

export default LoginPage;
