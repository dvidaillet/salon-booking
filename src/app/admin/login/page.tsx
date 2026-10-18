import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Acceso administrativo | ÉLITE",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: isAdmin } = await supabase.rpc("is_admin");

    if (isAdmin) {
      redirect("/admin");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#11100f] px-5 py-20 text-white">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#d6b79a]">
            Élite Beauty Studio
          </p>

          <h1 className="text-6xl font-light tracking-[-0.08em] sm:text-7xl">
            ÉLITE<span className="text-[#d6b79a]">.</span>
          </h1>

          <p className="mt-5 text-xs uppercase tracking-[0.3em] text-white/45">
            Back Office
          </p>
        </div>

        <div className="border border-white/10 bg-[#171310] p-7 sm:p-10">
          <div className="flex items-center gap-3 text-[#d6b79a]">
            <LockKeyhole size={18} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.2em]">
              Acceso privado
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-light tracking-tight">
            Bienvenido de nuevo.
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/50">
            Inicia sesión para administrar el salón.
          </p>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}