import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function PortfolioEditor() {
  const [portfolioId, setPortfolioId] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState({ photo: false, cv: false });
  const [form, setForm] = useState({
    personalInfo: {
      fullName: '',
      title: '',
      bio: '',
      cvFilename: '',
      photo: '',
    },
    projects: [],
    skills: [],
  });

  // ─── Load or Create Portfolio on Mount ───
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await api.get('/portfolio/mine');
        setForm(res.data);
        setPortfolioId(res.data.id);
      } catch {
        const res = await api.post('/portfolio');
        setPortfolioId(res.data.id);
      } finally {
        setLoading(false);
        setIsLoaded(true); //  autosave won't fire until data is fully loaded
      }
    };
    loadPortfolio();
  }, []);

  // ─── Autosave (debounce 1.5s) ───
  useEffect(() => {
    if (!isLoaded || !portfolioId) return; //  skip if not loaded yet

    const timer = setTimeout(async () => {
      setStatus('saving');
      try {
        await api.put(`/portfolio/${portfolioId}`, form);
        setStatus('saved');
      } catch {
        setStatus('error');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [form, portfolioId, isLoaded]);

  // ─── Personal Info Handler ───
  const handlePersonalInfo = (e) => {
    setForm((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value },
    }));
  };

  // ─── Projects Handlers ───
  const handleAddProject = () => {
    setForm((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', tags: [] }],
    }));
  };

  const handleProjectChange = (index, e) => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? { ...project, [e.target.name]: e.target.value }
          : project //  immutable update
      ),
    }));
  };

  const handleRemoveProject = (index) => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // ─── Skills Handler ───
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map((s) => s.trim());
    setForm((prev) => ({ ...prev, skills: skillsArray }));
  };

  // ─── Photo Upload ───
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading((prev) => ({ ...prev, photo: true }));
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await api.post('/upload', data);
      setForm((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, photo: res.data.url },
      }));
    } catch {
      alert('Photo upload failed, please try again');
    } finally {
      setUploading((prev) => ({ ...prev, photo: false }));
    }
  };

  // ─── CV Upload ───
  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('CV must be a PDF file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('CV size must be less than 5MB');
      return;
    }

    setUploading((prev) => ({ ...prev, cv: true }));
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await api.post('/upload', data);
      setForm((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, cvFilename: res.data.filename },
      }));
    } catch {
      alert('CV upload failed, please try again');
    } finally {
      setUploading((prev) => ({ ...prev, cv: false }));
    }
  };

  // ─── Loading State ───
  if (loading) return <p>Loading portfolio...</p>; //  no blank page

  // ─── Render ───
  return (
    <div>
      <h2>Portfolio Editor</h2>

      {/* Autosave Status */}
      {status === 'saving' && <p style={{ color: 'gray' }}>Saving...</p>}
      {status === 'saved' && <p style={{ color: 'green' }}>Saved ✓</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Error saving, please check your connection</p>}

      {/* Personal Info */}
      <section>
        <h3>Personal Info</h3>
        <input name="fullName" placeholder="Full Name" value={form.personalInfo.fullName} onChange={handlePersonalInfo} />
        <input name="title" placeholder="Title (e.g. Frontend Developer)" value={form.personalInfo.title} onChange={handlePersonalInfo} />
        <textarea name="bio" placeholder="Bio" value={form.personalInfo.bio} onChange={handlePersonalInfo} />
      </section>

      {/* Photo Upload */}
      <section>
        <h3>Profile Photo</h3>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading.photo} />
        {uploading.photo && <p>Uploading photo...</p>}
        {form.personalInfo.photo && (
          <img src={form.personalInfo.photo} alt="profile preview" width={100} />
        )}
      </section>

      {/* CV Upload */}
      <section>
        <h3>CV (PDF only, max 5MB)</h3>
        <input type="file" accept=".pdf" onChange={handleCVUpload} disabled={uploading.cv} />
        {uploading.cv && <p>Uploading CV...</p>}
        {form.personalInfo.cvFilename && (
          <p>CV uploaded: {form.personalInfo.cvFilename}</p>
        )}
      </section>

      {/* Projects */}
      <section>
        <h3>Projects</h3>
        {form.projects.map((project, index) => (
          <div key={index}>
            <input name="title" placeholder="Project Title" value={project.title} onChange={(e) => handleProjectChange(index, e)} />
            <input name="description" placeholder="Description" value={project.description} onChange={(e) => handleProjectChange(index, e)} />
            <button onClick={() => handleRemoveProject(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddProject}>+ Add Project</button>
      </section>

      {/* Skills */}
      <section>
        <h3>Skills</h3>
        <input
          placeholder="e.g. React, Node.js, CSS"
          value={form.skills.join(', ')}
          onChange={handleSkillsChange}
        />
      </section>
    </div>
  );
}