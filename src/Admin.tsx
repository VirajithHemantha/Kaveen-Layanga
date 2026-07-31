import { useState } from 'react';
import { Copy, Check, Link } from 'lucide-react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [name, setName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const prefixes = ['Mr. & Mrs.', 'Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.', 'Prof.', 'Rev.', 'Family'];

  const handleGenerate = () => {
    if (!name.trim()) return;
    const url = new URL(window.location.origin);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('name', name.trim());
    setGeneratedLink(url.toString());
    setCopied(false);
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-dark flex items-center justify-center p-8 text-ink font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gold/20">
        <div className="text-center mb-8">
          <Link className="mx-auto text-gold mb-4" size={32} />
          <h1 className="text-3xl font-display">Link Generator</h1>
          <p className="text-stone-500 font-serif italic mt-2">Generate personalized invitation links</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-stone-500 block mb-3">Prefix</label>
            <select 
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-ivory-dark/30 border border-gold/30 rounded-2xl px-5 py-4 focus:border-gold outline-none transition-all"
            >
              {prefixes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-stone-500 block mb-3">Guest Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-ivory-dark/30 border border-gold/30 rounded-2xl px-5 py-4 focus:border-gold outline-none transition-all font-serif italic text-xl"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!name.trim()}
            className="w-full px-8 py-4 bg-ink text-ivory rounded-full text-[10px] uppercase tracking-[0.4em] font-bold shadow-sm hover:bg-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="pt-6 border-t border-gold/20 mt-6">
              <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-stone-500 block mb-3">Generated URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={generatedLink}
                  className="w-full bg-ivory-dark/30 border border-gold/30 rounded-xl px-4 py-3 text-sm text-stone-600 outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className="px-4 py-3 bg-white border border-gold/30 text-ink rounded-xl hover:bg-gold hover:text-white transition-all flex items-center justify-center shrink-0"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
