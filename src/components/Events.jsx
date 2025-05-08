import React from "react";
import { useLoaderData } from "react-router";
import EventCard from "./EventCard";

const Events = () => {
  const events = useLoaderData();
  
  return (
    <div className="container mx-auto px-4 py-20" id="events">
      <div className="text-4xl text-center my-8 mb-16 divider">Events</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Events;