import { View, Text } from './Themed'
import { LineGraph, GraphPoint } from 'react-native-graph'
import Colors from '../constants/Colors'
import timeseries from '@/assets/data/timeseries.json'
import { MonoText } from './StyledText'
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { useState } from 'react'

const graph = () => {

    const points: GraphPoint[] = timeseries.values.map((value) => ({
        date: new Date(value.datetime),
        value: Number.parseFloat(value.close),
    }))

    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(points[points.length - 1 ]);

    

    const onPointSelected = (point: GraphPoint) => {
        // console.log(point.value);
        setSelectedPoint(point);
    }


    return (
        <View>
            <MonoText style = {{fontSize: 20, fontWeight: 'bold', color: 'green'  }}> 
                ${selectedPoint?.value.toFixed(2)}
            </MonoText>

            <Text style = {{color: 'gray', }}> {selectedPoint?.date.toDateString()} </Text>

            <LineGraph
                style={{ width: '100%', height: 300 ,}}
                points={points} 
                animated={true}
                color='#017580'
                gradientFillColors={['#017580', '#000']}
                enablePanGesture
                onPointSelected={onPointSelected}
                enableIndicator
                indicatorPulsating
                enableFadeInMask
            />

        </View>
    )
}

export default graph