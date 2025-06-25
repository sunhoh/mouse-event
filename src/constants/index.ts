export const PATH = {
    HOME:'/',
    DRAG: '/drag',
    CAROUSEL:'/carousel',
    SCROLLING:'/scrolling'
  } as const;
  
  interface Page {
    href: string;
    title: string;
  }
  export const PAGES: Page[] = [
    {
        href: PATH.HOME,
        title: 'Home',
      },
    {
      href: PATH.DRAG,
      title: 'Drag',
    },
    {
      href: PATH.CAROUSEL,
      title: 'Carousel',
    },
    {
      href: PATH.SCROLLING,
      title: 'Scrolling',
    },
  ];
  