"use client"
import React from "react";
const HeroSection = ({ onTodoClick, onBookmarkClick }) => {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Welcome to Productivity Hub
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Manage your tasks and bookmarks seamlessly with our intuitive app. Get
          started by selecting an option below.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onTodoClick}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            To-Do App
          </button>
          <button
            onClick={onBookmarkClick}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Bookmark App
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
