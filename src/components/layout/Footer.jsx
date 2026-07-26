import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-teal-50/50 dark:bg-slate-900 border-t border-teal-200/50 dark:border-teal-800/60 py-6 text-center mt-12 transition-colors duration-300">
      <p className="text-sm dark:text-slate-400">
        &copy; {currentYear} Himanshu Kumar. All rights reserved.
      </p>
    </footer>
  );
}
