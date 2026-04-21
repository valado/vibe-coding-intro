export const getCustomCursor = (accentHex: string) => {
  const encoded = accentHex.replace('#', '%23');
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='5' fill='${encoded}' opacity='.85'/%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='${encoded}' stroke-width='1.5' opacity='.35'/%3E%3C/svg%3E") 12 12, default`;
};
