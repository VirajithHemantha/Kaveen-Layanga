import { useState } from 'react';
import { Copy, Link as LinkIcon, MessageSquare } from 'lucide-react';

const PREFIXES = [
  "Mr.",
  "Mrs.",
  "Miss",
  "Mr. & Mrs.",
  "Family",
  "Dear"
];

export default function Admin() {
  const [prefix, setPrefix] = useState("Mr.");
  const [guestName, setGuestName] = useState("");
  const [copiedStatus, setCopiedStatus] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const generateLink = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set("prefix", prefix);
    url.searchParams.set("name", guestName);
    return url.toString();
  };

  const handleGenerateLink = () => {
    if (!guestName) {
      setCopiedStatus("Please enter a guest name first.");
      setTimeout(() => setCopiedStatus(""), 3000);
      return;
    }
    setGeneratedUrl(generateLink());
    setCopiedStatus("");
  };

  const generateMessage = () => {
    const link = generateLink();
    return `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Kaveen & Layanga`;
  };

  const handleCopyLink = async () => {
    if (!guestName) {
      setCopiedStatus("Please enter a guest name first.");
      setTimeout(() => setCopiedStatus(""), 3000);
      return;
    }
    const link = generateLink();
    await navigator.clipboard.writeText(link);
    setCopiedStatus("Link copied to clipboard!");
    setTimeout(() => setCopiedStatus(""), 3000);
  };

  const handleCopyMessage = async () => {
    if (!guestName) {
      setCopiedStatus("Please enter a guest name first.");
      setTimeout(() => setCopiedStatus(""), 3000);
      return;
    }
    const msg = generateMessage();
    await navigator.clipboard.writeText(msg);
    setCopiedStatus("Full message copied to clipboard!");
    setTimeout(() => setCopiedStatus(""), 3000);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gold/20">
        <div className="mb-6 text-center">
          <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
            /ADMIN ONLY CAN SEE Link Generator
          </span>
        </div>
        <h1 className="text-3xl font-display text-center mb-10">Generate personalized invitation links</h1>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-stone-400 block mb-3">Prefix</label>
              <select
                value={prefix}
                onChange={(e) => {
                  setPrefix(e.target.value);
                  setGeneratedUrl("");
                }}
                className="w-full bg-transparent border border-gold/30 rounded-2xl px-5 py-4 focus:border-gold outline-none transition-all text-stone-600"
              >
                {PREFIXES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-stone-400 block mb-3">Guest Name</label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  setGeneratedUrl("");
                }}
                className="w-full bg-transparent border border-gold/30 rounded-2xl px-5 py-4 focus:border-gold outline-none transition-all text-stone-600"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateLink}
            className="w-full py-5 bg-ink text-white rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all shadow-lg"
          >
            Generate Link
          </button>

          {generatedUrl && (
            <div className="mt-6 p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-3">Generated URL</h3>
              <a href={generatedUrl} target="_blank" rel="noreferrer" className="text-blue-600 break-all hover:underline block mb-6 font-mono text-sm">
                {generatedUrl}
              </a>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-200">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gold text-gold-dark rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-white transition-all"
                >
                  <LinkIcon size={16} />
                  Copy Link Only
                </button>
                <button
                  onClick={handleCopyMessage}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gold text-white border border-gold rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-dark transition-all"
                >
                  <MessageSquare size={16} />
                  Copy Full Message
                </button>
              </div>
            </div>
          )}

          {copiedStatus && (
            <div className="text-center py-2">
              <p className={`text-sm ${copiedStatus.includes('Please') ? 'text-red-500' : 'text-green-600'}`}>
                {copiedStatus}
              </p>
            </div>
          )}
          
          <div className="mt-8 p-6 bg-gold/5 rounded-2xl border border-gold/20">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-4">Message Preview</h3>
            {guestName ? (
              <pre className="whitespace-pre-wrap font-serif text-sm text-stone-700 leading-relaxed">
                {generateMessage()}
              </pre>
            ) : (
              <p className="text-stone-400 font-serif italic text-sm">Enter a guest name to see the preview.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
