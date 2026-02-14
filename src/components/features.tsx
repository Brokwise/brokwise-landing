"use client";
import React from 'react';
import { Search, Bell, BarChart3, Zap, ShieldCheck, MessageCircle } from 'lucide-react';

interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const featuresData: FeatureProps[] = [
    {
        title: 'Smart Property Search',
        description: 'Find exactly what your clients need with advanced filters for location, budget, property type, and more.',
        icon: <Search className="w-6 h-6" />,
        color: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 dark:bg-purple-900/20  dark:text-purple-400 border border-purple-200 dark:border-purple-800'
    },
    {
        title: 'Instant Alerts',
        description: 'Get notified the moment a matching property is listed. Never miss an opportunity again.',
        icon: <Bell className="w-6 h-6" />,
        color: 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800'
    },
    {
        title: 'Performance Analytics',
        description: 'Track your deals, conversions, and growth with detailed insights.',
        icon: <BarChart3 className="w-6 h-6" />,
        color: 'bg-gradient-to-r from-green-100 to-green-200 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800'
    },
    {
        title: 'Lightning Fast Matching',
        description: 'Our AI matches your requirements with available listings instantly.',
        icon: <Zap className="w-6 h-6" />,
        color: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
    },
    {
        title: 'Verified Brokers Only',
        description: 'Every broker on the platform is verified. Deal with confidence and trust.',
        icon: <ShieldCheck className="w-6 h-6" />,
        color: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
    },
    {
        title: 'In-App Chat',
        description: 'Negotiate and communicate with other brokers without leaving the platform.',
        icon: <MessageCircle className="w-6 h-6" />,
        color: 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400 border border-teal-200 dark:border-teal-800'
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuresData.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${feature.color} transition-colors`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
