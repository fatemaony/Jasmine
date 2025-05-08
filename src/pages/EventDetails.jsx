import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiArrowLeft,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
    notes: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((event) => event.id === params.id);
        setEvent(found);
        const saved = localStorage.getItem(`reservation_${params.id}`);
        if (saved) setIsReserved(true);
      });
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`reservation_${params.id}`, JSON.stringify(formData));
    setIsReserved(true);
    toast.success("Reservation successful!");
  };

  const handleCancelReservation = () => {
    localStorage.removeItem(`reservation_${params.id}`);
    setIsReserved(false);
    toast.info("Reservation cancelled.");
  };

  if (!event) return null;

  return (
    <div className="w-full min-h-screen bg-base-200 px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Event Info */}
          <div className="lg:w-full">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={event.thumbnail} alt={event.name} className="w-full h-64 md:h-96 object-cover" />
              </figure>
              <div className="card-body p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="badge badge-accent text-white mb-4">
                      {event.category}
                    </div>
                    <h1 className="card-title text-2xl md:text-3xl font-bold mb-2">{event.name}</h1>
                  </div>
                  <div className="badge badge-primary text-white p-3 md:p-4 text-lg">
                    <FiDollarSign className="inline mr-1" />
                    {event.entry_fee}
                  </div>
                </div>

                <p className="text-base md:text-lg mb-6">{event.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary text-white">
                      <FiCalendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-bold">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary text-white">
                      <FiClock size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-bold">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary text-white">
                      <FiMapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-bold">{event.location}</p>
                    </div>
                  </div>
                </div>

                {isReserved && (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-center font-semibold relative">
                    ✅ Reservation Confirmed
                    <button
                      onClick={handleCancelReservation}
                      className="absolute top-1 right-2 text-lg text-red-600 hover:text-red-800 font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          {!isReserved && (
            <div className="lg:w-1/2">
              <div className="card bg-base-100 shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Reserve Your Seat</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label flex items-center mb-2">
                        <FiUser />
                        <span className="label-text ml-2">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label flex items-center mb-2">
                        <FaEnvelope />
                        <span className="label-text ml-2">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="input input-bordered w-full"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label flex items-center mb-2">
                        <FaPhone />
                        <span className="label-text ml-2">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+880 1XXXXXXXXX"
                        className="input input-bordered w-full"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label mb-2">
                        <span className="label-text">Number of Tickets</span>
                      </label>
                      <select
                        name="tickets"
                        className="select select-bordered w-full"
                        value={formData.tickets}
                        onChange={handleChange}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Ticket{num !== 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Special Requests</span>
                      </label>
                      <textarea
                        name="notes"
                        className="textarea textarea-bordered h-24"
                        placeholder="Any special requirements..."
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="btn btn-primary w-full">
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
