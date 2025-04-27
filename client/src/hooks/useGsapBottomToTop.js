import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const useGsapBottomToTop = (className) => {
    // Store ScrollTrigger instances for cleanup
    const scrollTriggers = useRef([]);

    useEffect(() => {
        // Clear any existing animations
        if (scrollTriggers.current.length > 0) {
            scrollTriggers.current.forEach((trigger) => trigger.kill());
            scrollTriggers.current = [];
        }

        // Function to set up animations
        const setupAnimations = () => {
            // Select all elements with the className
            const elements = document.querySelectorAll(`.${className}`);

            if (elements.length === 0) {
                // If no elements found, try again after a short delay
                setTimeout(setupAnimations, 100);
                return;
            }

            // Set up animations for each element
            elements.forEach((element) => {
                // Reset styles in case the element was previously animated
                gsap.set(element, {
                    y: 100,
                    opacity: 0,
                    visibility: "visible",
                });

                // Create the animation
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%", // When the top of the element hits 85% from the top of viewport
                        toggleActions: "play none none reverse", // Play on enter, reset on leave
                        // markers: true, // Uncomment for debugging
                        onEnter: () => {
                            // Optional callback when element enters view
                        },
                        onLeave: () => {
                            // Optional callback when element leaves view
                        },
                        onEnterBack: () => {
                            // Optional callback when scrolling back up and element enters view
                        },
                        onLeaveBack: () => {
                            // Optional callback when scrolling back up and element leaves view
                        },
                    },
                });

                tl.to(element, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                });

                // Store the ScrollTrigger instance for cleanup
                if (tl.scrollTrigger) {
                    scrollTriggers.current.push(tl.scrollTrigger);
                }
            });
        };

        // Initial setup with small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            setupAnimations();
        }, 100);

        // Clean up function
        return () => {
            clearTimeout(timer);

            // Kill all ScrollTrigger instances when component unmounts
            scrollTriggers.current.forEach((trigger) => trigger.kill());
            scrollTriggers.current = [];
        };
    }, [className]);
};

export default useGsapBottomToTop;
