import React from 'react';
import Image from 'next/image';

const NotificationMessage = ({
  appName = "Dawn Telegram bot",
  message = "A top user has dropped a token on X. Here is your market summary.",
  timeStamp = "now",
  appIcon = "/telegram-icon.svg"
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-gray-200 bg-opacity-90 backdrop-blur rounded-[25px] p-4 max-w-lg w-full shadow-lg">
        <div className="flex items-center">
          {/* App Icon */}
          <div className="mr-3 flex-shrink-0">
            {appIcon ? (
              <Image
                src={appIcon}
                alt={`${appName} icon`}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-blue-500 flex items-center justify-center relative">
                    <div className="absolute w-6 h-6 border-4 border-blue-500 rounded-full" style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)'
                    }}></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800">{appName}</h3>
              <span className="text-gray-500 text-sm">{timeStamp}</span>
            </div>
            <p className="text-gray-700 mt-0">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMessage;