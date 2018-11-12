import React from 'react';
import { Image } from 'react-native';


const Logo = () => (
    <Image
        style={{ width: 250, height: 119 }}
        source={ require('../../../assets/LPJ_Logo.png') } />
);

export default Logo;
