import { useSite } from '../context/SiteContext';
import { Camera, Mail, Phone, Send, ExternalLink } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { site } = useSite();
  const { contact, links } = site;

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
      <div className="contact-form">
        <div className="f-row">
          <div className="f-field">
            <label className="f-label" htmlFor="contact-name">Your Name</label>
            <input className="f-input" id="contact-name" type="text" placeholder="John Doe" />
          </div>
          <div className="f-field">
            <label className="f-label" htmlFor="contact-email">Email</label>
            <input className="f-input" id="contact-email" type="email" placeholder="you@email.com" />
          </div>
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="contact-service">Service Needed</label>
          <input className="f-input" id="contact-service" type="text" placeholder="Lightroom edit / Video / Brand collab..." />
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="contact-budget">Budget (INR / USD)</label>
          <input className="f-input" id="contact-budget" type="text" placeholder="e.g. ₹2000 / $50" />
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="contact-details">Project Details</label>
          <input className="f-input" id="contact-details" type="text" placeholder="Tell me about your project..." />
        </div>
        <button className="btn-gold" style={{ alignSelf: 'flex-start', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Send Message <Send size={14} />
        </button>
      </div>
    </section>
  );
}
