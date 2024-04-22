// NotFound.jsx
import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <div className="max-w-lg mx-auto text-center">
          <Image
            src="/images/404.svg"
            alt="404 Error"
            width={300}
            height={300}
          />
          <h2 className="text-3xl font-semibold mt-8">Oops! Page Not Found</h2>
          <p className="text-gray-600 mt-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <a
            href="/"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
