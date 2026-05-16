import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Camera, Mail, Phone, Send, ExternalLink, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { site } = useSite();
  const { contact, links } = site;

  const [formData, setFormData] = useState({
    name: '', email: '', service: '', budget: '', details: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id.replace('contact-', '')]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      setErrMsg('Name, Email, and Details are required.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      
      setStatus('success');
      setFormData({ name: '', email: '', service: '', budget: '', details: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div>
        <div className="sec-label">{contact.label}</div>
        <div className="contact-big">
          {contact.bigLine1}<br />
          {contact.bigLine2}<br />
          <span className="g">{contact.bigLine3}</span>
        </div>
        <p className="contact-desc">{contact.description}</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginTop:'2rem' }}>
          <a className="contact-ig" href={contact.igLink || links.instagram} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Camera size={18} /> {contact.igHandle} <ExternalLink size={14} style={{ opacity: 0.5 }} />
          </a>
          {contact.email && (
            <a className="contact-ig" href={`mailto:${contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} /> {contact.email}
            </a>
          )}
          {contact.phone && (
            <a className="contact-ig" href={`tel:${contact.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} /> {contact.phone}
            </a>
          )}
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="f-row">
          <div className="f-field">
            <label className="f-label" htmlFor="contact-name">Your Name *</label>
            <input className="f-input" id="contact-name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="f-field">
            <label className="f-label" htmlFor="contact-email">Email *</label>
            <input className="f-input" id="contact-email" type="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="contact-service">Service Needed</label>
          <input className="f-input" id="contact-service" type="text" placeholder="Lightroom edit / Video / Brand collab..." value={formData.service} onChange={handleChange} />
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="contact-budget">Budget (INR / USD)</label>
          <input className="f-input" id="contact-budget" type="text" placeholder="e.g. ₹2000 / $50" value={formData.budget} onChange={handleChange} />
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="contact-details">Project Details *</label>
          <textarea className="f-input" id="contact-details" placeholder="Tell me about your project..." value={formData.details} onChange={handleChange} required rows="4" style={{ resize: 'vertical' }}></textarea>
        </div>
        
        {status === 'error' && (
          <div className="f-error"><AlertCircle size={14} /> {errMsg}</div>
        )}
        {status === 'success' && (
          <div className="f-success"><CheckCircle size={14} /> Message sent successfully! I'll be in touch soon.</div>
        )}

        <button className="btn-gold" type="submit" disabled={status === 'loading'} style={{ alignSelf: 'flex-start', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', opacity: status === 'loading' ? 0.7 : 1 }}>
          {status === 'loading' ? (
            <><Loader2 size={14} className="spin" /> Sending...</>
          ) : (
            <>Send Message <Send size={14} /></>
          )}
        </button>
      </form>
    </section>
  );
}
