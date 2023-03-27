export function match(path: string, current: string, match: number): boolean {
    if (match == 0) return path === current;
    const currSplit = current.split('/');
    const pathSplit = path.split('/');
    for (let i = 0; i <= match; i++) {
        if (currSplit[i] !== pathSplit[i]) return false;
    }
    return true;
}