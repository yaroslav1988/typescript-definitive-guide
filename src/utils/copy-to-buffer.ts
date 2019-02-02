

export function copyToBuffer(text: string): void {
    const input: HTMLInputElement = document.createElement(
        'input'
    ) as HTMLInputElement;
    const focus: HTMLElement = document.activeElement as HTMLElement;

    input.value = text;

    document.body.appendChild(input);

    input.select();

    document.execCommand('copy');
    document.body.removeChild(input);

    focus.focus();
}

type CopyToBuffer = typeof copyToBuffer;
type CopyToBufferWrapper = ( text: string ) => ReturnType<CopyToBuffer>;

export function copyToBufferWithPrefixDecorator(prefix:string): CopyToBufferWrapper {
    return ( text: string ) => copyToBuffer( prefix + text );
}