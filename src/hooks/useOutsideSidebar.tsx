import { useEffect } from 'react';

// eslint-disable-next-line
export function useOutsideSidebar(ref: any, callback: () => void) {
  useEffect(() => {
    // eslint-disable-next-line
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };

    // eslint-disable-next-line
  }, [ref, callback]);
}
