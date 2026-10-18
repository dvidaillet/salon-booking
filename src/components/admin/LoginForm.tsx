"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {  ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    const supabase = createClient();

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      // La autorización administrativa se comprueba
      // nuevamente en el servidor al acceder a /admin.
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div>
        <label
          htmlFor="email"
          className="mb-3 block text-xs uppercase tracking-[0.2em] text-white/60"
        >
          Correo electrónico
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@correo.com"
          className="w-full rounded-none border border-white/20 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-[#d6b79a]"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-3 block text-xs uppercase tracking-[0.2em] text-white/60"
        >
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-none border border-white/20 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-[#d6b79a]"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-14 w-full items-center justify-center gap-3 bg-[#d6b79a] px-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Accediendo...
          </>
        ) : (
          <>
            Acceder al panel
            <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}