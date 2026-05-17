export function cloneGameState<T>(state: T): T {
  return JSON.parse(JSON.stringify(state)); // Using deep clone logic, or better structuredclone for modern JS
}
