const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'medium'
});

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return dateFormatter.format(date);
}
