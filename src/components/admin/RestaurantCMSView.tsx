import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileEdit, CheckCircle2, Globe, Clock, Phone, MapPin } from 'lucide-react';

export const RestaurantCMSView: React.FC = () => {
  const { recordAuditLog } = useApp();

  const [heroHeadline, setHeroHeadline] = useState('Taste Something Extraordinary.');
  const [heroTagline, setHeroTagline] = useState('Good Food. Great Moments.');
  const [heroDescription, setHeroDescription] = useState(
    'SAVORÉ harmonizes aged Prime Angus beef, fire-roasted Neapolitan sourdough, and aromatic Pakistani Shinwari heritage in an exquisite ambiance.'
  );
  const [announcementBanner, setAnnouncementBanner] = useState(
    '✨ Weekend Privilege: Enjoy 20% off all platters and artisan pizzas with code SAVORE20.'
  );
  const [cliftonHours, setCliftonHours] = useState('12:00 PM – 02:00 AM (Mon - Sun)');
  const [toast, setToast] = useState<string | null>(null);

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    recordAuditLog('CMS Content Updated', 'Administrator saved homepage hero text, hours, and announcements');
    setToast('Website content published live!');
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Content Management System
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Restaurant Website CMS & Announcements
          </h1>
        </div>

        {toast && (
          <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveCMS} className="space-y-6 max-w-3xl">
        {/* Hero Section Card */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#2b2723] space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Homepage Hero Banner Copy</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
                Primary Hero Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500 font-serif-luxury text-base"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
                Official Brand Tagline
              </label>
              <input
                type="text"
                value={heroTagline}
                onChange={(e) => setHeroTagline(e.target.value)}
                className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
                Supporting Narrative / Subtitle
              </label>
              <textarea
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                rows={3}
                className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Global Announcement Marquee */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#2b2723] space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Top Announcement Bar
          </h2>
          <div>
            <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
              Banner Text
            </label>
            <input
              type="text"
              value={announcementBanner}
              onChange={(e) => setAnnouncementBanner(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Timings */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#2b2723] space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Flagship Operating Hours</span>
          </h2>
          <div>
            <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
              Karachi Clifton Hours
            </label>
            <input
              type="text"
              value={cliftonHours}
              onChange={(e) => setCliftonHours(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-950/50"
          >
            Publish Website Copy
          </button>
        </div>
      </form>
    </div>
  );
};
