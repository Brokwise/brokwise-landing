"use client";
import React from 'react';
import MagicBento, { BentoCardProps } from './MagicBento';
import { Search, Bell, BarChart3, Zap, ShieldCheck, MessageSquare } from 'lucide-react';

const featuresData: BentoCardProps[] = [
    {
        title: 'Smart Property Search',
        description: 'Find exactly what your clients need with advanced filters for location, budget, property type, and amenities. Our search engine is optimized for speed and precision.',
        label: 'Search',
        className: 'md:col-span-1',
        illustration: <Search className="w-24 h-24 text-blue-500" strokeWidth={1} />,
        color: '0, 0, 0' // Blue
    },
    {
        title: 'Instant Alerts',
        description: 'Get notified the moment a matching property is listed. Never miss an opportunity again with real-time push notifications and email alerts tailored to your preferences.',
        label: 'Alerts',
        className: 'md:col-span-1',
        illustration: <Bell className="w-24 h-24 text-amber-500" strokeWidth={1} />,
        color: '0, 0, 0'
    },
    {
        title: 'Performance Analytics',
        description: 'Track your deals, conversions, and growth with detailed insights. Visualize your success with interactive charts and reports that help you make data-driven decisions.',
        label: 'Analytics',
        className: 'md:col-span-2 md:row-span-2',
        illustration: <BarChart3 className="w-48 h-48 text-purple-500" strokeWidth={0.5} />,
        color: '0, 0, 0'
    },
    {
        title: 'Lightning Fast Matching',
        description: 'Our AI matches your requirements with available listings instantly. Save hours of manual searching and let our intelligent algorithms do the heavy lifting for you.',
        label: 'AI Matching',
        className: 'md:col-span-2 md:row-span-2',
        illustration: <Zap className="w-48 h-48 text-rose-500" strokeWidth={0.5} />,
        color: '0, 0, 0'
    },
    {
        title: 'Verified Brokers Only',
        description: 'Every broker on the platform is verified. Deal with confidence and trust, knowing that you are connecting with legitimate professionals in the industry.',
        label: 'Trust',
        className: 'md:col-span-1',
        illustration: <ShieldCheck className="w-24 h-24 text-emerald-500" strokeWidth={1} />,
        color: '0, 0, 0'
    },
    {
        title: 'In-App Chat',
        description: 'Negotiate and communicate with other brokers without leaving the platform. Keep all your conversations organized and secure in one place.',
        label: 'Communication',
        className: 'md:col-span-1',
        illustration: <MessageSquare className="w-24 h-24 text-sky-500" strokeWidth={1} />,
        color: '0, 0, 0'
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
                        glowColor="120, 119, 198" // Default glow color
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
