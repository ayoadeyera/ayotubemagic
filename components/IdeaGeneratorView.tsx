
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const IdeaGeneratorView: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!niche) return;
    setLoading(true);
    setIdeas([]);
    try {
      const gemini = new GeminiService();
      const result = await gemini.generateIdeas(niche);
      setIdeas(result);
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Failed to generate ideas.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center max-w-2xl mx-auto shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Infinite Video Ideas</h2>
        <p className="text-slate-400 text-sm mb-6">Enter your niche or target keyword to discover what's trending and viral-worthy.</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Minimalist Travel Gear, AI Tools, Luxury Watches..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !niche}
            className="bg-indigo-600 px-8 rounded-2xl font-bold transition-all hover:bg-indigo-500 disabled:bg-slate-800 flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Explore'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
            <span className="inline-block px-3 py-1 bg-indigo-600/10 text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Viral Concept #{idx + 1}</span>
            <h3 className="text-lg font-bold mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors">{idea.title}</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{idea.description}</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
               <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Expert Hook Preview:</span>
               <p className="text-xs italic text-indigo-200">"{idea.hook}"</p>
            </div>
          </div>
        ))}
        {!loading && ideas.length === 0 && niche && (
           <div className="col-span-full py-12 text-center text-slate-600 italic">
             No ideas found. Try a broader niche or check your connection.
           </div>
        )}
      </div>
    </div>
  );
};

export default IdeaGeneratorView;
