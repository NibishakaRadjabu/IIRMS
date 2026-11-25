import { useEffect, useState } from 'react';
import api from '../utils/axios';

export default function FundingGrantsAdmin() {
  const [grants, setGrants] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ project_id: '', grant_amount: '' });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const [gRes, pRes] = await Promise.all([
          api.get('/admin/funding-grants'),
          api.get('/admin/projects'),
        ]);

        if (!mounted) return;
        setGrants(gRes.data);
        setProjects(pRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load funding grants or projects');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    if (!form.project_id) return setError('Please select a project');
    if (!form.grant_amount || isNaN(Number(form.grant_amount))) return setError('Enter a valid grant amount');

    try {
      const payload = { project_id: Number(form.project_id), grant_amount: Number(form.grant_amount) };
      const { data: created } = await api.post('/admin/funding-grants', payload);
      setGrants(prev => [created, ...prev]);
      setMsg('Funding grant created');
      setForm({ project_id: '', grant_amount: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to create grant');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this grant?')) return;
    setError(''); setMsg('');
    try {
      await api.delete(`/admin/funding-grants/${id}`);
      setGrants(prev => prev.filter(g => (g.funding_id ?? g.id ?? g.id) !== id));
      setMsg('Grant deleted');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to delete grant');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Funding Grants</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {msg && <p className="text-green-600 mb-2">{msg}</p>}

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Create Grant</h2>
        <form onSubmit={handleCreate} className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Project</label>
            <select className="w-full border rounded p-2" value={form.project_id} onChange={e => setForm({ ...form, project_id: e.target.value })}>
              <option value="">Select a project</option>
              {projects.map(p => (
                <option key={p.project_id ?? p.id} value={p.project_id ?? p.id}>{p.project_name || p.name || `Project ${p.project_id ?? p.id}`}</option>
              ))}
            </select>
          </div>
          <div className="w-48">
            <label className="block text-sm text-gray-700">Amount</label>
            <input className="w-full border rounded p-2" value={form.grant_amount} onChange={e => setForm({ ...form, grant_amount: e.target.value })} placeholder="1000.00" />
          </div>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Existing Grants</h2>
        {loading ? <p>Loading...</p> : (
          grants.length === 0 ? <p className="text-gray-500">No grants found.</p> : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Project</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {grants.map(g => (
                  <tr key={g.funding_id ?? g.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{g.funding_id ?? g.id}</td>
                    <td className="p-2 border">{g.project?.project_name || projects.find(p => (p.project_id ?? p.id) === g.project_id)?.project_name || `Project ${g.project_id}`}</td>
                    <td className="p-2 border">{g.grant_amount}</td>
                    <td className="p-2 border">
                      <button onClick={() => handleDelete(g.funding_id ?? g.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </section>
    </div>
  );
}
