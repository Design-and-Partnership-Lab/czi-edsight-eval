/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const VERTICAL_GAP = 10;

export function setFloatingElemPosition(
    targetRect: DOMRect | null,
    floatingElem: HTMLElement,
    anchorElem: HTMLElement,
    verticalGap: number = VERTICAL_GAP
): void {
    const scrollerElem = anchorElem.parentElement;

    if (targetRect === null || !scrollerElem) {
        floatingElem.style.opacity = "0";
        floatingElem.style.transform = "translate(-10000px, -10000px)";
        return;
    }

    const floatingElemRect = floatingElem.getBoundingClientRect();
    const editorScrollerRect = scrollerElem.getBoundingClientRect();

    let top = targetRect.top - floatingElemRect.height - verticalGap;
    let left = targetRect.left;

    if (top < editorScrollerRect.top) {
        // adjusted height for link element if the element is at top
        top += floatingElemRect.height + targetRect.height + verticalGap * 2;
    }

    left += targetRect.width / 2;
    left -= floatingElemRect.width / 2;

    floatingElem.style.opacity = "1";
    floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}
