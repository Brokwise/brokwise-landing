"use client"
import React from 'react';
import { Star } from 'lucide-react';
import HexPattern from './HexPattern';

const testimonials = [
    {
        initials: "AJ",
        name: "Amit Jain",
        role: "Residential Broker",
        location: "Jaipur",
        content: "Through Brokwise, I started receiving enquiries from areas I never operated in before. Without opening a new branch, my working market expanded."
    },
    {
        initials: "SY",
        name: "Sandeep Yadav",
        role: "Property Consultant",
        location: "Gurugram",
        content: "Instead of waiting for leads, I now see active requirements daily. Even if one deal doesn&apos;t work, there are always new opportunities available."
    },
    {
        initials: "PV",
        name: "Priya Verma",
        role: "Residential Broker",
        location: "Noida",
        content: "I like that my contact details are not shared automatically. I decide when to share. This gives better control and avoids time-wasters."
    },
    {
        initials: "MP",
        name: "Mehul Patel",
        role: "Commercial Broker",
        location: "Jaipur",
        content: "The best part is that only verified brokers are allowed. No fake listings, no unnecessary spam. It feels like a professional network."
    },
    {
        initials: "RS",
        name: "Rajesh Sharma",
        role: "Plot Consultant",
        location: "Jaipur",
        content: "Earlier I had to make 30-40 calls daily to match requirements. On Brokwise, I just post an enquiry and serious brokers send proposals. It has saved me a lot of time."
    },
    {
        initials: "MF",
        name: "Rajesh Kumar",
        role: "Plot Specialist",
        location: "Jaipur",
        content: "I was earlier dependent only on my local contacts. Now I&apos;m getting access to premium requirements from other verified brokers. My average deal size has improved."
    }
];

const Testimonials = () => {
    const marqueeTestimonials = [...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="md:py-24 py-4 bg-background relative overflow-hidden">
            <HexPattern id="hexTestimonials" fade="horizontal" opacity={0.04} size={60} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#fcb542] mb-4">
                        Trusted by Real Estate Professionals
                    </h2>
                    <p className="text-lg text-muted-foreground font-light">
                        See how Brokwise is helping brokers and agents across India close more deals and grow their business.
                    </p>
                </div>

                <div className="relative overflow-hidden marquee">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />

                    <div className="marquee-track flex w-max gap-6 py-2">
                        {marqueeTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.name}-${index}`}
                                className="group bg-card hover:bg-card/80 border border-[#fcb542]/10 hover:border-[#fcb542]/25 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.08)] hover:-translate-y-1 w-[320px] md:w-[360px] shrink-0 flex flex-col"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-[#fcb542]/80 text-[#fcb542]"
                                        />
                                    ))}
                                </div>

                                <p className="text-muted-foreground font-light leading-relaxed mb-8 min-h-[140px]">
                                    &apos;{testimonial.content}&apos;
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-[#fcb542]/10 border border-[#fcb542]/20 flex items-center justify-center text-[#fcb542] font-medium text-sm shrink-0">
                                        {testimonial.initials}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-medium text-sm">
                                            {testimonial.name}
                                        </span>
                                        <span className="text-muted-foreground text-xs font-light">
                                            {testimonial.role}, {testimonial.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .marquee-track {
                    animation: marquee 45s linear infinite;
                }

                .marquee:hover .marquee-track {
                    animation-play-state: paused;
                }

                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
