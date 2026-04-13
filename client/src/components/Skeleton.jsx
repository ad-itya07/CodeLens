import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
    );
};

export default Skeleton;
