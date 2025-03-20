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

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
};

export const extractValidationRules = (
  schema: { fields: { [x: string]: any } },
  fieldName: string | number,
) => {
  const field = schema.fields[fieldName];

  if (!field) return `Field "${fieldName}" not found`;

  return {
    field: fieldName,
    type: field.type,
    validations: field.tests.map(
      (test: { OPTIONS: { name: any; params: any } }) => ({
        name: test.OPTIONS.name,
        params: test.OPTIONS.params,
      }),
    ),
  };
};
