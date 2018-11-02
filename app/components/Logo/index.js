import React from 'react';
import { Svg } from 'expo';


const Logo = () => (
    <Svg height={100} width={100}>
        <Svg.Circle
            cx={50}
            cy={50}
            r={45}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#f1c40f"
        />
    </Svg>
);

export default Logo;
