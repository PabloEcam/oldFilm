
import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Noise, Vignette, Texture } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function Effects(){
    const [currentTexture, setCurrentTexture] = useState("./camera01.jpg");
    const [frameCount, setFrameCount] = useState(0);

    const textureList = [
        "./camera01.jpg",
        "./camera03.jpg",
        "./camera04.jpg",
        "./camera05.jpg",
        "./camera06.jpg",
    ];
    
    useFrame(() => {
        setCurrentTexture(textureList[frameCount]);
        setFrameCount((prevContador) => (prevContador + 1) % textureList.length);
    });
    
    return(
        <EffectComposer > 
            <Noise opacity={0.1} />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
            <Texture blendFunction={BlendFunction.ADD} textureSrc={currentTexture}/>
        </EffectComposer>
    )
}

export default Effects;