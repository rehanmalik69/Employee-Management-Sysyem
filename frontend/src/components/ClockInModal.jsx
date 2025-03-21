import React from 'react';
import { FaClock } from 'react-icons/fa';

const ClockInModal = ({ isOpen, onClose, clockedIn, onClockInOut, clockInTime }) => {
  if (!isOpen) return null;

  const formatTime = (date) => {
    return date?.toLocaleTimeString() || '';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 w-full max-w-md">
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-indigo-500/20 mb-4">
            <FaClock className="text-3xl text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {clockedIn ? 'Clock Out Confirmation' : 'Clock In'}
          </h3>
          {clockInTime && (
            <p className="text-white/80 mb-4">
              Clocked in at: {formatTime(clockInTime)}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            onClick={onClockInOut}
            className={`px-4 py-2 rounded text-white ${
              clockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {clockedIn ? 'Clock Out' : 'Clock In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockInModal;
