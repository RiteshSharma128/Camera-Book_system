



import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DateSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const camera = state?.camera;

  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  if (!camera) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-10">
        <div className="bg-yellow-400 text-black rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold">No camera selected.</h2>
          <p className="mt-2">Please go back and select a camera.</p>
        </div>
      </div>
    );
  }

  const handleProceed = () => {
    if (!dates.startDate || !dates.endDate) {
      alert("Please select start and end dates");
      return;
    }
    const diffTime = new Date(dates.endDate) - new Date(dates.startDate);
    if (diffTime < 0) {
      alert("End date must be after start date");
      return;
    }
    const totalPrice = camera.pricePerDay * (diffTime / (1000 * 60 * 60 * 24) + 1);
    navigate("/payment", {
      state: { camera, startDate: dates.startDate, endDate: dates.endDate, totalPrice },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-10">
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-yellow-300 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <h2 className="text-3xl font-extrabold mb-6 text-black text-center drop-shadow-md">
          Select Booking Dates for <span className="underline">{camera.title}</span>
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <label className="text-black font-semibold flex flex-col">
            Start Date
            <input
              type="date"
              value={dates.startDate}
              onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
              className="mt-2 p-3 rounded-xl border border-black text-black focus:outline-none focus:ring-2 focus:ring-yellow-700 transition"
            />
          </label>

          <label className="text-black font-semibold flex flex-col">
            End Date
            <input
              type="date"
              value={dates.endDate}
              onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
              className="mt-2 p-3 rounded-xl border border-black text-black focus:outline-none focus:ring-2 focus:ring-yellow-700 transition"
            />
          </label>
        </div>

        <button
          onClick={handleProceed}
          className="mt-6 bg-black text-yellow-400 px-6 py-3 rounded-2xl font-bold w-full hover:bg-yellow-400 hover:text-black transition duration-300"
        >
          Proceed to Pay
        </button>

        <div className="mt-6 w-full bg-black bg-opacity-80 rounded-2xl p-4 text-yellow-300 text-center">
          <p className="font-semibold">
            Price per day: <span className="text-white">{camera.pricePerDay} ₹</span>
          </p>
          {dates.startDate && dates.endDate && (
            <p>
              Total days:{" "}
              <span className="text-white">
                {Math.max(
                  1,
                  (new Date(dates.endDate) - new Date(dates.startDate)) /
                    (1000 * 60 * 60 * 24) +
                    1
                )}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

