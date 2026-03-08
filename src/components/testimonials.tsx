import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        initials: "RS",
        name: "Rajesh Sharma",
        role: "Property Dealer",
        location: "Mumbai",
        content: "Brokwise has completely transformed my business. I closed 15 deals last month just through broker connections I made on this platform. The ROI is incredible!"
    },
    {
        initials: "PM",
        name: "Priya Mehta",
        role: "Real Estate Agent",
        location: "Bangalore",
        content: "As a solo agent, I always struggled to access premium listings. Now I have a network of 200+ brokers who share deals with me. My income has doubled in 6 months."
    },
    {
        initials: "AP",
        name: "Amit Patel",
        role: "Agency Owner",
        location: "Ahmedabad",
        content: "Managing my team of 12 agents was a nightmare. Brokwise's dashboard gives me complete visibility. We've improved our closure rate by 40% since joining."
    },
    {
        initials: "SR",
        name: "Sunita Reddy",
        role: "Independent Broker",
        location: "Hyderabad",
        content: "The instant alerts feature alone is worth the subscription. I got a client their dream home within 2 days because I was the first to know about the listing!"
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="md:py-24 py-4 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-4">
                        Trusted by Real Estate Professionals
                    </h2>
                    <p className="text-lg text-muted-foreground font-light">
                        See how Brokwise is helping brokers and agents across India close more deals and grow their business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group bg-card hover:bg-card/50 border border-border/50 hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-primary/20 text-primary"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-muted-foreground font-light leading-relaxed mb-8 min-h-[100px]">
                                &apos;{testimonial.content}&apos;
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-medium text-sm shrink-0">
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
        </section>
    );
};

export default Testimonials;
