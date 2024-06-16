'use client';

import { FaSun, FaMoon } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9">...</div>;

  if (resolvedTheme === 'dark') {
    return (
      <FaSun
        size={36}
        color="white"
        onClick={() => setTheme('light')}
        className="animate-wiggle mx-2"
      />
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <FaMoon
        size={36}
        color="white"
        onClick={() => setTheme('dark')}
        className="animate-wiggle mx-2"
      />
    );
  }
}
