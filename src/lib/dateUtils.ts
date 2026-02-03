// Force o offset de Brasilia (UTC-3)
// 3 horas * 60 min = 180 minutos
const BR_OFFSET_MINUTES = 180; 

export function correctOldData(timestamp: Date): Date {
  // Se o timestamp original for UTC, subtraímos 3 horas para chegar no horário BR
  // Mas como queremos criar um objeto Date que "mostre" o horário BR mesmo estando em UTC,
  // precisamos manipular os milissegundos.
  
  // A lógica segura é sempre tratar como UTC e remover 3h fixas
  return new Date(timestamp.getTime() - (BR_OFFSET_MINUTES * 60 * 1000));
}

// Corrija também o formatador para não depender do sistema
export function formatDate(timestamp: Date) {
    // Garante DD/MM/YYYY
    const day = timestamp.getDate().toString().padStart(2, "0");
    const month = (timestamp.getMonth() + 1).toString().padStart(2, "0");
    const year = timestamp.getFullYear();
    return `${day}/${month}/${year}`;
}

// Obtém o offset de timezone do usuário em minutos (ex: -180 para São Paulo = UTC-3)
export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

// Converte uma data do timezone local para UTC
// Exemplo: 30/01 14:00 (São Paulo) → 30/01 17:00 (UTC)
export function convertLocalToUTC(localDate: Date): Date {
  const offset = getTimezoneOffset();
  return new Date(localDate.getTime() - offset * 60 * 1000);
}

// Converte uma data UTC para timezone local do usuário
// Exemplo: 30/01 17:00 (UTC) → 30/01 14:00 (São Paulo)
export function convertUTCToLocal(utcDate: Date): Date {
  const offset = getTimezoneOffset();
  return new Date(utcDate.getTime() + offset * 60 * 1000);
}


export function getADayInterval(date: Date) {
  // Usa UTC para criar o intervalo do dia
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

export function formatTime(timestamp: Date) {
  // Espera receber uma data já no timezone local
  const hours = timestamp.getHours().toString().padStart(2, "0");
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function getDayOfWeek(timestamp: Date) {
  // Espera receber uma data já no timezone local
  const dayNumberToKeyMap: { [key: number]: string } = {
    0: "Dom",
    1: "Seg",
    2: "Ter",
    3: "Qua",
    4: "Qui",
    5: "Sex",
    6: "Sáb",
  };
  return dayNumberToKeyMap[timestamp.getDay()];
}

// time formater
export function minutesToTimeString(
  totalMinutes: number | null | undefined,
): string {
  if (totalMinutes === null || totalMinutes === undefined || totalMinutes < 0) {
    return "";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function getTimeMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return -1;
  }

  return hours * 60 + minutes;
}
