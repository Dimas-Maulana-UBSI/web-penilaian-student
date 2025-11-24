export function setSession<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSession<T>(key: string): T | null {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) as T : null;
}

export function removeSession(key: string): void {
  sessionStorage.removeItem(key);
}

export function clearSession(): void {
  sessionStorage.clear();
}
