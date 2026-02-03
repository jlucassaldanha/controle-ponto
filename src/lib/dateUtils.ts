// src/lib/dateUtils.ts

// ==========================================
// FUNÇÕES DE CORREÇÃO
// ==========================================

export function correctOldData(timestamp: Date): Date {
  if (!timestamp) return new Date();
  
  // Mágica para alinhar Dev e Prod:
  // Detecta o fuso horário atual do ambiente (180 min no Dev, 0 min na Prod)
  // e SUBTRAI esse valor. Isso desfaz a conversão automática que o sistema fez.
  // Dev: 10:35 - 3h = 07:35
  // Prod: 07:35 - 0h = 07:35
  const offset = new Date().getTimezoneOffset(); 
  return new Date(timestamp.getTime() - offset * 60 * 1000);
}

export function convertLocalToUTC(localDate: Date): Date {
  // Ajuste para salvar no banco (se necessário)
  const offset = new Date().getTimezoneOffset();
  return new Date(localDate.getTime() - offset * 60 * 1000);
}

export function convertUTCToLocal(utcDate: Date): Date {
  const offset = new Date().getTimezoneOffset();
  return new Date(utcDate.getTime() + offset * 60 * 1000);
}

export function getADayInterval(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(year, month, day + 1, 0, 0, 0, 0));

  return { startOfDay, endOfDay };
}

// ==========================================
// FORMATAÇÃO E UTILITÁRIOS (Tudo via UTC)
// ==========================================

export function formatDate(timestamp: Date) {
  const day = timestamp.getUTCDate().toString().padStart(2, "0");
  const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = timestamp.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function formatTime(timestamp: Date) {
  const hours = timestamp.getUTCHours().toString().padStart(2, "0");
  const minutes = timestamp.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const dayNumberToKeyMap: { [key: number]: string } = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

export function getDayOfWeek(timestamp: Date) {
  // CRUCIAL: Usa getUTCDay para garantir que o dia da semana bata com a data corrigida
  return dayNumberToKeyMap[timestamp.getUTCDay()];
}

export function minutesToTimeString(totalMinutes: number | null | undefined): string {
  if (totalMinutes === null || totalMinutes === undefined || totalMinutes < 0) {
    return "";
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getTimeMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return -1;
  }
  return hours * 60 + minutes;
}

export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}