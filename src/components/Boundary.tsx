import React from 'react';

export default React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(function Boundary(
  props,
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={
        'h-[360px] overflow-hidden rounded-xl bg-gray-200 dark:bg-[#121212] ' + props.className
      }
    />
  );
});