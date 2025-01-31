import React from "react";


export default function CustomErrorMsg({ errorMsg, isCentered }){
    return (
        <p 
            style={{
                textAlign: isCentered ? 'center' : 'left'
            }}
            className="m-0 p-0 font-family-SourceCodePro txt-13 fw-600 txt-EC2020 py-2"
        >
            { errorMsg }
        </p>
    )
}