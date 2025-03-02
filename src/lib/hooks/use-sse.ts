import { useState, useEffect, useRef } from "react";

interface SSEOptions<T> {
    url: string;
    onMessage?: (data: T) => void;
    onError?: (error: Event) => void;
    onOpen?: () => void;
}

export function useSSE<T = any>({
    url,
    onMessage,
    onError,
    onOpen,
}: SSEOptions<T>) {
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<Event | null>(null);
    const [data, setData] = useState<T | null>(null);

    const callbacksRef = useRef({ onMessage, onError, onOpen });

    useEffect(() => {
        callbacksRef.current = { onMessage, onError, onOpen };
    }, [onMessage, onError, onOpen]);

    useEffect(() => {
        const source = new EventSource(url);

        source.onopen = () => {
            console.log("SSE connection established");
            setConnected(true);
            setError(null);
            if (callbacksRef.current.onOpen) callbacksRef.current.onOpen();
        };

        source.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data) as T;
                console.log("SSE message received:", parsedData);
                setData(parsedData);
                if (callbacksRef.current.onMessage)
                    callbacksRef.current.onMessage(parsedData);
            } catch {
                console.log("SSE raw message received:", event.data);
                setData(event.data as unknown as T);
                if (callbacksRef.current.onMessage)
                    callbacksRef.current.onMessage(event.data as unknown as T);
            }
        };

        source.onerror = (event) => {
            console.error("SSE connection error:", event);
            setError(event);
            setConnected(false);
            if (callbacksRef.current.onError)
                callbacksRef.current.onError(event);
        };

        return () => {
            console.log("Closing SSE connection");
            source.close();
        };
    }, [url]);

    return { connected, error, data };
}
