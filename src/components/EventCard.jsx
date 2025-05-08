import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const EventCard = ({ event }) => {
  const { user } = useAuth();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48 overflow-hidden">
        <img
          src={event.thumbnail}
          alt="eventPic"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold line-clamp-1">
          {event.name}
        </h2>
        <p className="text-gray-400 line-clamp-2 mb-4">{event.description}</p>
        <div className="card-actions justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{event.date}</span>
          </div>
          <Link to={user ? `/event-details/${event.id}` : "/login"  }>
            <button className="btn btn-primary btn-sm md:btn-md">
              View more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
