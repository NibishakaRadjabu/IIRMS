import { useState, useEffect } from "react";
import api from "../utils/axios";

const empty = { title: "", description: "", link: "", active: true };

function HeroSlidesAdmin() {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => { fetchSlides(); }, []);

  const fetchSlides = async () => {
    try { const res = await api.get("/hero"); setSlides(res.data); }
    catch (err) { console.error(err); }
  };

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const supportedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!supportedTypes.includes(file.type)) {
      alert("Use a JPG, PNG, GIF, or WebP image for the slide.");
      e.target.value = "";
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("link", form.link);
      data.append("active", form.active);
      if (imageFile) data.append("image", imageFile);

      if (editing) await api.put(`/hero/${editing}`, data);
      else await api.post("/hero", data);

      setForm(empty); setImageFile(null); setPreview(null); setEditing(null);
      fetchSlides();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save slide");
    }
  };

  const handleEdit = (slide) => {
    setEditing(slide.slide_id);
    setForm({ title: slide.title, description: slide.description || "", link: slide.link || "", active: slide.active });
    setPreview(slide.image_url || null);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this slide?")) return;
    await api.delete(`/hero/${id}`);
    fetchSlides();
  };

  const inputClass = "w-full border border-gray-300 p-2 rounded text-sm";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hero Slideshow Manager</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <h2 className="font-semibold text-lg">{editing ? "Edit Slide" : "Add New Slide"}</h2>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className={inputClass} required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className={inputClass} rows={3} />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Link URL (optional)" className={inputClass} />

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slide Image</label>
          <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleImage} className="w-full text-sm border border-gray-300 p-2 rounded cursor-pointer" />
          <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF, or WebP.</p>
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded border" />
              <p className="text-xs text-gray-400 mt-1">{imageFile ? imageFile.name : "Current image"}</p>
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
          Active (visible on homepage)
        </label>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            {editing ? "Update Slide" : "Add Slide"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm(empty); setPreview(null); setImageFile(null); }}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Slides List */}
      <div className="space-y-3">
        {slides.map(slide => (
          <div key={slide.slide_id} className="bg-white p-4 rounded shadow flex gap-4 items-start">
            {slide.image_url
              ? <img src={slide.image_url} alt={slide.title} className="w-32 h-20 object-cover rounded border" />
              : <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No image</div>
            }
            <div className="flex-1">
              <h3 className="font-semibold">{slide.title}</h3>
              <p className="text-sm text-gray-500">{slide.description}</p>
              {slide.link && <a href={slide.link} className="text-blue-500 text-xs hover:underline" target="_blank">{slide.link}</a>}
              <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${slide.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {slide.active ? "Active" : "Hidden"}
              </span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(slide)} className="text-blue-600 hover:underline text-sm">Edit</button>
              <button onClick={() => handleDelete(slide.slide_id)} className="text-red-500 hover:underline text-sm">Delete</button>
            </div>
          </div>
        ))}
        {slides.length === 0 && <p className="text-gray-400 text-center py-8">No slides yet. Add one above.</p>}
      </div>
    </div>
  );
}

export default HeroSlidesAdmin;
