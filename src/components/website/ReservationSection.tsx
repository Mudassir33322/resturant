import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BranchId, Reservation } from '../../types';
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  HeartHandshake,
} from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { currentBranch, createReservation, setActiveView } = useApp();

  const [branch, setBranch] = useState<BranchId>(currentBranch);
  const [date, setDate] = useState('2026-10-05');
  const [time, setTime] = useState('20:00');
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingPreference, setSeatingPreference] = useState<Reservation['seatingPreference']>('Indoor');
  const [customerName, setCustomerName] = useState('Senator Tariq Mansoor');
  const [customerPhone, setCustomerPhone] = useState('+92 300 9221100');
  const [customerEmail, setCustomerEmail] = useState('t.mansoor@senate.pk');
  const [specialRequests, setSpecialRequests] = useState('Anniversary dining experience. Please arrange private candlelight table.');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createReservation({
      branchId: branch,
      customerName,
      customerPhone,
      customerEmail,
      date,
      time,
      guestsCount,
      seatingPreference,
      specialRequests: specialRequests || undefined,
    });
    setConfirmedReservation(res);
  };

  if (confirmedReservation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Booking Confirmed
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Table Reserved at SAVORÉ
          </h2>
          <p className="text-neutral-400 text-xs mt-2 max-w-md mx-auto">
            We are honored to host you. A confirmation SMS and concierge notice have been dispatched.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141210] border border-[#2b2723] text-left max-w-md mx-auto space-y-3 text-xs">
          <div className="flex justify-between border-b border-neutral-800 pb-2">
            <span className="text-neutral-400">Reservation Number:</span>
            <span className="text-amber-400 font-bold font-mono text-sm">
              #{confirmedReservation.reservationNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Guest Name:</span>
            <span className="text-white font-semibold">{confirmedReservation.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Date & Time:</span>
            <span className="text-white font-semibold">
              {confirmedReservation.date} at {confirmedReservation.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Party Size:</span>
            <span className="text-white font-semibold">{confirmedReservation.guestsCount} Guests</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Seating Area:</span>
            <span className="text-white font-semibold">{confirmedReservation.seatingPreference}</span>
          </div>
          {confirmedReservation.specialRequests && (
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 italic">
              "{confirmedReservation.specialRequests}"
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setActiveView('website')}
            className="px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => setConfirmedReservation(null)}
            className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
          >
            Reserve Another Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
          Culinary Hospitality
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
          Reserve Your Table Experience
        </h1>
        <p className="text-neutral-400 text-xs max-w-lg mx-auto leading-relaxed">
          Whether celebrating an intimate milestone, family banquet, or executive dinner, SAVORÉ curates memorable gastronomic moments.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#141210] border border-[#2b2723] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Branch */}
          <div>
            <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>SAVORÉ Destination</span>
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as BranchId)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
            >
              <option value="karachi_clifton">SAVORÉ Karachi — Marine Promenade, Clifton</option>
              <option value="lahore_gulberg">SAVORÉ Lahore — M.M. Alam Road, Gulberg</option>
              <option value="islamabad_f7">SAVORÉ Islamabad — Executive Heights, F-7</option>
            </select>
          </div>

          {/* Number of Guests */}
          <div>
            <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Number of Guests</span>
            </label>
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
              <span>Date</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
              required
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Preferred Dinner Time</span>
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
            >
              {['12:30', '13:00', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'].map((slot) => (
                <option key={slot} value={slot}>
                  {slot} ({Number(slot.split(':')[0]) >= 18 ? 'Dinner Service' : 'Lunch Service'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seating Preference */}
        <div>
          <label className="block text-xs uppercase font-semibold text-neutral-300 mb-2">
            Seating Ambience Preference
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(['Indoor', 'Outdoor', 'Window', 'Private Area', 'Family Section'] as const).map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => setSeatingPreference(pref)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  seatingPreference === pref
                    ? 'border-amber-500 bg-amber-950/30 text-amber-300 ring-1 ring-amber-500/40'
                    : 'border-neutral-800 bg-[#181512] text-neutral-400 hover:text-white'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Details */}
        <div className="pt-3 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Guest Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Phone Number</label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Email Address</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-[11px] text-neutral-400 mb-1">
            Special Requests / Dietary Requirements
          </label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={2}
            placeholder="e.g. Birthday cake presentation, quiet corner for business meeting, high chairs..."
            className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3 border-t border-neutral-900 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/60 cursor-pointer"
          >
            <span>Confirm Reservation</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
