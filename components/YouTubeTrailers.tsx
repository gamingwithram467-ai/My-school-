import React from 'react';
import Section from './Section';

const videos = [
  { videoId: 'M7lc1UVf-VE', title: 'Mastering Tenses for Fluent English' },
  { videoId: '8S0FDjFBj8o', title: 'Common Grammar Mistakes to Avoid' },
  { videoId: 'd_q_d-0N6oI', title: 'Advanced Vocabulary for Competitive Exams' },
  { videoId: 'O_9o114p7z8', title: 'How to Improve Your Spoken English' },
];

const YouTubeTrailers: React.FC = () => {
  return (
    <Section id="youtube-trailers" title="Learn English with Rakesh Ojha">
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Enhance your English skills with video lessons from the popular YouTube channel, "English learning with Rakesh Ojha."
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default YouTubeTrailers;