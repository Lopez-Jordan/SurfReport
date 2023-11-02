import './Secondary.css';
import { useEffect } from 'react';

export default function Secondary() {
    
    useEffect(() => {
        const options = {
            key: 'y5Ijkolbt4ppXSBV0O3WSDGhdjCbsQfV',
            verbose: true,
            lat: 50.4,
            lon: 14.3,
            zoom: 0,
        };
        
        windyInit(options, windyAPI => {
            const { map } = windyAPI;
            L.popup()
                .setLatLng([50.4, 14.3])
                .setContent(`interact for wind speed and temp!`)
                .openOn(map);
        });
    },[]);

    return (
        <>
            <div className="secondaryMain">
                <h2>Find conditions before leaving your house!</h2>
                <div className='container'>
                    <div id="windy"></div>
                    <div id="video"
                        <video tabindex="-1" id="anonymous-home-page-video-player_html5_api" class="vjs-tech" preload="auto" disablepictureinpicture="" loop="true" muted="muted" playsinline="playsinline" autoplay="autoplay" src="https://wa.cdn-surfline.com/kbyg/videos/surfline-cams-us-360p.mp4"></video>
                    </div>
                </div>
            </div>
        </>
    );
}