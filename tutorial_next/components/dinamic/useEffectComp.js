import React, { useEffect, useState } from 'react';

export default function useEffectAdvancedPage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handlescroll = () => {
        console.log("cliqui")
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        handlescroll();
        window.addEventListener('click', handlescroll);
        return () => { window.removeEventListener('click', handlescroll); }
    }, [])

    return (
        <div className="text-3xl text-gray-400 font-mono">
        </div>
    )
}