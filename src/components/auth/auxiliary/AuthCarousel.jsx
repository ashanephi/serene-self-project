import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from '../../../assets/images/auth/auth-carousel-img1.png'
import img2 from '../../../assets/images/auth/auth-carousel-img2.png'
import img3 from '../../../assets/images/auth/auth-carousel-img3.png'
import img4 from '../../../assets/images/auth/auth-carousel-img4.png'


export default function AuthCarousel(){

    const displayCarouselItems = [img1, img2, img3, img4].map((img, i) => {
        return (
            <Carousel.Item
                key={i}
            >
                {/* <div 
                    style={{
                        backgroundImage: `url(${img})`,
                        minHeight: '200vh'
                    }}
                    className="bg-img h-100 w-100"
                >

                </div> */}
                <img 
                    src={img} 
                    className="col-lg-12 col-md-12 col-12" 
                />
            </Carousel.Item>
        )
    })

    return (
        <Carousel
            controls={false}
            fade={true}
        >
           { displayCarouselItems } 
        </Carousel>
    )
}