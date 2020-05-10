import { useState, useRef, useEffect } from 'react'

const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // if(!elementRef){return }
    // if(!elementRef.current){return}
    // console.log("asas",elementRef.current)
    setWidth(elementRef.current.clientWidth);
  }, [elementRef.current]);

  return { width, elementRef };
}

export default useSizeElement;