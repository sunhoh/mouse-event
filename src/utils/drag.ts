export const nomal = (e: MouseEvent, {initX, initY}: any) => {
    
    const x = e.screenX - initX
    const y = e.screenY - initY
      return { x , y }
}


