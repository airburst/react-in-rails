export function tryParse<T = unknown>(
  data: string | undefined | null,
  fallback?: T,
) {
  try {
    if (data == null) {
      return fallback as T;
    }
    return JSON.parse(data) as T;
  } catch (e) {
    return fallback as T;
  }
}
