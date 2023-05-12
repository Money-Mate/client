import React from 'react';
import PiggyBank from '../assets/piggy-bank.svg';

function LoadingSymbol() {
  return (
    <div className="flex items-center justify-center h-screen bg-mm-foreground m-2">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
        <img src={PiggyBank} alt="Your SVG" className="mt-4" />
      </div>
    </div>
  );
}

export default LoadingSymbol;