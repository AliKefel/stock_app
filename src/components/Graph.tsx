import { View, Text } from './Themed'
import { LineGraph, GraphPoint } from 'react-native-graph'
import Colors from '../constants/Colors'
import { MonoText } from './StyledText'
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { ActivityIndicator } from 'react-native'


const query = gql`
    query MyQuery($symbol:String, $interval:String){
    time_series(interval: $interval, symbol: $symbol) {
    values {
      close
      datetime
    }
  }
}`;
 
const graph = ({symbol}: {symbol: string}) => {


    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();

    const { data, loading, error } = useQuery(query, {variables: {symbol,interval: '1day', }});

    if(loading){
        return <ActivityIndicator/>
    } 
    if(error){  
        return <Text>Failed to fetch stock</Text>
    }
    console.log(data);

    const points: GraphPoint[] = data.time_series.values.map((value) => ({
        date: new Date(value.datetime),
        value: Number.parseFloat(value.close),
    }));

  
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

export default graph;