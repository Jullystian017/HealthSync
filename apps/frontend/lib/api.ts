export async function api(path: string, options?: RequestInit) {
  const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "") + path, {
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}
