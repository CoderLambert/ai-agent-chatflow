'use client';

import { useEffect } from 'react';
import remAdapter from '@/lib/remAdapter';

const RemAdapter = () => {
  useEffect(() => {
    remAdapter();
  }, []);

  return null;
};

export default RemAdapter;