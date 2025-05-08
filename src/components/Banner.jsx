import React from "react";
import { useLoaderData } from "react-router";

const Banner = () => {
  const events = useLoaderData();
  const selectedEvents = events.slice(0, 4);

  return (
    <div className="px-4 md:px-10 lg:px-40 py-8">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
        <div className="carousel w-full">
          {selectedEvents.map((event, index) => (
            <div
              key={event.id}
              id={`slide${event.id}`}
              className="carousel-item relative w-full"
            >
              {/* Background Image with overlay */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                <img
                  src={event.thumbnail}
                  className="absolute w-full h-full object-cover"
                  alt={event.name}
                />
                <div className="absolute inset-0 bg-black opacity-70"></div>
              </div>

              {/* Event Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 sm:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
                  {event.name}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-8 max-w-md sm:max-w-xl md:max-w-2xl drop-shadow-md">
                  {event.description}
                </p>
                <button className="bg-[#4c00b0] text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                  View Details
                </button>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute flex justify-between w-full px-4 top-1/2 -translate-y-1/2">
                <a
                  href={`#slide${
                    index === 0
                      ? selectedEvents[selectedEvents.length - 1].id
                      : selectedEvents[index - 1].id
                  }`}
                  className="bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </a>
                <a
                  href={`#slide${
                    index === selectedEvents.length - 1
                      ? selectedEvents[0].id
                      : selectedEvents[index + 1].id
                  }`}
                  className="bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;