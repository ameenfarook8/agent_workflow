import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">✨ Name Greeter</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your name…"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 text-lg transition-colors"
              >
                🎉 Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-purple-700 mb-6">
              Thanks for entering, {name}! 🎊
            </p>
            <button
              onClick={handleReset}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-3 px-6 text-lg transition-colors"
            >
              Enter another name
            </button>
          </>
        )}
      </div>
    </main>
  );
}
