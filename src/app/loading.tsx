import { Scissors } from "lucide-react";

export default function Loading() {
  return (
    <main role="status" aria-live="polite" aria-label="Cargando página"
      className="flex min-h-screen items-center justify-center bg-[#11100f] px-6 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border border-[#d6b79a]/15 border-t-[#d6b79a]" />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d6b79a]/10">
            <Scissors size={26} strokeWidth={1.3} className="text-[#d6b79a]" />
          </div>
        </div>
        <p className="mt-9 text-[10px] uppercase tracking-[0.45em] text-[#d6b79a]">Élite Beauty Studio</p>
        <h1 className="mt-4 text-3xl font-light tracking-[-0.04em] sm:text-4xl">Preparando tu experiencia</h1>
        <p className="mt-4 text-sm text-white/40">Un momento, por favor...</p>
        <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-pulse bg-[#d6b79a]" />
        </div>
      </div>
    </main>
  );
}
