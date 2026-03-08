"use client";
import React from 'react';
import MagicBento, { BentoCardProps } from './MagicBento';
import {
    SearchIllustration,
    AlertIllustration,
    AnalyticsIllustration,
    MatchingIllustration,
    ShieldIllustration,
    BiddingIllustration,
} from './FeatureIllustrations';

const featuresData: BentoCardProps[] = [
    {
        title: 'Smart Property Search',
        description: 'Find exactly what your clients need with advanced filters for location, budget, property type, and amenities.',
        label: 'Search',
        className: 'md:col-span-1',
        illustration: <SearchIllustration />,
        color: '59, 130, 246'
    },
    {
        title: 'Instant Alerts',
        description: 'Get notified the moment a matching property is listed. Never miss an opportunity with real-time alerts.',
        label: 'Alerts',
        className: 'md:col-span-1',
        illustration: <AlertIllustration />,
        color: '245, 158, 11'
    },
    {
        title: 'Performance Analytics',
        description: 'Track your deals, conversions, and growth with detailed insights. Interactive charts and reports for data-driven decisions.',
        label: 'Analytics',
        className: 'md:col-span-2 md:row-span-2',
        illustration: <AnalyticsIllustration />,
        color: '168, 85, 247'
    },
    {
        title: 'Lightning Fast Matching',
        description: 'Our AI matches your requirements with available listings instantly. Let intelligent algorithms do the heavy lifting.',
        label: 'AI Matching',
        className: 'md:col-span-2 md:row-span-2',
        illustration: <MatchingIllustration />,
        color: '244, 63, 94'
    },
    {
        title: 'Verified Brokers Only',
        description: 'Every broker on the platform is verified. Deal with confidence knowing you connect with legitimate professionals.',
        label: 'Trust',
        className: 'md:col-span-1',
        illustration: <ShieldIllustration />,
        color: '52, 211, 153'
    },
    {
        title: 'Boosted Proposals',
        description: 'Bid credits to get top listing positions and attract buyers.',
        label: 'Bidding',
        className: 'md:col-span-1',
        illustration: <BiddingIllustration />,
        color: '139, 92, 246'
    }
];

const Features = () => {
    return (
        <section id="features" className="md:py-24 py-8 px-4 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-foreground">
                        Everything You Need to Scale Your Business.
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        Powerful tools designed specifically for real estate brokers. Built by brokers, for brokers.
                    </p>
                </div>

                <div className="flex justify-center w-full">
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
