"use client";

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-6">📡</div>
        <h1 className="font-display text-2xl font-bold text-white mb-3">Vous êtes hors ligne</h1>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
          Vérifiez votre connexion internet et réessayez. Les pages déjà consultées restent disponibles.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-primary text-neutral-950 font-semibold rounded-xl text-sm hover:bg-primary/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
