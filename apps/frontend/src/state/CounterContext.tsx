import React, { createContext, useContext, useMemo, useState } from 'react';

type CounterContextValue = {
    counter: number;
    increment: () => void;
};

const CounterContext = createContext<CounterContextValue | undefined>(undefined);

export function CounterProvider({ children }: { children: React.ReactNode }) {
    const [counter, setCounter] = useState(0);

    function increment() {
        setCounter((prev) => prev + 1);
    }

    const value = useMemo(() => ({ counter, increment }), [counter]);
    
    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
}

export function useCounter() {
    const ctx = useContext(CounterContext);
    if (!ctx)throw new Error("useCounter must be used within a CounterProvider");
    return ctx;
}