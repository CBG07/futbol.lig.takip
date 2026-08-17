import { useState, useEffect } from "react";
import TeamForm from "../components/TeamForm";
import LeagueTable from "../components/LeagueTable";

// 18 Takımlı 2026-2027 Sezonu (Özel Kulüp Rozet Renkleri ile)
const initialTeams = [
  { id: 1, name: "Galatasaray", badgeColor: "bg-amber-600 text-yellow-300", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 1, gd: 5, points: 6, form: ["W", "W"] },
  { id: 2, name: "Fenerbahçe", badgeColor: "bg-yellow-400 text-blue-900 font-extrabold", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 0, gd: 5, points: 6, form: ["W", "W"] },
  { id: 3, name: "Trabzonspor", badgeColor: "bg-rose-800 text-sky-300", played: 2, won: 2, drawn: 0, lost: 0, gf: 4, ga: 1, gd: 3, points: 6, form: ["W", "W"] },
  { id: 4, name: "Beşiktaş", badgeColor: "bg-zinc-900 text-white border-zinc-500", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 2, gd: 3, points: 6, form: ["W", "W"] },
  { id: 5, name: "Göztepe", badgeColor: "bg-yellow-500 text-rose-700 font-black", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, gd: 2, points: 4, form: ["W", "D"] },
  { id: 6, name: "İstanbul Başakşehir", badgeColor: "bg-orange-600 text-blue-950 font-black", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 2, gd: 1, points: 4, form: ["W", "D"] },
  { id: 7, name: "Samsunspor", badgeColor: "bg-red-600 text-white", played: 2, won: 1, drawn: 1, lost: 0, gf: 2, ga: 1, gd: 1, points: 4, form: ["D", "W"] },
  { id: 8, name: "Konyaspor", badgeColor: "bg-emerald-700 text-white", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, gd: 0, points: 3, form: ["L", "W"] },
  { id: 9, name: "Çaykur Rizespor", badgeColor: "bg-emerald-600 text-blue-900", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, gd: 0, points: 3, form: ["W", "L"] },
  { id: 10, name: "Kocaelispor", badgeColor: "bg-emerald-800 text-black font-black", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 3, gd: -1, points: 3, form: ["W", "L"] },
  { id: 11, name: "Gaziantep FK", badgeColor: "bg-red-700 text-black font-black", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 3, gd: -1, points: 3, form: ["L", "W"] },
  { id: 12, name: "Alanyaspor", badgeColor: "bg-orange-500 text-emerald-800 font-black", played: 2, won: 0, drawn: 2, lost: 0, gf: 1, ga: 1, gd: 0, points: 2, form: ["D", "D"] },
  { id: 13, name: "Kasımpaşa", badgeColor: "bg-blue-800 text-white", played: 2, won: 0, drawn: 2, lost: 0, gf: 2, ga: 2, gd: 0, points: 2, form: ["D", "D"] },
  { id: 14, name: "Eyüpspor", badgeColor: "bg-violet-700 text-yellow-300 font-bold", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 2, gd: -1, points: 1, form: ["D", "L"] },
  { id: 15, name: "Gençlerbirliği", badgeColor: "bg-red-700 text-black font-black", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, gd: -2, points: 1, form: ["L", "D"] },
  { id: 16, name: "Amed Sportif Faaliyetler", badgeColor: "bg-green-700 text-red-500 font-black", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, gd: -2, points: 1, form: ["D", "L"] },
  { id: 17, name: "Erzurumspor FK", badgeColor: "bg-sky-600 text-white", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 4, gd: -4, points: 0, form: ["L", "L"] },
  { id: 18, name: "Çorum FK", badgeColor: "bg-red-800 text-black font-black", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 4, gd: -4, points: 0, form: ["L", "L"] }
];

