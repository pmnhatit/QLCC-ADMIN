import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function DemoCarousel(props) {
   const {images}=props;
   console.log(images);

        return (
            <Carousel>
                {images.map((option) => (
                   <div>
                   <img src={option.value} />
                   {/* <p className="legend">Legend 1</p> */}
               </div>
                ))}
            </Carousel>
        );
    }

