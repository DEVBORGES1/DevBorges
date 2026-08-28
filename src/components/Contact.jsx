import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'João Vitor'
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            }, (err) => {
                console.log('FAILED...', err);
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            });
    };

    return (
        <section id="contact" className="contact">
            <h2>Contato</h2>
            <div className="contact-container">
                <div className="contact-info">
                    <h3>Vamos construir algo incrível juntos?</h3>
                    <p>Estou sempre aberto a novas oportunidades e parcerias. Sinta-se à vontade para me mandar uma mensagem!</p>

                    <div className="contact-socials">
                        <a href="https://github.com/DEVBORGES1" target="_blank" rel="noopener noreferrer" className="social-btn github">
                            <FaGithub /> <span>GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/joão-vitor-53875a1a1" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                            <FaLinkedin /> <span>LinkedIn</span>
                        </a>
                        <a href="https://wa.me/5549999685965" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                            <FaWhatsapp /> <span>WhatsApp</span>
                        </a>
                        <a href="mailto:joaovitorpereira.10112@gmail.com" className="social-btn email">
                            <FaEnvelope /> <span>Email</span>
                        </a>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Seu Nome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Seu Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Sua Mensagem"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                    </button>
                    {status === 'success' && <p className="status-msg success">Mensagem enviada com sucesso!</p>}
                    {status === 'error' && <p className="status-msg error">Erro ao enviar. Tente novamente.</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
