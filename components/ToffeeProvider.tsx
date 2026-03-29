'use client';

import { useEffect, useRef } from 'react';
import { init } from '@toffee-at/sdk';

export default function ToffeeProvider() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const toffee = init({
      apiKey: process.env.NEXT_PUBLIC_TOFFEE_API_KEY!,
      siteId: process.env.NEXT_PUBLIC_TOFFEE_SITE_ID!,
      endpoint: 'https://api.toffee.at/api/v1/events',
    });

    return () => {
      toffee.destroy();
      initialized.current = false;
    };
  }, []);

  return null;
}
