"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="ابحث عن فيلم..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-4 pr-12 pl-12 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            router.push("/search");
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        </button>
      )}
    </form>
  );
}
