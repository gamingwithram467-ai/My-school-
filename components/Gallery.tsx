import React from 'react';
import Section from './Section';

const galleryImages = [
  { src: 'https://picsum.photos/seed/school1/600/400', alt: 'School building front view', caption: 'Our Main Campus' },
  { src: 'https://picsum.photos/seed/school2/600/400', alt: 'Students in a classroom', caption: 'Interactive Classrooms' },
  { src: 'https://picsum.photos/seed/school3/600/400', alt: 'School library with students reading', caption: 'Well-Stocked Library' },
  { src: 'https://picsum.photos/seed/school4/600/400', alt: 'Students playing sports on the field', caption: 'Annual Sports Day' },
  { src: 'https://picsum.photos/seed/school5/600/400', alt: 'Science lab with equipment', caption: 'Modern Science Lab' },
  { src: 'https://picsum.photos/seed/school6/600/400', alt: 'Students participating in a cultural event', caption: 'Cultural Festivities' },
  { src: 'https://picsum.photos/seed/school7/600/400', alt: 'School playground with children', caption: 'Spacious Playground' },
  { src: 'https://picsum.photos/seed/school8/600/400', alt: 'Art and craft exhibition', caption: 'Student Art Exhibition' },
];

const Gallery: React.FC = () => {
  return (
    <Section id="gallery" title="School Gallery">
      <p className="mb-8 text-lg text-gray-600">
        A glimpse into the life and facilities at Guru Nanak High School.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="group overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4 bg-white">
              <p className="text-center text-gray-700 font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Gallery;
