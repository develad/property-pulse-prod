import { useState, useEffect } from 'react';
export const Map = (props) => {
  const [Client, setClient] = useState();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== 'undefined') {
        const newClient = (await import('./PropertyMap')).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  if (typeof global.window === 'undefined' || !Client) {
    return null;
  }

  return Client ? <Client {...props} /> : null;
};
