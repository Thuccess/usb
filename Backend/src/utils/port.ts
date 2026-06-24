export function resolvePort(portInput?: string | number): number {
  if (typeof portInput === 'number' && Number.isFinite(portInput) && portInput > 0) {
    return portInput;
  }

  if (typeof portInput === 'string') {
    const parsed = Number.parseInt(portInput, 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return 4000;
}
