import { useState } from "react";

export default function MatchSimulator({ teams, onPlayMatch }) {
  const [homeId, setHomeId] = useState(teams[0]?.id || "");
  const [awayId, setAwayId] = useState(teams[1]?.id || "");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleSimulate = (e) => {
    e.preventDefault();
    if (homeId === awayId) {
      alert("Lütfen iki farklı takım seçin!");
      return;
    }
    onPlayMatch(Number(homeId), Number(awayId), Number(homeScore), Number(awayScore));
  };

  const handleRandomScore = () => {
    setHomeScore(Math.floor(Math.random() * 4));
    setAwayScore(Math.floor(Math.random() * 4));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          ⚡ Hızlı Maç Oyna / Simüle Et
        </h3>
        <button
          type="button"
          onClick={handleRandomScore}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          🎲 Rastgele Skor
        </button>
      </div>

      <form onSubmit={handleSimulate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <select
          value={homeId}
          onChange={(e) => setHomeId(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:border-emerald-500"
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.name} (Ev)</option>
          ))}
        </select>

        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            min="0"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className="w-16 bg-slate-950 border border-slate-700 rounded-lg p-2 text-center text-white font-bold"
          />
          <span className="text-slate-500 font-bold">-</span>
          <input
            type="number"
            min="0"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="w-16 bg-slate-950 border border-slate-700 rounded-lg p-2 text-center text-white font-bold"
          />
        </div>

        <select
          value={awayId}
          onChange={(e) => setAwayId(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:border-emerald-500"
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.name} (Dep)</option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-4 rounded-lg transition text-sm shadow-md"
        >
          Maçı Bitir ve Tabloyu Güncelle
        </button>
      </form>
    </div>
  );
}