const initialScorers = [
  { id: 1, name: "Victor Osimhen", team: "Galatasaray", goals: 4, assists: 1 },
  { id: 2, name: "Romelu Lukaku", team: "Fenerbahçe", goals: 3, assists: 1 },
  { id: 3, name: "Mohamed Salah", team: "Trabzonspor", goals: 3, assists: 0 },
  { id: 4, name: "Leandro Trossard", team: "Beşiktaş", goals: 3, assists: 2 },
  { id: 5, name: "Juan", team: "Göztepe", goals: 2, assists: 0 },
  { id: 6, name: "Krzysztof Piątek", team: "İstanbul Başakşehir", goals: 2, assists: 0 },
  { id: 7, name: "Marius Mouandilmadji", team: "Samsunspor", goals: 2, assists: 1 },
  { id: 8, name: "Umut Nayir", team: "Konyaspor", goals: 1, assists: 0 },
  { id: 9, name: "Ali Sowe", team: "Çaykur Rizespor", goals: 1, assists: 0 },
  { id: 10, name: "Douglas Tanque", team: "Kocaelispor", goals: 1, assists: 0 },
  { id: 11, name: "Mohamed Bayo", team: "Gaziantep FK", goals: 1, assists: 0 },
  { id: 12, name: "Sergio Córdova", team: "Alanyaspor", goals: 1, assists: 0 },
  { id: 13, name: "Cenk Tosun", team: "Kasımpaşa", goals: 1, assists: 0 },
  { id: 14, name: "Umut Bozok", team: "Eyüpspor", goals: 1, assists: 0 },
  { id: 15, name: "Sékou Koïta", team: "Gençlerbirliği", goals: 1, assists: 0 },
  { id: 16, name: "Mbaye Diagne", team: "Amed Sportif Faaliyetler", goals: 1, assists: 0 },
  { id: 17, name: "Eren Tozlu", team: "Erzurumspor FK", goals: 0, assists: 0 },
  { id: 18, name: "Mame Thiam", team: "Çorum FK", goals: 0, assists: 0 }
];

// --- Derbi Geri Sayım ---
function DerbyCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-500/20">
      <div className="flex items-center gap-4">
        <span className="text-4xl">🔥</span>
        <div>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-400/30">
            Haftanın Derbisi
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white mt-1">Fenerbahçe vs Galatasaray</h3>
          <p className="text-xs text-slate-400">Ülker Stadyumu Şükrü Saracoğlu Spor Kompleksi</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl text-center min-w-[60px]">
          <span className="text-xl font-black text-amber-400 block">{timeLeft.days}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Gün</span>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl text-center min-w-[60px]">
          <span className="text-xl font-black text-white block">{timeLeft.hours}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Saat</span>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl text-center min-w-[60px]">
          <span className="text-xl font-black text-white block">{timeLeft.minutes}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Dakika</span>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl text-center min-w-[60px]">
          <span className="text-xl font-black text-emerald-400 block">{timeLeft.seconds}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Saniye</span>
        </div>
      </div>
    </div>
  );
}

