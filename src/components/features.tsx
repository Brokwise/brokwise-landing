"use client";
import React from 'react';
import MagicBento, { BentoCardProps } from './MagicBento';

// const SearchIcon = () => (
//     <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-10 translate-y-10">
//         <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M7 10H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
//         <path d="M10 7V13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
//     </svg>
// );

// const AlertIcon = () => (
//     <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-10 translate-y-10">
//         <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

// const AnalyticsIcon = () => (
//     <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-10 translate-y-10">
//         <path d="M18 20V10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M12 20V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M6 20V14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M4 20H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

// const AIIcon = () => (
//     <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-10 translate-y-10">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M12 17.77V2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.3" />
//     </svg>
// );

// const TrustIcon = () => (
//     <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-10 translate-y-10">
//         <path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

// const ChatIcon = () => (
//     <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-10 translate-y-10">
//         <path d="M21 11.5C21.0039 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87621 19.712 8.69 19.16L4 20L4.92 15.62C4.29112 14.3757 3.9829 13.0029 4.02 11.62C4.11233 9.93833 4.70686 8.33436 5.72295 7.02641C6.73903 5.71846 8.1281 4.77011 9.70265 4.30873C11.2772 3.84735 12.961 3.89531 14.524 4.44613C16.087 4.99695 17.4547 6.02429 18.44 7.39C19.2636 8.52932 19.8267 9.8474 20.07 11.23C20.09 11.32 21 11.5 21 11.5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

const featuresData: BentoCardProps[] = [
    {
        title: 'Smart Property Search',
        description: 'Find exactly what your clients need with advanced filters for location, budget, property type, and more.',
        label: 'Search',
        className: 'md:col-span-1',
        // illustration: <SearchIcon />
    },
    {
        title: 'Instant Alerts',
        description: 'Get notified the moment a matching property is listed. Never miss an opportunity again.',
        label: 'Alerts',
        className: 'md:col-span-1',
        // illustration: <AlertIcon />
    },
    {
        title: 'Performance Analytics',
        description: 'Track your deals, conversions, and growth with detailed insights.',
        label: 'Analytics',
        className: 'md:col-span-2 md:row-span-2',
        // illustration: <AnalyticsIcon />
    },
    {
        title: 'Lightning Fast Matching',
        description: 'Our AI matches your requirements with available listings instantly.',
        label: 'AI Matching',
        className: 'md:col-span-2 md:row-span-2',
        // illustration: <AIIcon />
    },
    {
        title: 'Verified Brokers Only',
        description: 'Every broker on the platform is verified. Deal with confidence and trust.',
        label: 'Trust',
        className: 'md:col-span-1',
        // illustration: <TrustIcon />
    },
    {
        title: 'In-App Chat',
        description: 'Negotiate and communicate with other brokers without leaving the platform.',
        label: 'Communication',
        className: 'md:col-span-1',
        // illustration: <ChatIcon />
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 px-4 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-foreground">
                        Everything You Need to Scale Your Business.
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        Powerful tools designed specifically for real estate brokers. Built by brokers, for brokers.
                    </p>
                </div>

                <div className="flex justify-center">
                    <MagicBento
                        cards={featuresData}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        // enableTilt={true}
                        glowColor="0, 0, 0"
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
