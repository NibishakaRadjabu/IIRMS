import { useEffect, useState } from 'react';
import api from '../utils/axios';

export default function LeadershipApplicationsAdmin() {
  const [items, setItems] = useState([]); const [error, setError] = useState('');
  const load = () => api.get('/leadership/applications').then(r => setItems(r.data)).catch(e => setError(e.response?.data?.message || 'Unable to load applications.'));
  useEffect(() => { load(); }, []);
  const review = async (id, status) => { try { await api.patch(`/leadership/applications/${id}`, { status }); load(); } catch (e) { setError(e.response?.data?.message || 'Unable to review application.'); } };
  return <div><h1 className="text-2xl font-bold mb-6">Leadership Applications</h1>{error && <p className="text-red-600">{error}</p>}{items.map(i => <article key={i.application_id} className="bg-white rounded shadow p-5 mb-4"><h2 className="text-lg font-semibold">{i.position}</h2><p>{i.applicant?.name} · {i.applicant?.email}</p><p className="text-sm text-slate-500">{i.department?.faculties || 'No department assigned'} · {i.status}</p><p className="mt-3 whitespace-pre-wrap">{i.statement}</p>{i.status === 'pending' && <div className="mt-4 flex gap-3"><button onClick={() => review(i.application_id, 'approved')} className="bg-green-700 text-white rounded px-3 py-2">Approve</button><button onClick={() => review(i.application_id, 'rejected')} className="bg-red-600 text-white rounded px-3 py-2">Reject</button></div>}</article>)}</div>;
}
