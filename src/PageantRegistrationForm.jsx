import React, { useState, useEffect } from 'react';

export default function PageantRegistrationForm() {
  const [division, setDivision] = useState('Miss');
  const [submitted, setSubmitted] = useState(false);
  const [demoEntries, setDemoEntries] = useState([]);

  const [formData, setFormData] = useState({
    fullName: '',
    stageName: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    bio: '',
    platformCause: '',
    headshotName: '',
    agreedToTerms: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('mr_miss_durban_demo');
    if (saved) {
      setDemoEntries(JSON.parse(saved));
    }
  }, []);

  const handleDivisionChange = (newDivision) => {
    setDivision(newDivision);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? (files[0]?.name || '') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      division,
      ...formData,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedEntries = [newEntry, ...demoEntries];
    setDemoEntries(updatedEntries);
    localStorage.setItem('mr_miss_durban_demo', JSON.stringify(updatedEntries));
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      stageName: '',
      email: '',
      phone: '',
      dob: '',
      city: '',
      bio: '',
      platformCause: '',
      headshotName: '',
      agreedToTerms: false,
    });
    setSubmitted(false);
  };

  const isMr = division === 'Mr';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Demo Notice Banner */}
      <div className="max-w-3xl mx-auto mb-6 bg-neutral-900 border border-amber-500/40 text-amber-200 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-between">
        <span>
          <strong className="text-amber-400">Interactive Demo Mode:</strong> No payment required. Test registering for <strong className="text-amber-400">Mr</strong> or <strong className="text-amber-400">Miss Durban</strong> below.
        </span>
        <span className="bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold px-2.5 py-0.5 rounded-full text-xs">
          PREVIEW
        </span>
      </div>

      <div className="max-w-3xl mx-auto bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-amber-500/30">
        {/* Black & Gold Header Banner */}
        <div className="px-8 py-10 bg-gradient-to-br from-black via-neutral-900 to-amber-950/60 border-b border-amber-500/30">
          <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-400 mb-2">
            Official Contestant Portal • KwaZulu-Natal
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Mr &amp; Miss <span className="text-amber-400">Durban</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-300">
            Applying for the <strong className="text-amber-400">{division} Durban</strong> title. Select your division and complete your profile below.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-5 bg-neutral-900">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-black text-2xl font-extrabold shadow-lg shadow-amber-500/20">
              ✓
            </div>
            <h2 className="text-3xl font-bold text-white">
              Thank you for trying the demo!
            </h2>
            <p className="text-neutral-300 max-w-md mx-auto">
              Your test registration for <span className="font-semibold text-amber-400">{formData.fullName}</span> in the{' '}
              <span className="font-semibold text-amber-400">{division} Durban</span> division has been recorded in the preview log below.
            </p>
            <div className="pt-2">
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                Test Another Submission
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Step 1: Division Selector */}
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                1. Select Competition Title
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleDivisionChange('Miss')}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    !isMr
                      ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/20'
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Miss Durban</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${!isMr ? 'border-amber-400' : 'border-neutral-600'}`}>
                      {!isMr && <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">Female Division • Official Entrant</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleDivisionChange('Mr')}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    isMr
                      ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/20'
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Mr Durban</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${isMr ? 'border-amber-400' : 'border-neutral-600'}`}>
                      {isMr && <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">Male Division • Official Entrant</p>
                </button>
              </div>
            </div>

            <hr className="border-neutral-800" />

            {/* Step 2: Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                2. Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={isMr ? 'e.g., Sipho Khumalo' : 'e.g., Amahle Ndlovu'}
                    className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Stage / Preferred Name</label>
                  <input
                    type="text"
                    name="stageName"
                    value={formData.stageName}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contestant@example.com"
                    className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27 82 000 0000"
                    className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Suburb / Area in Durban *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., uMhlanga, Berea, Westville"
                    className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>

            <hr className="border-neutral-800" />

            {/* Step 3: Advocacy, Bio & Media */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                3. Advocacy, Bio &amp; Media
              </h3>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Social Impact Platform / Advocacy Cause *
                </label>
                <input
                  type="text"
                  name="platformCause"
                  required
                  value={formData.platformCause}
                  onChange={handleChange}
                  placeholder="e.g., Youth Empowerment & Community Upliftment"
                  className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Short Contestant Bio (Max 300 characters) *
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  maxLength={300}
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell the judges and audience about yourself and why you want to represent Durban..."
                  className="w-full rounded-lg bg-neutral-950 border-neutral-700 border px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Official Headshot Upload (Optional in Demo)
                </label>
                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-neutral-700 border-dashed rounded-xl bg-neutral-950/60 hover:border-amber-400/60 transition">
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-neutral-300">
                      {formData.headshotName ? (
                        <span className="font-semibold text-amber-400">
                          Selected: {formData.headshotName}
                        </span>
                      ) : (
                        <>
                          <span className="font-semibold text-amber-400">Select a portrait photo</span>{' '}
                          <span className="text-neutral-400">(JPG or PNG)</span>
                        </>
                      )}
                    </p>
                    <input
                      type="file"
                      name="headshot"
                      accept="image/png, image/jpeg"
                      onChange={handleChange}
                      className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer mx-auto max-w-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="pt-2 space-y-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  required
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-950 text-amber-400 focus:ring-amber-400"
                />
                <span className="text-xs text-neutral-400 leading-relaxed">
                  I confirm that I meet the eligibility requirements for <strong className="text-amber-400">{division} Durban</strong> (Demo Mode — No payment required).
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-black font-extrabold text-base tracking-wide bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Register for {division} Durban (Demo)
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Live Demo Preview Log */}
      {demoEntries.length > 0 && (
        <div className="max-w-3xl mx-auto mt-10 bg-neutral-900 rounded-2xl shadow-xl border border-amber-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                Recent Demo Submissions <span className="text-amber-400">({demoEntries.length})</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Live preview of entries submitted in this browser session
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('mr_miss_durban_demo');
                setDemoEntries([]);
              }}
              className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
            >
              Clear Demo Log
            </button>
          </div>

          <div className="space-y-3">
            {demoEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-black">
                      {entry.division} Durban
                    </span>
                    <span className="font-bold text-white">{entry.fullName}</span>
                    <span className="text-xs text-neutral-400">• {entry.city}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Cause: <em className="text-neutral-200">{entry.platformCause}</em>
                  </p>
                </div>
                <span className="text-xs text-neutral-500 self-end sm:self-center">
                  {entry.submittedAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}