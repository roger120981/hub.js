export function getQueryString(queryParams: Record<string, any>) {
  const result = Object.entries(queryParams)
    .filter(([_key, value]) => !!value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return result && `?${result}`;
}
