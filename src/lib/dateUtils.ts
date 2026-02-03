// src/lib/dateUtils.ts

// Define o offset do Brasil fixo (3 horas * 60 minutos)
// Positivo (180) para usar na matemática de subtração/adição manual
const BRAZIL_OFFSET_MINUTES = 180;

// ==========================================
// FUNÇÕES DE CORREÇÃO (Core do Bug)
// ==========================================

export function correctOldData(timestamp: Date): Date {
  if (!timestamp) return new Date();
  // Soma 3 horas manualmente para alinhar Prod (UTC) com Dev (Brasil)
  return new Date(timestamp.getTime() + BRAZIL_OFFSET_MINUTES * 60 * 1000);
}

// RESTAURADO: Converte Local para UTC usando o offset fixo
export function convertLocalToUTC(localDate: Date): Date {
  return new Date(localDate.getTime() - BRAZIL_OFFSET_MINUTES * 60 * 1000);
}

// RESTAURADO: UTC para Local
export function convertUTCToLocal(utcDate: Date): Date {
  return new Date(utcDate.getTime() + BRAZIL_OFFSET_MINUTES * 60 * 1000);
}

// RESTAURADO: getADayInterval
// Cria o intervalo de início e fim do dia em UTC para queries no banco
export function getADayInterval(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(year, month, day + 1, 0, 0, 0, 0));

  return {
    startOfDay,
    endOfDay,
  };
}

// ==========================================
// FORMATAÇÃO E UTILITÁRIOS
// ==========================================

export function formatDate(timestamp: Date) {
  // Usamos UTC aqui porque a função correctOldData já ajustou o tempo absoluto
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

// Mantém compatibilidade caso algo importe o offset
export function getTimezoneOffset(): number {
  return BRAZIL_OFFSET_MINUTES;
}