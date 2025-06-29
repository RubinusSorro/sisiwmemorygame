import { useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onSplashEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashEnd();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onSplashEnd]);

  return (
    <div className="splash-screen">
      <h1>Sisiw Memory Game</h1>
      <p>Get ready to match the sisiws!</p>
      <div className="loading-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
}
