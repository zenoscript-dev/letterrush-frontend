import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSocketStore } from '../stores/useSocketStore';

const useRedirectOnRefresh = () => {
  const navigate = useNavigate();
  const { disconnectSocket, nickname } = useSocketStore();

  useEffect(() => {
    const isRefreshed = sessionStorage.getItem('isRefreshed');

    if (isRefreshed) {
      sessionStorage.removeItem('isRefreshed'); // Reset flag
      disconnectSocket(nickname);
      navigate('/'); // Redirect to Home
    }

    sessionStorage.setItem('isRefreshed', 'true');
  }, []);
};

export default useRedirectOnRefresh;
