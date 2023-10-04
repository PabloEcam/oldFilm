import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Effects from './Effects'
import Cycle from './Cycle_Glb'
import { Perf } from 'r3f-perf'

function App() {
  return (
    <Canvas>
      <Perf position='top-left' />
      <OrbitControls />
      <Environment background preset='city' />
      <Effects />
      <Cycle position={[0, -1, 0]} />
    </Canvas>
  )
}

export default App
