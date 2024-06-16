'use client';
import { useRouter } from 'next/navigation';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <section className="bg-blue-50 dark:bg-gray-900 min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white dark:bg-gray-800 px-6 py-24 mb-4 shadow-md rounded-2xl border dark:border-black m-4 md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="fas fa-exclamation-triangle fa-5x text-8xl dark:text-white text-gray-900" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
            <p className="text-gray-500 dark:text-white text-xl mb-10">
              The page you are looking for does not exist.
            </p>
            <button
              onClick={() => router.push('/')}
              className="flex items-center mx-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
            >
              <FaHome className="mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default NotFoundPage;
