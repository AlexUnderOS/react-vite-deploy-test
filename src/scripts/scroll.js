export const scrollToElement = (ref) => {
    if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};