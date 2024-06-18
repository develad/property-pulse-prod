import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { FaGithub } from 'react-icons/fa6';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-4 mt-auto">
      <div className="container max-w-7xl px-8 mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link
          href="/"
          className="mb-3 md:mb-0"
        >
          <Image
            src={logo}
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
        <div className="md:pl-64 text-gray-500 text-sm">
          <a
            href="https://github.com/develad"
            target="_blank"
            className="flex items-center"
          >
            <FaGithub className="mr-2 text-sm" />
            Elad Bar
          </a>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
