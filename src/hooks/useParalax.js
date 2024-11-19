import { useEffect } from 'react';

const useParallax = (elementSelector) => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const element = document.querySelector(elementSelector);
            if (!element) return;

            const { clientX: mouseX, clientY: mouseY } = e;
            const centerX = element.offsetWidth / 2;
            const centerY = element.offsetHeight / 2;

            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;

            element.style.backgroundPosition = `${50 + deltaX * 1}% ${50 + deltaY * .5}%`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [elementSelector]);
};

export default useParallax;
