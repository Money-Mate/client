import React from 'react'

function Progressbar() {
    const progressWidth = '45%';

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: `${progressWidth}` }}></div>
      </div>
    );
}

export default Progressbar