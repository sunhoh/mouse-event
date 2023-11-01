const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
};

export const mouseMoveBoundary = ( x: number, y: number, boundary: DOMRect, box: DOMRect, margin: number )  =>{
    return {
        rangeX: inrange(
            x,
            Math.floor(-boundary.width / 2 + box.width / 2 + margin),
            Math.floor(boundary.width / 2 - box.width / 2 - margin),
        ),
        rangeY: inrange(
            y,
            Math.floor(-boundary.height / 2 + box.height / 2 + margin),
            Math.floor(boundary.height / 2 - box.height / 2 - margin),
        ) 
    }

}
