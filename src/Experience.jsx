import { OrbitControls } from '@react-three/drei'
import {Level} from './Level.jsx'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import { Physics, Debug } from '@react-three/rapier'
import useGame from './stores/useGame.js'
import Effects from './Effects'

export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed= useGame((state) => state.blocksSeed)

    return <>
        <color args={["#252731"]} attach="background"/>
        {/* <OrbitControls makeDefault /> */}
        <Physics>
            {/* <Debug/> */}
            <Lights />
            <Level count={blocksCount} seed={blocksSeed}/>
            <Player/>
        </Physics>
        <Effects/>

    </>
}