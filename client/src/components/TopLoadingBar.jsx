import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const TopLoadingBar = () => {
    const { loading } = useAuth();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Only show the bar if there's a token in localStorage, 
        // meaning we are actually waiting for a session check.
        const token = localStorage.getItem('token');
        if (loading && token) {
            setShow(true);
        } else {
            // Add a small delay before hiding to make it feel smoother
            const timer = setTimeout(() => setShow(false), 500);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                        scaleX: loading ? [0, 0.7, 0.9] : 1,
                        opacity: 1
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: loading ? 30 : 0.5, // Long duration for slow backend
                        ease: "easeOut",
                        scaleX: {
                            times: [0, 0.1, 1],
                            duration: loading ? 60 : 0.5
                        }
                    }}
                    className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
                    style={{
                        background: 'linear-gradient(90deg, #2F81F7, #A371F7, #2F81F7)',
                        backgroundSize: '200% 100%',
                        boxShadow: '0 0 10px rgba(47, 129, 247, 0.5)'
                    }}
                />
            )}
        </AnimatePresence>
    );
};

export default TopLoadingBar;
