/**
 * Dadata helps a person quickly enter correct data: addresses, details of companies and banks, full name and email.
 */
import { useState, useCallback } from 'react';

type TFetcherParams = {
    query: string;
    count?: number;
};

export function useDadata<T extends object>(
    fetcher: (params: TFetcherParams) => Promise<T[]>,
    errorLogger: (e: Error) => Promise<void>,
    maxSuggestionsCount = 5
): {
    suggestions: T[];
    search: (value: string) => void;
    cleanSuggestions: () => void;
} {
    const [suggestions, setSuggestions] = useState<T[]>([]);
    const cleanSuggestions = useCallback(() => setSuggestions([]), []);

    const search = useCallback((value: string) => {
        if (!value) {
            return;
        }

        fetcher({
            query: value,
            count: maxSuggestionsCount
        }).then((result) => {
            setSuggestions(result);
        }).catch((e) => {
            if (e.message === 'aborted') {
                cleanSuggestions();

                return;
            }
            errorLogger(e);
        });
    }, [maxSuggestionsCount]);

    return {
        suggestions,
        search,
        cleanSuggestions
    };
}