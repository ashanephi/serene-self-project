import React, { useEffect } from "react";



export default function ScrollToTop(props){
    const { scrollToTopCondition } = props

    useEffect(() => {
        if(scrollToTopCondition){
            window.scrollTo(0, 0)
        }
    }, [scrollToTopCondition])

    return props.children
}