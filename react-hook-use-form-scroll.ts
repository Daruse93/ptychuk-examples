import { useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { useOrderedNodes } from 'react-register-nodes';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';

/* HELPERS */

// values are taken from https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
enum EDocumentPosition {
    PRECEDING = 2,
    FOLLOWING = 4,
    CONTAINS = 8,
    CONTAINED_BY = 16
}

function sortNodes(nodes: HTMLElement[]) {
    const sorted = nodes
        .map((n) => ({
            domNode: findDOMNode(n) as HTMLElement,
            reactNode: n
        }))
        .sort((a, b) => {
            const posCompare = a.domNode.compareDocumentPosition(b.domNode);

            if (posCompare & EDocumentPosition.FOLLOWING || posCompare & EDocumentPosition.CONTAINED_BY) {
                // a < b
                return -1;
            }

            if (posCompare & EDocumentPosition.PRECEDING || posCompare & EDocumentPosition.CONTAINED_BY) {
                // a > b
                return 1;
            }

            return 0;
        });

    return sorted.map((n) => n.reactNode);
}

/* HOOKS */

export function useFormScrollIfNeeded() {
    const ordered = useOrderedNodes(sortNodes);

    const [shouldCheckForScroll, setShouldCheckForScroll] = useState(false);

    useEffect(
        () => {
            if (shouldCheckForScroll && ordered.length > 0) {
                const firstNode = ordered[0];

                smoothScrollIntoView(findDOMNode(firstNode) as Element, {
                    scrollMode: 'if-needed',
                    block: 'center',
                    inline: 'start'
                });

                if (firstNode.focus) {
                    firstNode.focus();
                }

                setShouldCheckForScroll(false);
            }
        },
        [shouldCheckForScroll, ordered]
    );

    return setShouldCheckForScroll;
}