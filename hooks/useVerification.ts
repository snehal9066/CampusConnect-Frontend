import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '@/services/api';

/**
 * Hook to manage email verification status.
 * It reads the current user's verification flag from localStorage and
 * provides a `verify` function that sends a token to the backend.
 */
const useVerification = () => {
  const [isVerified, setIsVerified] = useState(false);

  // Initialise verification status from stored user profile
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setIsVerified(!!user.verified);
      } catch (_) {}
    }
  }, []);

  /**
   * Calls the backend `/api/auth/verify` endpoint.
   * The verification token can be passed explicitly or retrieved from
   * `localStorage` (key `verificationToken`). After a successful call the
   * updated user profile is stored and the hook state is refreshed.
   */
  const verify = async (token?: string) => {
    const verificationToken = token || localStorage.getItem('verificationToken');
    if (!verificationToken) {
      console.warn('No verification token available');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/auth/verify`, {
        token: verificationToken,
      });
      const updatedUser = res.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsVerified(!!updatedUser.verified);
    } catch (err) {
      console.error('Verification request failed', err);
    }
  };

  return { isVerified, verify };
};

export default useVerification;
