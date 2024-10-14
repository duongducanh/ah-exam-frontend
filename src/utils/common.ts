export function mergeClasses(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
