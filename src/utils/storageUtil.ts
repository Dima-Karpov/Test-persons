export const storageUtil = {
  setToken: (accessToken: string): void =>
    localStorage.setItem('accessToken', accessToken),
  getAccessToken: (): string | null => localStorage.getItem('accessToken'),
  clearToken: (): void => localStorage.removeItem('accessToken'),
};
