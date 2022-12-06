export function ConvertStringToHTMLAchor(str: string) {
// convert string to dom element
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    const a = doc.body.firstChild as HTMLAnchorElement;
    return a;
}