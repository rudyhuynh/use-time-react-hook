declare module 'use-time'{
    export function useTime({
        [range]: string | function,
        [interval]: string | number
    }): [number]
}