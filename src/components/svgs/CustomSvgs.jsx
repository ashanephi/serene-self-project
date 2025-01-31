import React from "react";


export const SearchSvg = ({ width, height, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d="M20 20L15.514 15.506M18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z" stroke="#5A4282" stroke-width="2" stroke-linecap="round"/>
    </svg>
)

export const DashboardSvg = ({ width, height, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width || "28"} height={height || "27"} viewBox="0 0 28 27" fill="none">
        <path d="M24.8889 3V6H18.6667V3H24.8889ZM9.33333 3V12H3.11111V3H9.33333ZM24.8889 15V24H18.6667V15H24.8889ZM9.33333 21V24H3.11111V21H9.33333ZM28 0H15.5556V9H28V0ZM12.4444 0H0V15H12.4444V0ZM28 12H15.5556V27H28V12ZM12.4444 18H0V27H12.4444V18Z" fill={color || "#221824"} />
    </svg>    
)

export const PlusSvg = ({ width, height, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width || "33"} height={height || "28"} viewBox="0 0 33 28" fill="none">
        <path d="M8.35417 15.4693H15.0833V22.4476C15.0833 22.6497 15.2427 22.8149 15.4375 22.8149H17.5625C17.7573 22.8149 17.9167 22.6497 17.9167 22.4476V15.4693H24.6458C24.8406 15.4693 25 15.304 25 15.102V12.8983C25 12.6963 24.8406 12.531 24.6458 12.531H17.9167V5.55259C17.9167 5.35058 17.7573 5.1853 17.5625 5.1853H15.4375C15.2427 5.1853 15.0833 5.35058 15.0833 5.55259V12.531H8.35417C8.15937 12.531 8 12.6963 8 12.8983V15.102C8 15.304 8.15937 15.4693 8.35417 15.4693Z" fill={color || "#221824"} />
        <path d="M31.68 0H1.32C0.589875 0 0 0.5005 0 1.12V26.88C0 27.4995 0.589875 28 1.32 28H31.68C32.4101 28 33 27.4995 33 26.88V1.12C33 0.5005 32.4101 0 31.68 0ZM30.03 25.48H2.97V2.52H30.03V25.48Z" fill={color || "#221824"} />
    </svg>    
)

export const CollectionSvg = ({ width, height, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width || "34"} height={height || "31"} viewBox="0 0 34 31" fill="none">
        <path d="M2 21.98L17 29L32 21.98M2 15.5L17 22.52L32 15.5M17 2L2 9.02L17 16.04L32 9.02L17 2Z" stroke={color || "#221824"} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>    
)

export const BookClipSvg = ({ width, height, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="41" viewBox="0 0 23 41" fill="none">
        <circle cx="20.5" cy="5.5" r="2.5" fill="url(#paint0_radial_1_59)"/>
        <circle cx="20.5" cy="20.5" r="2.5" fill="url(#paint1_radial_1_59)"/>
        <circle cx="20.5" cy="35.5" r="2.5" fill="url(#paint2_radial_1_59)"/>
        <path d="M10 16C7 16.8333 1 19.2 1 22C1 25.5 8 26 19.5 21" stroke="#0C0154" stroke-opacity="0.4"/>
        <path d="M10 1C7 1.83333 1 4.2 1 7C1 10.5 8 11 19.5 6" stroke="#0C0154" stroke-opacity="0.4"/>
        <path d="M10 31C7 31.8333 1 34.2 1 37C1 40.5 8 41 19.5 36" stroke="#0C0154" stroke-opacity="0.4"/>
        <defs>
            <radialGradient id="paint0_radial_1_59" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.5 6) rotate(-26.5651) scale(3.3541)">
            <stop stop-opacity="0.95"/>
            <stop offset="1" stop-color="#555267" stop-opacity="0.67"/>
            </radialGradient>
            <radialGradient id="paint1_radial_1_59" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.5 21) rotate(-26.5651) scale(3.3541)">
            <stop stop-opacity="0.95"/>
            <stop offset="1" stop-color="#555267" stop-opacity="0.67"/>
            </radialGradient>
            <radialGradient id="paint2_radial_1_59" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.5 36) rotate(-26.5651) scale(3.3541)">
            <stop stop-opacity="0.95"/>
            <stop offset="1" stop-color="#555267" stop-opacity="0.67"/>
            </radialGradient>
        </defs>
    </svg>    
)

export const FileSvg = ({ width, height, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width || "28"} height={height || "27"} viewBox="0 0 28 27" fill="none">
        <path d="M25.5208 20.25H21V24.6094C21.3524 24.4922 21.6016 24.3633 21.7474 24.2227L25.1198 20.9707C25.2656 20.8301 25.3993 20.5898 25.5208 20.25ZM20.4167 18H25.6667V2.25H2.33333V24.75H18.6667V19.6875C18.6667 19.2188 18.8368 18.8203 19.1771 18.4922C19.5174 18.1641 19.9306 18 20.4167 18ZM28 1.6875V19.6875C28 20.1562 27.8785 20.6719 27.6354 21.2344C27.3924 21.7969 27.1007 22.2422 26.7604 22.5703L23.4062 25.8047C23.066 26.1328 22.6042 26.4141 22.0208 26.6484C21.4375 26.8828 20.9028 27 20.4167 27H1.75C1.26389 27 0.850694 26.8359 0.510417 26.5078C0.170139 26.1797 0 25.7812 0 25.3125V1.6875C0 1.21875 0.170139 0.820312 0.510417 0.492188C0.850694 0.164063 1.26389 0 1.75 0H26.25C26.7361 0 27.1493 0.164063 27.4896 0.492188C27.8299 0.820312 28 1.21875 28 1.6875Z" fill={color || "#221824"} />
    </svg>    
)