// --- Gol Krallığı ---
function TopScorers({ scorers, onAddGoal }) {
  return (
    <div className="glass-panel rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-5">
        <div>
          <span className="text-[11px] font-bold text-teal-400 bg-teal-400/10 px-2.5 py-1 rounded-full border border-teal-400/20 uppercase tracking-widest">
            Bireysel Performans
          </span>
          <h3 className="text-2xl font-black text-white mt-1 font-heading">👟 Süper Lig Gol Krallığı</h3>
          <p className="text-xs text-slate-400 mt-0.5">Sezonun en çok gol atan yıldızları.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-950/70 text-slate-400 text-xs uppercase border-b border-slate-800 font-heading">
              <th className="py-3.5 px-4 text-center w-14">#</th>
              <th className="py-3.5 px-4">Oyuncu</th>
              <th className="py-3.5 px-4">Kulüp</th>
              <th className="py-3.5 px-4 text-center">Asist</th>
              <th className="py-3.5 px-4 text-center font-bold text-emerald-400">Gol</th>
              <th className="py-3.5 px-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {scorers.map((player, idx) => (
              <tr key={player.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4 font-semibold text-white">{player.name}</td>
                <td className="py-3.5 px-4 text-slate-400 text-xs">{player.team}</td>
                <td className="py-3.5 px-4 text-center font-mono">{player.assists}</td>
                <td className="py-3.5 px-4 text-center font-mono font-black text-base text-emerald-400">{player.goals}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onAddGoal(player.id)}
                    className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    +1 Gol Ekle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Penaltı Oyunu ---
function PenaltyGame({ teams, onGoalScored }) {
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
      setResultMessage("⚽ GOOOLL! Harika vuruş!");
      setStreak((prev) => prev + 1);
      if (selectedTeamId) {
        onGoalScored(Number(selectedTeamId));
      }
    } else {
      setResultMessage("🧤 KALECİ KURTARDI!");
      setStreak(0);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 uppercase tracking-widest">
            Mini Oyun
          </span>
          <h3 className="text-2xl font-black text-white mt-1 font-heading">🎯 Penaltı Şampiyonası</h3>
          <p className="text-xs text-slate-400">Takımın adına gol at, averaj ve gol hanesine anında eklensin!</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 w-full sm:w-48"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <div className="bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl text-center whitespace-nowrap">
            <span className="text-[10px] text-slate-500 block">Seri Gol</span>
            <span className="text-sm font-black text-emerald-400">{streak} 🔥</span>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-emerald-900 to-emerald-950 border-4 border-slate-700 rounded-2xl h-60 flex flex-col justify-between p-4 overflow-hidden shadow-inner">
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
                ? "-translate-x-24 -translate-y-16 scale-75"
                : ballPosition === "right"
                ? "translate-x-24 -translate-y-16 scale-75"
                : ballPosition === "center"
                ? "-translate-y-16 scale-75"
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
          className="bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 py-3 rounded-xl font-bold text-xs transition active:scale-95"
        >
          ↖️ Sol Köşe
        </button>
        <button
          onClick={() => shoot("center")}
          className="bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 py-3 rounded-xl font-bold text-xs transition active:scale-95"
        >
          ⬆️ Merkeze Sert
        </button>
        <button
          onClick={() => shoot("right")}
          className="bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 py-3 rounded-xl font-bold text-xs transition active:scale-95"
        >
          ↗️ Sağ Köşe
        </button>
      </div>
    </div>
  );
}

// --- Maç Simülatörü ---
function MatchSimulator({ teams, onPlayMatch }) {
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
    <div className="glass-panel rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 uppercase tracking-widest">
            Fikstür Motoru
          </span>
          <h3 className="text-2xl font-black text-white mt-1 font-heading">⚡ Hızlı Maç Simülatörü</h3>
          <p className="text-xs text-slate-400 mt-0.5">Maç sonuçlarını girin, lig tablosu anında güncellensin.</p>
        </div>
        <button
          type="button"
          onClick={handleRandomScore}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-700 transition"
        >
          🎲 Rastgele Skor
        </button>
      </div>

      <form onSubmit={handleSimulate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <select
          value={homeId}
          onChange={(e) => setHomeId(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-emerald-500"
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
            className="w-16 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-center text-white font-bold"
          />
          <span className="text-slate-500 font-bold">-</span>
          <input
            type="number"
            min="0"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="w-16 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-center text-white font-bold"
          />
        </div>

        <select
          value={awayId}
          onChange={(e) => setAwayId(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-emerald-500"
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.name} (Dep)</option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-4 rounded-xl transition text-sm shadow-md"
        >
          Maçı Bitir ve Tabloyu Güncelle
        </button>
      </form>
    </div>
  );
}

// --- Ana Dashboard ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("table");

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem("league_teams_v9");
    return saved ? JSON.parse(saved) : initialTeams;
  });

  const [scorers, setScorers] = useState(() => {
    const saved = localStorage.getItem("league_scorers_v5");
    return saved ? JSON.parse(saved) : initialScorers;
  });

  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    localStorage.setItem("league_teams_v9", JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem("league_scorers_v5", JSON.stringify(scorers));
  }, [scorers]);

  const handleSaveTeam = (teamData) => {
    const gd = (teamData.gf || 0) - (teamData.ga || 0);
    if (editingTeam) {
      setTeams(teams.map((t) => (t.id === editingTeam.id ? { ...teamData, gd, id: editingTeam.id } : t)));
      setEditingTeam(null);
    } else {
      setTeams([...teams, { ...teamData, gd, id: Date.now(), form: ["W"], badgeColor: "bg-slate-700 text-white" }]);
    }
  };

  const handleDeleteTeam = (id) => {
    setTeams(teams.filter((t) => t.id !== id));
  };

  const handleResetData = () => {
    if (window.confirm("Tüm lig ve gol krallığı verileri varsayılana sıfırlansın mı?")) {
      setTeams(initialTeams);
      setScorers(initialScorers);
    }
  };

  // Konfeti ve Şampiyonluk Kutlama Motoru
  const handleCelebrateChampion = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        window.confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        window.confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  };

  const handlePlayMatch = (homeId, awayId, homeScore, awayScore) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => {
        if (team.id === homeId) {
          const isWin = homeScore > awayScore;
          const isDraw = homeScore === awayScore;
          return {
            ...team,
            played: team.played + 1,
            won: team.won + (isWin ? 1 : 0),
            drawn: team.drawn + (isDraw ? 1 : 0),
            lost: team.lost + (!isWin && !isDraw ? 1 : 0),
            gf: (team.gf || 0) + homeScore,
            ga: (team.ga || 0) + awayScore,
            gd: ((team.gf || 0) + homeScore) - ((team.ga || 0) + awayScore),
            points: team.points + (isWin ? 3 : isDraw ? 1 : 0),
            form: [...(team.form || []), isWin ? "W" : isDraw ? "D" : "L"].slice(-5)
          };
        }
        if (team.id === awayId) {
          const isWin = awayScore > homeScore;
          const isDraw = homeScore === awayScore;
          return {
            ...team,
            played: team.played + 1,
            won: team.won + (isWin ? 1 : 0),
            drawn: team.drawn + (isDraw ? 1 : 0),
            lost: team.lost + (!isWin && !isDraw ? 1 : 0),
            gf: (team.gf || 0) + awayScore,
            ga: (team.ga || 0) + homeScore,
            gd: ((team.gf || 0) + awayScore) - ((team.ga || 0) + homeScore),
            points: team.points + (isWin ? 3 : isDraw ? 1 : 0),
            form: [...(team.form || []), isWin ? "W" : isDraw ? "D" : "L"].slice(-5)
          };
        }
        return team;
      })
    );
  };

  const handleGoalScored = (teamId) => {
    setTeams((prevTeams) =>
      prevTeams.map((t) => {
        if (t.id === teamId) {
          const updatedGf = (t.gf || 0) + 1;
          const updatedGd = updatedGf - (t.ga || 0);
          return { ...t, gf: updatedGf, gd: updatedGd };
        }
        return t;
      })
    );
  };

  const handleAddPlayerGoal = (playerId) => {
    setScorers((prev) =>
      prev
        .map((p) => (p.id === playerId ? { ...p, goals: p.goals + 1 } : p))
        .sort((a, b) => b.goals - a.goals)
    );
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ teams, scorers }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "super_lig_verileri.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sorted = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return (b.gd || 0) - (a.gd || 0);
  });
  const leaderTeam = sorted[0] || { name: "-", points: 0, badgeColor: "bg-amber-500 text-black" };
  const totalMatches = teams.reduce((acc, curr) => acc + Number(curr.played), 0);
  const totalGoals = teams.reduce((acc, curr) => acc + Number(curr.gf || 0), 0);

  return (
    <div className="min-h-screen stadium-bg text-slate-100 p-4 md:p-10 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
          <img
            src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Futbol Sahası"
            className="w-full h-52 sm:h-64 object-cover brightness-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest mb-2 font-heading">
              Süper Lig Yönetim Portalı
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 font-heading">
              Futbol Lig Puan Durumu Takip
            </h1>
            <p className="text-slate-300 mt-2 text-xs sm:text-sm max-w-xl">
              18 Takımlı Süper Lig CRUD Yönetimi, Canlı Derbi Sayacı ve Gol Krallığı.
            </p>
          </div>
        </div>

        {/* Derbi Sayacı */}
        <DerbyCountdown />

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl shadow-lg relative group">
            <span className="text-slate-400 text-xs font-medium block">Mevcut Lider</span>
            <span className="text-xl font-bold text-amber-400 mt-1 block truncate font-heading">{leaderTeam.name}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] text-slate-500">{leaderTeam.points} Puan</span>
              <button
                onClick={handleCelebrateChampion}
                className="text-[10px] bg-amber-400/20 hover:bg-amber-400 hover:text-black text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-400/30 transition"
              >
                Kutla 🎉
              </button>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl shadow-lg">
            <span className="text-slate-400 text-xs font-medium block">Kayıtlı Kulüp</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block font-heading">{teams.length}</span>
            <span className="text-[11px] text-slate-500">Takım sayısı</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl shadow-lg">
            <span className="text-slate-400 text-xs font-medium block">Toplam Gol</span>
            <span className="text-2xl font-bold text-teal-400 mt-1 block font-heading">{totalGoals}</span>
            <span className="text-[11px] text-slate-500">Atılan gol</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl shadow-lg">
            <span className="text-slate-400 text-xs font-medium block">Toplam Fikstür</span>
            <span className="text-2xl font-bold text-sky-400 mt-1 block font-heading">{totalMatches}</span>
            <span className="text-[11px] text-slate-500">Oynanan maç</span>
          </div>
        </div>

        {/* Sekme Butonları */}
        <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-2xl">
          <button
            onClick={() => setActiveTab("table")}
            className={`flex-1 min-w-[130px] py-3 rounded-xl font-bold text-xs transition font-heading ${
              activeTab === "table"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            🏆 Puan Durumu & Form
          </button>
          <button
            onClick={() => setActiveTab("scorers")}
            className={`flex-1 min-w-[130px] py-3 rounded-xl font-bold text-xs transition font-heading ${
              activeTab === "scorers"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            👟 Gol Krallığı
          </button>
          <button
            onClick={() => setActiveTab("simulator")}
            className={`flex-1 min-w-[130px] py-3 rounded-xl font-bold text-xs transition font-heading ${
              activeTab === "simulator"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            ⚡ Maç Simülatörü
          </button>
          <button
            onClick={() => setActiveTab("game")}
            className={`flex-1 min-w-[130px] py-3 rounded-xl font-bold text-xs transition font-heading ${
              activeTab === "game"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            🎯 Penaltı Oyunu
          </button>
        </div>

        {/* Sekme İçerikleri */}
        {activeTab === "table" && (
          <div className="space-y-8">
            <TeamForm
              onSave={handleSaveTeam}
              editingTeam={editingTeam}
              onCancel={() => setEditingTeam(null)}
            />
            <LeagueTable
              teams={teams}
              onEdit={(team) => {
                setEditingTeam(team);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              onDelete={handleDeleteTeam}
            />
          </div>
        )}

        {activeTab === "scorers" && (
          <TopScorers scorers={scorers} onAddGoal={handleAddPlayerGoal} />
        )}

        {activeTab === "simulator" && (
          <MatchSimulator teams={teams} onPlayMatch={handlePlayMatch} />
        )}

        {activeTab === "game" && (
          <PenaltyGame teams={teams} onGoalScored={handleGoalScored} />
        )}

        {/* Alt Araçlar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-500">
          <div className="flex gap-4">
            <button
              onClick={handleExportJSON}
              className="hover:text-emerald-400 transition underline"
            >
              📥 Lig Verilerini İndir (.JSON)
            </button>
          </div>
          <button
            onClick={handleResetData}
            className="hover:text-rose-400 transition underline"
          >
            Tüm Verileri Varsayılana Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}