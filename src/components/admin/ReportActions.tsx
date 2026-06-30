"use client";

import { updateReportStatusAction } from "@/app/admin/(protected)/signalements/actions";

interface Props {
  id: string;
  current: string;
}

export function ReportActions({ id, current }: Props) {
  if (current !== "EN_ATTENTE") return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateReportStatusAction(id, "TRAITE")}
        className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
      >
        Traiter
      </button>
      <button
        onClick={() => updateReportStatusAction(id, "REJETE")}
        className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
      >
        Rejeter
      </button>
    </div>
  );
}
