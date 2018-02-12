import React from 'react';
import './Clock.styl';

const Clock = ({children, minutes, seconds}) =>
<div className="box">
    <div className="outer-ring">
        <div className="arrow hours unused"></div>
        <div className="arrow minutes" style={{transform: `rotateZ(${180 + (minutes*6)}deg)`}}></div>
        <div className="arrow seconds" style={{transform: `rotateZ(${180 + seconds * 6}deg)`}}></div>
        {children}
    </div>
    {/* <div className="base"></div> */}
    <div className="sections">
        <div className="first"></div>
    </div>
</div>

export default Clock;
