export function scrollToId(id: string): void {
    const normalizedId = id.startsWith('#') ? id.slice(1) : id;
    const element = document.getElementById(normalizedId);

    element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}
