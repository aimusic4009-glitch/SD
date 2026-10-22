import { auth } from '@/config/firebase';

const API_BASE = 'https://aletwend-render-backend.onrender.com';

export async function restoreActiveTrip(): Promise<{ ok: boolean; status: number; endedTrip?: 'cancelled' | 'completed' }> {
  const user = auth.currentUser;
  if (!user) return { ok: false, status: 401 };

  const token = await user.getIdToken();
  const response = await fetch(`${API_BASE}/getDriverActiveTrip`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  let payload: any = null;
  try { payload = await response.json(); } catch { payload = null; }

  return { ok: response.ok, status: response.status, endedTrip: payload?.endedTrip };
}
