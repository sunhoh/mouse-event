export const inrange = (v: number, min: number, max: number) => {
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

export default function registDragEvent(
  onDragChange: (deltaX: number, deltaY: number) => void,
  stopPropagation?: boolean,
) {

  return {
    onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      if (stopPropagation) clickEvent.stopPropagation();

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.screenX - clickEvent.screenX;
        const deltaY = moveEvent.screenY - clickEvent.screenY;

        onDragChange(deltaX, deltaY);
      };

      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    },
  };
}
