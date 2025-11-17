export const daysOfWeek = [
  { key: 'monday',    label: 'Seg' },
  { key: 'tuesday',   label: 'Ter' },
  { key: 'wednesday', label: 'Qua' },
  { key: 'thursday',  label: 'Qui' },
  { key: 'friday',    label: 'Sex' },
  { key: 'saturday',  label: 'Sáb' },
  { key: 'sunday',    label: 'Dom' },
] as const

export const dayNumberToKeyMap: { [key: number]: string } = {
  0: 'sunday', 
  1: 'monday', 
  2: 'tuesday', 
  3: 'wednesday',
  4: 'thursday', 
  5: 'friday', 
  6: 'saturday',
} as const