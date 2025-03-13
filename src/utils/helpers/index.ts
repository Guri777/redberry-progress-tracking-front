export const formatDate = (isoString: string): string => {
  const months: string[] = [
    'იანვ',
    'თებ',
    'მარ',
    'აპრ',
    'მაი',
    'ივნ',
    'ივლ',
    'აგვ',
    'სექ',
    'ოქტ',
    'ნოე',
    'დეკ',
  ];

  const date = new Date(isoString);
  const day: number = date.getUTCDate();
  const month: string = months[date.getUTCMonth()];
  const year: number = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
};
