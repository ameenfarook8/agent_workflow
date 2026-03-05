import { useState } from 'react';
import confetti from 'canvas-confetti';

const PHONE_NUMBER = '918590887340';

function buildWhatsAppURL(name) {
  const message = [
    `Hi Ameen! 👋`,
    ``,
    `My name is *${name}*.`,
    ``,
    `It's great to connect with you! 😊`,
    `I just visited your app and wanted to say hello.`,
    ``,
    `Looking forward to hearing from you! 🙌`,
  ].join('\n');

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function App() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    window.location.href = buildWhatsAppURL(name.trim());
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 rounded-full p-4 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-500">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.122 1.524 5.857L0 24l6.293-1.494A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.07 16.713c-.258.724-1.27 1.326-2.076 1.5-.552.117-1.273.21-3.7-.795-3.107-1.274-5.11-4.432-5.265-4.637-.15-.205-1.26-1.676-1.26-3.197 0-1.52.797-2.267 1.08-2.577.282-.31.617-.387.823-.387.205 0 .41.002.59.01.19.01.444-.072.695.53.258.617.876 2.137.952 2.292.077.155.128.336.026.54-.103.206-.155.334-.308.514-.154.18-.323.402-.462.54-.154.153-.314.32-.135.627.18.308.797 1.314 1.712 2.128 1.176 1.048 2.168 1.372 2.477 1.526.308.154.487.129.667-.077.18-.206.77-.898.976-1.207.205-.308.41-.257.693-.154.283.103 1.797.848 2.105 1.003.308.154.513.23.59.36.077.128.077.744-.18 1.467z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600">👋 Say Hello to Ameen</h1>
          <p className="text-gray-500 mt-2 text-sm">Enter your name and you'll be redirected to WhatsApp to send a greeting!</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {name.trim() && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-green-700 mb-1">📋 Preview message:</p>
              <p>Hi Ameen! 👋</p>
              <p className="mt-1">My name is <strong>{name}</strong>.</p>
              <p className="mt-1">It's great to connect with you! 😊</p>
              <p>I just visited your app and wanted to say hello.</p>
              <p className="mt-1">Looking forward to hearing from you! 🙌</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl py-3 text-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.122 1.524 5.857L0 24l6.293-1.494A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.07 16.713c-.258.724-1.27 1.326-2.076 1.5-.552.117-1.273.21-3.7-.795-3.107-1.274-5.11-4.432-5.265-4.637-.15-.205-1.26-1.676-1.26-3.197 0-1.52.797-2.267 1.08-2.577.282-.31.617-.387.823-.387.205 0 .41.002.59.01.19.01.444-.072.695.53.258.617.876 2.137.952 2.292.077.155.128.336.026.54-.103.206-.155.334-.308.514-.154.18-.323.402-.462.54-.154.153-.314.32-.135.627.18.308.797 1.314 1.712 2.128 1.176 1.048 2.168 1.372 2.477 1.526.308.154.487.129.667-.077.18-.206.77-.898.976-1.207.205-.308.41-.257.693-.154.283.103 1.797.848 2.105 1.003.308.154.513.23.59.36.077.128.077.744-.18 1.467z"/>
            </svg>
            Send on WhatsApp
          </button>
        </form>
      </div>
    </main>
  );
}