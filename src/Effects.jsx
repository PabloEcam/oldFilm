import { useEffect, useState } from 'react'
import {
  EffectComposer,
  Noise,
  Vignette,
  Texture
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls, folder } from 'leva'

function Effects() {
  const [currentTexture, setCurrentTexture] = useState(
    './texture1/camera01.jpg'
  )
  const [frameCount, setFrameCount] = useState(0)
  const [frameInterval, setFrameInterval] = useState(5)
  const [internalCounter, setInternalCounter] = useState(0)

  const textureList1 = [
    './texture1/camera01.jpg',
    './texture1/camera03.jpg',
    './texture1/camera04.jpg',
    './texture1/camera05.jpg',
    './texture1/camera06.jpg'
  ]

  const textureList2 = Array.from(
    { length: 40 },
    (_, i) =>
      `./texture2/Old_Film_Flashes_Scratches_Burns_Film_Grain_Projector_Hash_03-${String(
        i
      ).padStart(4, '0')}.jpg`
  )

  const textureList3 = Array.from(
    { length: 31 },
    (_, i) => `./texture3/imagen${String(i).padStart(2, '1')}.jpg`
  )

  const {
    texture,
    blend,
    interval,
    aspectCorrection,
    opacityNoise,
    multiplyNoise,
    darknessVignette,
    offsetVignette
  } = useControls({
    Texure: folder({
      texture: {
        options: {
          OldFilm1: textureList1,
          OldFilm2: textureList2,
          PNG: textureList3
        },
        value: textureList1
      },
      blend: {
        options: {
          ADD: BlendFunction.ADD,
          ALPHA: BlendFunction.ALPHA,
          AVERAGE: BlendFunction.AVERAGE,
          COLOR: BlendFunction.COLOR,
          COLOR_BURN: BlendFunction.COLOR_BURN,
          COLOR_DODGE: BlendFunction.COLOR_DODGE,
          DARKEN: BlendFunction.DARKEN,
          DIFFERENCE: BlendFunction.DIFFERENCE,
          DIVIDE: BlendFunction.DIVIDE,
          DST: BlendFunction.DST,
          EXCLUSION: BlendFunction.EXCLUSION,
          HARD_LIGHT: BlendFunction.HARD_LIGHT,
          HARD_MIX: BlendFunction.HARD_MIX,
          HUE: BlendFunction.HUE,
          INVERT: BlendFunction.INVERT,
          INVERT_RGB: BlendFunction.INVERT_RGB,
          LIGHTEN: BlendFunction.LIGHTEN,
          LINEAR_BURN: BlendFunction.LINEAR_BURN,
          LINEAR_DODGE: BlendFunction.LINEAR_DODGE,
          LINEAR_LIGHT: BlendFunction.LINEAR_LIGHT,
          LUMINOSITY: BlendFunction.LUMINOSITY,
          MULTIPLY: BlendFunction.MULTIPLY,
          NEGATION: BlendFunction.NEGATION,
          NORMAL: BlendFunction.NORMAL,
          OVERLAY: BlendFunction.OVERLAY,
          PIN_LIGHT: BlendFunction.PIN_LIGHT,
          REFLECT: BlendFunction.REFLECT,
          SCREEN: BlendFunction.SCREEN,
          SRC: BlendFunction.SRC,
          SATURATION: BlendFunction.SATURATION,
          SOFT_LIGHT: BlendFunction.SOFT_LIGHT,
          VIVID_LIGHT: BlendFunction.VIVID_LIGHT
        },
        value: BlendFunction.ADD
      },
      interval: { value: 1000, min: 100, max: 2000, step: 100 },
      aspectCorrection: { value: false }
    }),
    Noise: folder({
      opacityNoise: {
        value: 0.05,
        min: 0,
        max: 1
      },
      multiplyNoise: { value: true }
    }),
    Vignette: folder({
      darknessVignette: {
        value: 1,
        min: 0,
        max: 5
      },
      offsetVignette: { value: 0.1, min: -5, max: 5 }
    })
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setInternalCounter((prevCounter) => (prevCounter + 1) % frameInterval)
      if (internalCounter === 0) {
        if (frameCount < texture.length) {
          setCurrentTexture(texture[frameCount])
          setFrameCount((prevContador) => (prevContador + 1) % texture.length)
        } else {
          setFrameCount(0)
        }
      }
    }, interval / 60)

    return () => clearInterval(intervalId)
  }, [internalCounter])

  return (
    <EffectComposer>
      <Noise opacity={opacityNoise} premultiply={multiplyNoise} />
      <Vignette
        eskil={false}
        offset={offsetVignette}
        darkness={darknessVignette}
      />
      <Texture
        blendFunction={blend}
        textureSrc={currentTexture}
        aspectCorrection={aspectCorrection}
      />
    </EffectComposer>
  )
}

export default Effects
