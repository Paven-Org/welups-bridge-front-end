import React from 'react';

interface LogoProps {
    className?: string | undefined;
    children?: React.ReactNode;
}

const Background : React.FunctionComponent<LogoProps> = () => {

    return <svg width="1440" height="530" viewBox="0 0 1440 530" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.2" cx="740.166" cy="709.147" r="510.913" transform="rotate(33.6679 740.166 709.147)" stroke="white"/>
        <circle opacity="0.4" cx="777.357" cy="755.77" r="510.913" transform="rotate(33.6679 777.357 755.77)" stroke="white"/>
        <circle opacity="0.3" cx="789.551" cy="775.136" r="510.913" transform="rotate(33.6679 789.551 775.136)" stroke="white"/>
        <circle opacity="0.12" cx="859.644" cy="849.644" r="527.137" transform="rotate(33.6679 859.644 849.644)" stroke="white"/>
        <circle opacity="0.5" cx="349.147" cy="933.896" r="510.913" transform="rotate(33.6679 349.147 933.896)" stroke="#FFBA00"/>
        <circle opacity="0.8" cx="398.967" cy="945.967" r="524.485" transform="rotate(33.6679 398.967 945.967)" stroke="#FFBA00"/>
        <circle opacity="0.2" cx="500.491" cy="945.846" r="510.913" transform="rotate(33.6679 500.491 945.846)" stroke="#FFBA00"/>
        <circle cx="971" cy="146" r="11" fill="#44D7B6"/>
        <circle cx="444" cy="349" r="4" fill="#9DFFE9"/>
        <circle cx="946" cy="391" r="15" fill="white"/>
        <circle cx="601.5" cy="78.5" r="3.5" fill="#666E75"/>
        <circle r="5" transform="matrix(1 0 0 -1 400 271)" fill="white"/>
        <circle cx="746.5" cy="363.5" r="6.5" fill="#FFBA00"/>
        <circle cx="548.5" cy="200.5" r="6.5" fill="#FFBA00"/>
        <circle cx="774.5" cy="218.5" r="4.5" fill="#29313C"/>
    </svg>
}

export default Background
