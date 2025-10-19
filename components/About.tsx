import React from 'react';
import Section from './Section';

const About: React.FC = () => {
  const keyFeatures = [
    'Academic Excellence',
    'Extracurricular Activities',
    'Modern Facilities',
    'Community Engagement',
  ];

  return (
    <>
      <Section id="about" title="About Us">
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Welcome to Guru Nanak High School, located in Mango, Jamshedpur. We are committed to providing quality education and fostering holistic development for our students.
        </p>
      </Section>
      <Section title="Key Features">
        <ul className="space-y-3">
          {keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-lg text-gray-700 dark:text-gray-200">{feature}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};

export default About;