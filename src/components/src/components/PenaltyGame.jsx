import { useState } from "react";

export default function PenaltyGame({ teams, onGoalScored }) {
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || "");
  const [resultMessage, setResultMessage] = useState("Köşeni seç ve şutunu çek!");
  const [ballPosition, setBallPosition] = useState("center");
  const [gkPosition, setGkPosition] = useState("center");
  const [streak, setStreak] = useState(0);

  const shoot = (direction) => {
    setBallPosition(direction);
    const directions = ["left", "center", "right"];
    const randomGk = directions[Math.floor(Math.random() * directions.length)];
    setGkPosition(randomGk);

    if (direction !== randomGk) {
      setResultMessage("⚽ GOOOLL! Muhteşem bir vuruş!");
      setStreak((prev) => prev + 1);
      if (selectedTeamId) {
        onGoalScored(Number(selectedTeamId));
      }
    } else {
      setResultMessage("🧤 KALECİ KURTARDI! Direk dibinde kaldı.");
      setStreak(0);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 uppercase tracking-widest">
            Mini Oyun
          </span>
          <h3 className="text-xl font-black text-white mt-1">🎯 Penaltı Şampiyonası</h3>
          <p className="text-xs text-slate-400">Takımın adına gol at, puan durumundaki gol hanesine katkı sağla!</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 w-full sm:w-48"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-center whitespace-nowrap">
            <span className="text-[10px] text-slate-500 block">Seri Gol</span>
            <span className="text-sm font-black text-emerald-400">{streak} 🔥</span>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-emerald-900 to-emerald-950 border-4 border-slate-700 rounded-2xl h-56 flex flex-col justify-between p-4 overflow-hidden shadow-inner">
        <div className="w-4/5 mx-auto border-t-4 border-x-4 border-white/80 h-32 rounded-t-lg relative bg-white/5 backdrop-blur-[1px] flex items-end justify-around pb-2">
          <div
            className={`transition-all duration-300 transform text-3xl select-none ${
              gkPosition === "left"
                ? "-translate-x-16"
                : gkPosition === "right"
                ? "translate-x-16"
                : "translate-x-0"
            }`}
          >
            🧤
          </div>
        </div>

        <div className="relative flex justify-center items-center pb-2">
          <div
            className={`transition-all duration-300 transform text-2xl select-none ${
              ballPosition === "left"
                ? "-translate-x-24 -translate-y-20 scale-75"
                : ballPosition === "right"
                ? "translate-x-24 -translate-y-20 scale-75"
                : ballPosition === "center"
                ? "-translate-y-20 scale-75"
                : "translate-y-0 scale-100"
            }`}
          >
            ⚽
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-4 py-1 rounded-full border border-slate-700 text-xs font-semibold text-white">
          {resultMessage}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <button
          onClick={() => shoot("left")}
          className="bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 py-2.5 rounded-xl font-bold text-xs transition active:scale-95"
        >
          ↖️ Sol Köşe
        </button>
        <button
          onClick={() => shoot("center")}
          className="bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 py-2.5 rounded-xl font-bold text-xs transition active:scale-95"
        >
          ⬆️ Merkeze Sert
        </button>
        <button
          onClick={() => shoot("right")}
          className="bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 py-2.5 rounded-xl font-bold text-xs transition active:scale-95"
        >
          ↗️ Sağ Köşe
        </button>
      </div>
    </div>
  );
}
