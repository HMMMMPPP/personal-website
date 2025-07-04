import React, { useState, useEffect } from 'react';
import './ContactPanel.css';

// --- (SVG Icons and socialPlatforms array remain the same) ---
const Icon = ({ children, viewBox = "0 0 24 24" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox={viewBox}
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="contact-icon">
        {children}
    </svg>
);
const recipient = 'delvalmoria@gmail.com';
const subject = 'Inquiry from Website';
const body = 'Hello, I have a question about your services.';
const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// --- CORRECTED socialPlatforms array ---
const socialPlatforms = [
    { name: 'LinkedIn', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>, href: 'https://www.linkedin.com/in/del-rey-valmoria-62b418337/' },
    { name: 'GitHub', icon: <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></>, href: 'https://github.com/HMMMMPPP' },
    { name: 'Email', icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>, href: mailtoLink },
    { name: 'X / Twitter', icon: <><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></>, href: 'https://x.com/DelreyValmoria' },
    { name: 'Facebook', icon: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></>, href: 'https://www.facebook.com/delreyvalmoria2024' },
    { name: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>, href: 'https://www.instagram.com/reyyvlmr/' },
    { name: 'Discord', icon: <><path d="M21.12,2.88A20.36,20.36,0,0,0,17.3,1.15a1,1,0,0,0-1,.6,13.52,13.52,0,0,0-9.42,0,1,1,0,0,0-1-.6A20.36,20.36,0,0,0,2.88,2.88,1,1,0,0,0,2.65,4,18.46,18.46,0,0,0,1.5,15.31,1,1,0,0,0,2.89,16.7a15.15,15.15,0,0,0,5.29,2.1,1,1,0,0,0,1-.67,11.39,11.39,0,0,0,5.42,0,1,1,0,0,0,1,.67,15.15,15.15,0,0,0,5.29-2.1,1,1,0,0,0,1.39-1.39A18.46,18.46,0,0,0,21.35,4,1,1,0,0,0,21.12,2.88ZM8.43,13.25A2.12,2.12,0,0,1,6.31,11.13,2.12,2.12,0,0,1,8.43,9,2.12,2.12,0,0,1,10.55,11.13,2.12,2.12,0,0,1,8.43,13.25Zm7.14,0A2.12,2.12,0,0,1,13.45,11.13,2.12,2.12,0,0,1,15.57,9a2.12,2.12,0,0,1,2.12,2.13A2.12,2.12,0,0,1,15.57,13.25Z"></path></>, href: 'https://discordapp.com/users/500479497695395842', viewBox: "0 0 24 24" },
    { name: 'Portfolio {WORKING OUT}', icon: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></>, href: '#' },
];

const ContactPanel = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const manilaTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Manila',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setTime(manilaTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('TRANSMITTING...');

        try {
            const response = await fetch('/api/contact', { // Your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message.');
            }
            
            setStatus('SIGNAL RECEIVED. STAND BY.');
            setFormData({ name: '', email: '', message: '' }); // Clear form

        } catch (error) {
            console.error('Submission error:', error);
            setStatus(`TRANSMISSION FAILED: ${error.message}`);
        } finally {
            // Clear the status message after a few seconds
            setTimeout(() => setStatus(''), 5000);
        }
    };
    
    // Determine which icon to show in the overlay based on the status message
    const getStatusIcon = () => {
        if (status.includes('TRANSMITTING')) return <div className="status-icon transmitting"></div>;
        if (status.includes('RECEIVED')) return <div className="status-icon success">✓</div>;
        if (status.includes('FAILED')) return <div className="status-icon failed">✕</div>;
        return null;
    };

    return (
        <div id="ContactUs" className="contact-panel-container">
            <div className="contact-grid">
                {/* --- Left Panel: Contact Form --- */}
                <div className="form-panel">
                    <h2 className="panel-title">Get in Touch</h2>
                    <p className="panel-subtitle">Have a project or question? Send a direct message.</p>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Your Name / Callsign</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email / Secure Channel</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <div className="form-footer">
                            <button type="submit" className="submit-button" disabled={status.includes('TRANSMITTING')}>
                                {status.includes('TRANSMITTING') ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}
                            </button>
                            {/* The old status message is now replaced by the overlay */}
                        </div>
                    </form>
                    
                    {/* --- NEW: Status Overlay --- */}
                    {status && (
                        <div className="status-overlay">
                            <div className="status-overlay-content">
                                {getStatusIcon()}
                                <p>{status}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- Right Panel: Social & Professional Links --- */}
                <div className="social-panel">
                     {/* ... (social panel content remains the same) ... */}
                    <h2 className="panel-title">Find Me Online</h2>
                    <p className="panel-subtitle">Connect on other platforms.</p>
                    <div className="social-grid">
                        {socialPlatforms.map(platform => (
                            <a href={platform.href} key={platform.name} target="_blank" rel="noopener noreferrer" className="social-link">
                                <Icon viewBox={platform.viewBox}>{platform.icon}</Icon> 
                                <span>{platform.name}</span>
                            </a>
                        ))}
                    </div>
                    <div className="location-footer">
                        <div className="location-info">
                            <Icon><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></Icon>
                            <span>Caloocan City, Metro Manila, PH</span>
                        </div>
                        <div className="time-info">
                            <span>{time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPanel;