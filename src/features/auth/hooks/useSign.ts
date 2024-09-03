'use client';

import { useState, useCallback } from 'react';
import { AuthFetchStatus } from '../model/AuthFetchStatus';
import { AuthProvider } from '../model/AuthProvider';
import { handleSignOut } from '../lib/handleSignOut';
import { handleSignIn } from '../lib/handleSignIn';

export function useSign() {
  const [status, setStatus] = useState<AuthFetchStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (provider: AuthProvider) => {
    setStatus('loading');
    setError(null);

    try {
      await handleSignIn(provider);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'unknown error');
    }
  }, []);

  const signOut = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      await handleSignOut();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'unknown error');
    }
  }, []);

  const resetStatus = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return { status, error, signIn, signOut, resetStatus };
}
