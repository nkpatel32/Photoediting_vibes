import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { useGallery } from '../../context/GalleryContext';
import ItemForm from '../ItemForm';
import { SectionWrap } from './AdminFields';
import '../../pages/AdminPanel.css';

const GRID_OPTIONS = [
  { value: 'g-large', label: 'Large (spans 2 rows, left)' },
  { value: 'g-sm',    label: 'Small Square' },
  { value: 'g-wide',  label: 'Wide (full width)' },
  { value: 'g-sm2',   label: 'Small 2 (bottom row)' },
];

export default function GalleryAdminSection() {
  const { items, handleAdd, handleUpdate, handleDelete } = useGallery();
  const [formOpen,   setFormOpen]   = useState(false);
  const [editItem,   setEditItem]   = useState(null);
  const [deleteConf, setDeleteConf] = useState(null);
  const [toast,      setToast]      = useState('');
  const [search,     setSearch]     = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openAdd  = () => { setEditItem(null); setFormOpen(true); };
  const openEdit = (item) => { setEditItem(item); setFormOpen(true); };

  const handleSave = (data) => {
    if (editItem) { handleUpdate(editItem.id, data); showToast('✓ Item updated'); }
    else          { handleAdd(data);                 showToast('✓ Item added'); }
    setFormOpen(false); setEditItem(null);
  };

  const doDelete = () => {
    handleDelete(deleteConf.id);
    setDeleteConf(null);
    showToast('✓ Item deleted');
  };

  const filtered = items.filter(it =>
    it.title?.toLowerCase().includes(search.toLowerCase()) ||
    it.cat?.toLowerCase().includes(search.toLowerCase()) ||
    it.tag?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="af-section">
      <div className="af-section-header">
        <div>
          <h2 className="af-section-title">Gallery</h2>
          <p className="af-section-sub">{items.length} items · Click any image to open the before/after lightbox</p>
        </div>
        <button className="admin-add-btn" onClick={openAdd}>
          <Plus size={16} style={{marginRight:'8px'}} /> Add New Item
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats-row" style={{ marginBottom:'1.5rem' }}>
        {[
          { label:'Total Items', val: items.length },
          { label:'Categories',  val: [...new Set(items.map(i=>i.cat))].length },
          { label:'Layouts Used',val: [...new Set(items.map(i=>i.cls))].length },
        ].map(s => (
          <div className="admin-stat-card" key={s.label}>
            <div className="admin-stat-val">{s.val}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="admin-toolbar" style={{ marginBottom:'1rem', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(212,168,67,0.4)' }}>
          <Search size={16} />
        </div>
        <input 
          className="admin-search" 
          placeholder="Search by title, category or tag..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ paddingLeft: '40px' }}
        />
        <span className="admin-search-count">{filtered.length} shown</span>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th><th>Thumb</th><th>Title</th><th>Category</th><th>Tag</th><th>Layout</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="admin-empty">No items match your search.</td></tr>
            ) : filtered.map((item, i) => (
              <tr key={item.id} className="admin-row">
                <td className="admin-td-num">{i+1}</td>
                <td className="admin-td-thumb">
                  <img src={item.thumb} alt={item.title} className="admin-thumb" />
                </td>
                <td className="admin-td-title">
                  <div className="admin-item-title">{item.title}</div>
                  <div className="admin-item-desc">{item.desc?.slice(0,60)}…</div>
                </td>
                <td><span className="admin-badge-cat">{item.cat}</span></td>
                <td><span className="admin-badge-tag">{item.tag}</span></td>
                <td><code className="admin-cls">{item.cls}</code></td>
                <td className="admin-td-actions">
                  <button className="admin-btn-edit" onClick={() => openEdit(item)}>
                    <Edit2 size={12} style={{marginRight:'4px'}} /> Edit
                  </button>
                  <button className="admin-btn-delete" onClick={() => setDeleteConf(item)}>
                    <Trash2 size={12} style={{marginRight:'4px'}} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form */}
      {formOpen && (
        <ItemForm item={editItem} gridOptions={GRID_OPTIONS} onSave={handleSave} onCancel={() => { setFormOpen(false); setEditItem(null); }} />
      )}

      {/* Delete confirm */}
      {deleteConf && (
        <div className="admin-overlay">
          <div className="admin-confirm-box">
            <div className="admin-confirm-icon">⚠</div>
            <h3 className="admin-confirm-title">Delete "{deleteConf.title}"?</h3>
            <p className="admin-confirm-text">This action cannot be undone.</p>
            <div className="admin-confirm-actions">
              <button className="admin-btn-cancel" onClick={() => setDeleteConf(null)}>Cancel</button>
              <button className="admin-btn-confirm-delete" onClick={doDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
