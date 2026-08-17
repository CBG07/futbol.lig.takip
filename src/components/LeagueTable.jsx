import { useState } from "react";

// Güvenilir, doğrudan yüklenen ve engellenmeyen Kulüp Logoları
const TEAM_DATA = {
  "Galatasaray": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5041.png",
    bg: "bg-amber-600 text-yellow-300 border-yellow-400"
  },
  "Fenerbahçe": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5034.png",
    bg: "bg-yellow-400 text-blue-900 border-blue-900"
  },
  "Trabzonspor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5042.png",
    bg: "bg-rose-900 text-sky-300 border-sky-400"
  },
  "Beşiktaş": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5038.png",
    bg: "bg-zinc-900 text-white border-white/60"
  },
  "Göztepe": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/6520.png",
    bg: "bg-yellow-500 text-rose-700 border-yellow-400"
  },
  "İstanbul Başakşehir": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5040.png",
    bg: "bg-orange-600 text-blue-950 border-orange-400"
  },
  "Samsunspor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/9788.png",
    bg: "bg-red-600 text-white border-red-500"
  },
  "Konyaspor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5037.png",
    bg: "bg-emerald-700 text-white border-emerald-500"
  },
  "Çaykur Rizespor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5039.png",
    bg: "bg-emerald-600 text-blue-900 border-blue-600"
  },
  "Kocaelispor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/9784.png",
    bg: "bg-emerald-800 text-black border-emerald-600"
  },
  "Gaziantep FK": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/9611.png",
    bg: "bg-red-700 text-black border-red-600"
  },
  "Alanyaspor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/6521.png",
    bg: "bg-orange-500 text-emerald-800 border-orange-400"
  },
  "Kasımpaşa": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5036.png",
    bg: "bg-blue-900 text-white border-blue-700"
  },
  "Eyüpspor": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/9783.png",
    bg: "bg-violet-800 text-yellow-400 border-violet-600"
  },
  "Gençlerbirliği": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/5035.png",
    bg: "bg-red-700 text-black border-red-600"
  },
  "Amed Sportif Faaliyetler": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/4568.png",
    bg: "bg-emerald-700 text-red-500 border-emerald-600"
  },
  "Erzurumspor FK": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/9786.png",
    bg: "bg-sky-600 text-white border-sky-400"
  },
  "Çorum FK": {
    logo: "https://r2.thesportsdb.com/images/media/team/badge/9787.png",
    bg: "bg-red-900 text-black border-red-700"
  }
};

function ClubLogo({ teamName }) {
  const [error, setError] = useState(false);
  const info = TEAM_DATA[teamName] || {
    logo: "",
    bg: "bg-slate-800 text-white border-slate-600"
  };

  if (info.logo && !error) {
    return (
      <img
        src={info.logo}
        alt={teamName}
        onError={() => setError(true)}
        className="w-7 h-7 object-contain drop-shadow-md rounded-full bg-white/10 p-0.5"
      />
    );
  }

  return (
    <span
      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border shadow-sm ${info.bg}`}
    >
      {teamName.substring(0, 2).toUpperCase()}
    </span>
  );
}

export default function LeagueTable({ teams, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return (b.gd || 0) - (a.gd || 0);
  });

  const filteredTeams = sortedTeams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-3xl shadow-xl overflow-hidden">
      {/* Arama & Başlık */}
      <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/60">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
            🏆 Canlı Puan Durumu & Form
          </h3>
          <p className="text-xs text-slate-400">18 Takımlı Süper Lig Resmi Sıralaması</p>
        </div>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Takım ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800 font-heading">
              <th className="py-4 px-3 text-center w-12">Sıra</th>
              <th className="py-4 px-4">Kulüp</th>
              <th className="py-4 px-3 text-center">OM</th>
              <th className="py-4 px-3 text-center text-emerald-400">G</th>
              <th className="py-4 px-3 text-center text-amber-400">B</th>
              <th className="py-4 px-3 text-center text-rose-400">M</th>
              <th className="py-4 px-3 text-center text-slate-400">AG</th>
              <th className="py-4 px-3 text-center text-slate-400">YG</th>
              <th className="py-4 px-3 text-center text-sky-400">AV</th>
              <th className="py-4 px-4 text-center">Son 5 Maç</th>
              <th className="py-4 px-4 text-center font-bold text-white">Puan</th>
              <th className="py-4 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredTeams.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-8 text-slate-400">
                  Eşleşen takım bulunamadı.
                </td>
              </tr>
            ) : (
              filteredTeams.map((team, index) => {
                const isLeader = index === 0;
                return (
                  <tr
                    key={team.id}
                    className={`transition duration-150 hover:bg-slate-800/50 ${
                      isLeader ? "bg-emerald-950/20" : ""
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center">
                      {isLeader ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-sm">
                          1
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold text-xs">{index + 1}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                      <ClubLogo teamName={team.name} />
                      <span className="whitespace-nowrap">{team.name}</span>
                      {isLeader && (
                        <span className="text-[10px] bg-amber-400/15 text-amber-300 font-medium px-2 py-0.5 rounded-full border border-amber-400/30">
                          👑 Lider
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-slate-300">{team.played}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-emerald-400 font-medium">{team.won}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-amber-400 font-medium">{team.drawn}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-rose-400 font-medium">{team.lost}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400">{team.gf || 0}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400">{team.ga || 0}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-sky-400 font-bold">{team.gd || 0}</td>
                    
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {(team.form || ["W", "D", "W"]).slice(-5).map((f, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold text-white shadow-sm ${
                              f === "W" ? "bg-emerald-500" : f === "D" ? "bg-amber-500" : "bg-rose-500"
                            }`}
                          >
                            {f === "W" ? "G" : f === "D" ? "B" : "M"}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-black text-base text-emerald-300 font-mono">
                      {team.points}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => onEdit(team)}
                        className="bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white border border-sky-500/30 px-2.5 py-1 rounded-lg text-xs transition"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => onDelete(team.id)}
                        className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 px-2.5 py-1 rounded-lg text-xs transition"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}