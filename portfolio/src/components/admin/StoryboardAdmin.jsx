import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Row, Divider } from './AdminFields';
import { Save, AlertCircle } from 'lucide-react';

export default function StoryboardAdmin() {
  const { site, updateSect } = useSite();
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (site?.storyboard) {
      setData(site.storyboard);
    }
  }, [site]);

  if (!data) return <div>Loading...</div>;

  const handleSave = async () => {
    setSaving(true);
    await updateSect('storyboard', data);
    setSaving(false);
  };

  const updateItem = (id, key, value) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [key]: value } : item)
    }));
  };

  return (
    <SectionWrap title="Storyboard (Pinboard)">
      <div style={{ background: 'var(--ink-2)', padding: '16px', borderRadius: '4px', marginBottom: '24px', fontSize: '14px', color: 'var(--mist)' }}>
        <AlertCircle size={16} style={{display:'inline', verticalAlign:'-3px', marginRight:'6px'}}/>
        <strong>Layout Notice:</strong> The storyboard collage has a fixed number of layout slots to maintain its complex design. You can edit the content of each slot below, but you cannot add or remove slots.
      </div>

      <Row>
        <Field label="Enable Section">
          <input 
            type="checkbox" 
            checked={data.enabled} 
            onChange={(e) => setData({ ...data, enabled: e.target.checked })} 
          />
        </Field>
      </Row>
      <Row>
        <Field label="Section Title">
          <Input value={data.title} onChange={v => setData({...data, title: v})} />
        </Field>
        <Field label="Subtitle / Mono text">
          <Input value={data.subtitle} onChange={v => setData({...data, subtitle: v})} />
        </Field>
      </Row>
      <Row>
        <Field label="Legend Left">
          <Input value={data.legendLeft} onChange={v => setData({...data, legendLeft: v})} />
        </Field>
        <Field label="Legend Right">
          <Input value={data.legendRight} onChange={v => setData({...data, legendRight: v})} />
        </Field>
      </Row>
      
      <Divider />
      <h3>Storyboard Items (Slots)</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
        {data.items.map((item, index) => {
          if (item.type === 'photo') {
            return (
              <div key={item.id} style={{ padding: '16px', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--paper)' }}>Slot {index + 1}: Photo</div>
                <Row>
                  <Field label="Image URL">
                    <Input value={item.url} onChange={v => updateItem(item.id, 'url', v)} />
                  </Field>
                  <Field label="Pin Color">
                    <select 
                      value={item.pin} 
                      onChange={e => updateItem(item.id, 'pin', e.target.value)}
                      style={{ width: '100%', padding: '8px', background: 'var(--ink-2)', color: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '4px' }}
                    >
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Use vibrant colors?">
                    <input 
                      type="checkbox" 
                      checked={item.color} 
                      onChange={e => updateItem(item.id, 'color', e.target.checked)} 
                    />
                    <span style={{marginLeft: '8px', fontSize: '12px', color: 'var(--mist)'}}>Check to bypass grayscale filter.</span>
                  </Field>
                </Row>
              </div>
            );
          } else if (item.type === 'sticky') {
            return (
              <div key={item.id} style={{ padding: '16px', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--gold)' }}>Slot {index + 1}: Sticky Note</div>
                <Field label="Note Text (supports <br/>)">
                  <Input value={item.text} onChange={v => updateItem(item.id, 'text', v)} />
                </Field>
              </div>
            );
          } else if (item.type === 'clipping') {
            return (
              <div key={item.id} style={{ padding: '16px', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#8a8272' }}>Slot {index + 1}: Clipping (Newspaper cut)</div>
                <Row>
                  <Field label="Kicker (small text)">
                    <Input value={item.kicker} onChange={v => updateItem(item.id, 'kicker', v)} />
                  </Field>
                  <Field label="Headline">
                    <Input value={item.title} onChange={v => updateItem(item.id, 'title', v)} />
                  </Field>
                </Row>
                <Field label="Paragraph">
                  <Input value={item.text} onChange={v => updateItem(item.id, 'text', v)} />
                </Field>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ background: 'var(--gold)', color: 'var(--ink)', padding: '10px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Storyboard'}
        </button>
      </div>
    </SectionWrap>
  );
}
