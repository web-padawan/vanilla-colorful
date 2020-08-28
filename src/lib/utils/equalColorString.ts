export const equalColorString = (first: string, second: string): boolean => {
  return first.replace(/\s/g, '') === second.replace(/\s/g, '');
};
