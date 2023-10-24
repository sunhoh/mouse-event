function range(max: number, min: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rendomAnimation(ref:any): void {
  for(let i=0, len = ref.current.length; i<len; i++){
    let top = range(0, 350);
    let left = range(0, 530);
    
    if(ref.current[i] !== null) {
      ref.current[i].style.top = `${top}px`;
      ref.current[i].style.left = `${left}px`;
    }
    
  }
}