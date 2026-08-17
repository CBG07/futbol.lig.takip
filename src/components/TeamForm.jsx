import { useEffect, useState } from "react";

export default function TeamForm({ onSave, editingTeam, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0
  });

  useEffect(() => {
    if (editingTeam) {
      setFormData(editingTeam);
    } else {
      setFormData({ name: "", played: 0, won: 0, drawn: 0, lost: 0 });
    }
  }, [editingTeam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const points = Number(formData.won) * 3 + Number(formData.drawn) * 1;
    onSave({
      ...formData,
      played: Number(formData.played),
      won: Number(formData.won),
      drawn: Number(formData.drawn),
      lost: Number(formData.lost),
      points
    });

    setFormData({ name: "", played: 0, won: 0, drawn: 0, lost: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg mb-8 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-emerald-400">
        {editingTeam ? "Takım Bilgilerini Güncelle" : "Yeni Takım Ekle"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">Takım Adı</label>
          <input
            type="text"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            placeholder="Örn: Fenerbahçe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Oynanan Maç (OM)</label>
          <input
            type="number"
            min="0"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={formData.played}
            onChange={(e) => setFormData({ ...formData, played: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Galibiyet (G)</label>
          <input
            type="number"
            min="0"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={formData.won}
            onChange={(e) => setFormData({ ...formData, won: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Beraberlik (B)</label>
          <input
            type="number"
            min="0"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={formData.drawn}
            onChange={(e) => setFormData({ ...formData, drawn: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Mağlubiyet (M)</label>
          <input
            type="number"
            min="0"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={formData.lost}
            onChange={(e) => setFormData({ ...formData, lost: e.target.value })}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          {editingTeam ? "Güncelle" : "Ekle"}
        </button>
        {editingTeam && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold px-4 py-2 rounded-lg transition"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}