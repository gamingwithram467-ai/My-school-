import React from 'react';
import Section from './Section';

const Contact: React.FC = () => {
  return (
    <>
        <Section id="contact" title="Contact Information">
            <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                <p><strong>Address:</strong> Mango, Jamshedpur, Jharkhand 831012, India</p>
                <p>
                    <a href="https://www.google.com/maps?q=Guru+Nanak+High+School,+Mango,+Jamshedpur,+Jharkhand,+India" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:underline">View Location on Google Maps</a>
                    <span className="text-sm italic text-gray-500 dark:text-gray-400 ml-2">(opens in new tab)</span>
                </p>
                <p><strong>Phone:</strong> <a href="tel:+917870752669" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:underline">+91 78707 52669</a></p>
                <p><strong>Email:</strong> [Email not provided]</p>
                <p><strong>Admission Office Hours:</strong> 9:00 a.m. to 2:00 p.m.</p>
            </div>
        </Section>
        <Section title="Quick Links">
            <ul className="space-y-2 text-lg">
                <li>
                    <a href="https://gamingwithram467-ai.github.io/gurunanak-high-school_4/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:underline">School Website</a>
                    <span className="text-sm italic text-gray-500 dark:text-gray-400 ml-2">(opens in new tab)</span>
                </li>
                <li><a href="#admission" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:underline">Admission Form</a></li>
            </ul>
        </Section>
    </>
  );
};

export default Contact;