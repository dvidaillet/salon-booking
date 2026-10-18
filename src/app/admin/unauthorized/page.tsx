import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#11100f] px-6 text-center text-white">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d6b79a]">
        Élite Beauty Studio
      </p>

      <h1 className="mt-6 text-4xl font-light">
        Acceso no autorizado
      </h1>

      <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
        Tu cuenta no tiene permisos para acceder al panel
        administrativo.
      </p>

      <Link
        href="/admin/login"
        className="mt-10 border border-[#d6b79a] px-6 py-4 text-xs uppercase tracking-[0.2em] text-[#d6b79a]"
      >
        Volver al inicio de sesión
      </Link>
    </main>
  );
}