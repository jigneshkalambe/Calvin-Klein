import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapStagger = (className, options = {}) => {
    const scrollTriggerRef = useRef(null);

    useEffect(() => {
        const elements = document.querySelectorAll(`.${className}`);
        if (!elements.length) return;

        const { opacity = 0, duration = 1, ease = "power3.out", stagger = 0.2, start = "top 85%", toggleActions = "play none none reverse" } = options;

        // Set initial opacity
        gsap.set(elements, {
            opacity,
            visibility: "visible",
        });

        // Create the staggered fade-in timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: elements[0],
                start,
                toggleActions,
            },
        });

        tl.to(elements, {
            opacity: 1,
            duration,
            ease,
            stagger,
        });

        scrollTriggerRef.current = tl.scrollTrigger;

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
        };
    }, [className, options]);
};

export default useGsapStagger;
