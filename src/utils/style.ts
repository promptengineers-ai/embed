
export function setStyles(element: HTMLElement, styles: Record<string, string>): void {
    Object.keys(styles).forEach(property => {
        // Using the bracket notation to access properties since we're using a string index
        element.style[property as any] = styles[property];
    });
}