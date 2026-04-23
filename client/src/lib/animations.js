import { useState, useEffect } from 'react';

// ============================================
// useCountUp Hook
// ============================================
export const useCountUp = (target, duration = 1.5) => {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (target === 0) {
            setDisplay(0);
            return;
        }

        let start = 0;
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplay(current);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [target, duration]);

    return display;
};

// ============================================
// Shared Framer Motion Variants
// ============================================

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const cardEntrance = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export const scaleIn = {
    initial: { scale: 0, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
    },
};

export const pageTransition = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

export const modalOverlay = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const modalContent = {
    initial: { opacity: 0, scale: 0.92, y: 20 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 300,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        y: 20,
        transition: { duration: 0.2 },
    },
};

export const messageEntrance = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

// Typing indicator dots
export const typingDot = (delay = 0) => ({
    animate: {
        y: [0, -6, 0],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay,
            ease: 'easeInOut',
        },
    },
});
