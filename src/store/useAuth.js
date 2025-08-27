import { create } from 'zustand';
import { api } from '../api/api.js';


export const useAuth = create((set, get) => ({
user: null,
token: localStorage.getItem('token') || null,
loading: false,
login: async (email, password) => {
set({ loading: true });
try {
const { data } = await api.post('/auth/login', { email, password });
localStorage.setItem('token', data.token);
set({ user: data.user, token: data.token, loading: false });
return true;
} catch (e) {
set({ loading: false });
throw e;
}
},
fetchMe: async () => {
try {
const { data } = await api.get('/auth/me');
set({ user: data.user });
} catch {}
},
logout: () => {
localStorage.removeItem('token');
set({ user: null, token: null });
}
}));