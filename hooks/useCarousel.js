import { useState } from "react";

const useCarousel = (props) => {
  const imageList = props.imageList;
  const [counter, setCounter] = useState(0);
  const handleNextBtn = () => {
    if (counter === imageList.length - 1) {
      setCounter(0);
    }

    if (counter >= imageList.length - 1) return;
    const next = counter + 1;
    setCounter(next);
  };

  const handlePreviousBtn = () => {
    if (counter === 0) {
      setCounter(imageList.length - 1);
    } else {
      setCounter(counter - 1);
    }
  };

  return { counter, setCounter, handleNextBtn, handlePreviousBtn };
};
export default useCarousel;
