import React ,{useState} from 'react';
import {Carousel} from 'react-responsive-carousel';

const ImageCarousel = ({ images })=>{
  const [activeStep,setActiveStep] = useState(0);
  const maxSteps = images.length;
  const handleNext = ()=>{
    setActiveStep((prevActiveStep)=> prevActiveStep +1); //jump when we click arrow
  };

  const handleBack = ()=>{
    setActiveStep((prevActiveStep)=> prevActiveStep -1); //jump when we click arrow

  }
  const handleStepChange = (step) =>{
    setActiveStep(step);
  };
  retun (
      <Carousel>
        
      </Carousel>
  );


}
export default ImageCarousel;