export interface RepositoryResponse<T> {
  error?: unknown;
  message?: string;
  model?: T | null;
  status: 'success' | 'error';
}
