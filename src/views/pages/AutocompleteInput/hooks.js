import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [currentValue, setCurrentValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(currentValue);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentValue, delay]);

    return [currentValue, debouncedValue, setCurrentValue];
}

export default useDebounce;