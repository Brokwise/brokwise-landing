import React from 'react';
import { Star } from 'lucide-react';

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
        role: "Brokerage Firm Owner",
        location: "Ahmedabad",
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
        name: "Mohammed Faizan",
        role: "Plot Specialist",
        location: "Hyderabad",
        content: "I was earlier dependent only on my local contacts. Now I&apos;m getting access to premium requirements from other verified brokers. My average deal size has improved."
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <p className="text-muted-foreground font-light leading-relaxed mb-8 min-h-[140px]">
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
