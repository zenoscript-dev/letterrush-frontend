import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'LETTER RUSH';

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Only check mobile and navigate after typing effect
        checkMobile();
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const checkMobile = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /iphone|ipad|ipod|android/.test(userAgent);
    const screenWidth = window.innerWidth;
    const isMobileView = isMobileDevice && screenWidth < 1024;
    setIsMobile(isMobileView);

    if (isMobileDevice) {
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setPlatform('ios');
      } else if (/android/.test(userAgent)) {
        setPlatform('android');
      }
    }

    // Redirect to home page if not mobile
    if (!isMobileView) {
      navigate('/home');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6 bg-bg-color'>
      <h1 className='mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-color text-center'>
        {displayText}
      </h1>

      {isMobile ? (
        <div className='text-center max-w-md mx-auto'>
          <p className='mb-6 text-lg text-gray-300'>
            Please download our mobile app to play Letter Rush on your device
          </p>
          <a
            href={platform === 'ios' 
              ? 'https://apps.apple.com/app/letter-rush' // Replace with actual App Store link
              : 'https://play.google.com/store/apps/details?id=com.letterrush' // Replace with actual Play Store link
            }
            className='inline-block px-6 py-3 rounded-lg bg-primary-color text-white font-medium
              transition-all duration-300 hover:bg-primary-color/80 hover:scale-105'
          >
            Download for {platform === 'ios' ? 'iOS' : 'Android'}
          </a>
        </div>
      ) : (
        <div className='text-center max-w-md mx-auto'>
          <p className='text-lg text-gray-300'>
            Welcome to Letter Rush! Please continue to play on your desktop browser.
          </p>
        </div>
      )}
    </div>
  );
};

export default SplashPage;
