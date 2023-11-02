import './Secondary.css';
import { useEffect } from 'react';

export default function Secondary() {
    
    useEffect(() => {
        const options = {
            key: 'y5Ijkolbt4ppXSBV0O3WSDGhdjCbsQfV',
            verbose: true,
            lat: 50.4,
            lon: 14.3,
            zoom: -2,
        };
        
        windyInit(options, windyAPI => {
            const { map } = windyAPI;
            L.popup()
                .setLatLng([50.4, 14.3])
                .setContent(`interact here!`)
                .openOn(map);
        });
    }, []);

    return (
        <>
            <div className="secondaryMain">
                <div className='container'>
                    <div id="windy"></div>
                    <div className='desc'>
                        <h3 className='headerSecondarySmall'>Know in advance</h3>
                        <h2 className='headerSecondary'>Find wind conditions and temperature!</h2>
                        <p className='paraSecondary'>Using the interactive map, Windy's api allows 
                            anyone to monitor regional conditions of any geological location. Need more 
                            surf-condition info before you head out? Scroll below and input your favorite locations to find
                            the surf height, swell period, etc.</p>
                    </div>
                </div>
            </div>
        </>
    );
}