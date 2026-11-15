import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://YOUR_LOCAL_IP:3000/api'; // Cambia esto por tu IP local

export async function setSession(token: string) {
  await SecureStore.setItemAsync('user_session', token);
}

export async function getSession() {
  return await SecureStore.getItemAsync('user_session');
}

export async function deleteSession() {
  await SecureStore.deleteItemAsync('user_session');
}

export async function apiRequest(endpoint: string, options: any = {}) {
  const token = await getSession();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || 'Error en la petición');
  }

  return await response.json();
}
