
import React from 'react';
import Section from './Section';

const events = [
    { festival: 'Makar Sankranti / Pongal', date: 'January 14', description: 'Celebration of the harvest festival with kite flying and sweets.' },
    { festival: 'Republic Day', date: 'January 26', description: 'National holiday commemorating India\'s constitution.' },
    { festival: 'Holi', date: 'March 14', description: 'Festival of colors, symbolizing the victory of good over evil.' },
    { festival: 'Ram Navami', date: 'March 30', description: 'Birthday of Lord Rama, celebrated with processions and prayers.' },
    { festival: 'Mahavir Jayanti', date: 'April 10', description: 'Birthday of Lord Mahavira, founder of Jainism.' },
    { festival: 'Good Friday', date: 'April 18', description: 'Christian festival marking the crucifixion of Jesus Christ.' },
    { festival: 'Eid-ul-Fitr', date: 'April 30', description: 'End of Ramadan, celebrated with prayers and feasts. (Date based on lunar calendar.)' },
    { festival: 'Buddha Purnima', date: 'May 12', description: 'Birthday of Gautama Buddha.' },
    { festival: 'Rakshabandhan', date: 'August 9', description: 'Festival celebrating the bond between brothers and sisters.' },
    { festival: 'Janmashtami', date: 'August 16', description: 'Birthday of Lord Krishna, celebrated with fasting and dances.' },
    { festival: 'Ganesh Chaturthi', date: 'September 5', description: 'Celebration of Lord Ganesha\'s birth with idol worship.' },
    { festival: 'Dussehra / Vijayadashami', date: 'October 2', description: 'Victory of good over evil, marked by Ram Lila and effigy burning.' },
    { festival: 'Diwali', date: 'October 20', description: 'Festival of lights, symbolizing the triumph of light over darkness.' },
    { festival: 'Guru Nanak Jayanti', date: 'November 5', description: 'Birthday of Guru Nanak, founder of Sikhism.' },
    { festival: 'Christmas', date: 'December 25', description: 'Christian festival celebrating the birth of Jesus Christ.' },
];

const Events: React.FC = () => {
    return (
        <Section id="events" title="Event Calendar 2025">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Festival</th>
                            <th scope="col" className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date (2025)</th>
                            <th scope="col" className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {events.map((event, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b">{event.festival}</td>
                                <td className="py-3 px-4 border-b">{event.date}</td>
                                <td className="py-3 px-4 border-b">{event.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default Events;