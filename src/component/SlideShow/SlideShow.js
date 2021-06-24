import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function DemoCarousel(props) {
   const {images}=props;
   //console.log(images);

    const renderImage=()=>
    {
        console.log(images.length);
        if(images.length!==0)
           return(
            <Carousel> 
            {images.map((option) => (
               <div>
               <img  src={option.value} />
               {/* <p className="legend">Legend 1</p> */}
           </div>
            ))}
        </Carousel>
           )
        else 
               return( 
                 <img style={{width:"30px"}} src={process.env.PUBLIC_URL + '/noImage.jpg'}></img>
                )
    }
        return (
            <div>
           {renderImage()}
           </div>
        );
    }

