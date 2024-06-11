
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Text, View } from "./Themed"
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome6 } from '@expo/vector-icons';
import { MonoText } from "./StyledText";


type Stock = {
    name: string;
    symbol: string;
    close: string;
    percent_change: string;
  
}

type StockListItem = {
    stock: Stock;

}

export default function StockListItem({ stock} : StockListItem ){

    const change = Number.parseFloat(stock.percent_change);
    return (

    <View style = {styles.container}>
        {/* {left container} */}
        <View style={{flex: 1, gap: 5,}}>
            <Text style={styles.symbol}>
                {stock.symbol}
                <> </>
                <FontAwesome6 name="heart-circle-plus" size={18 } color="gray"  style = {styles.icon} />
            </Text>

            <Text style={{color: 'gray', }} >{stock.name}</Text>
        </View>

        {/* right container */}

        <View style={{alignItems: 'flex-end',}} >
            <MonoText >${Number.parseFloat(stock.close).toFixed(2)}</MonoText>
            <MonoText style={{color: change > 0 ? 'green' :'red' }} > 
                {change > 0 ? '+' : ''}
                {change.toFixed(2) }%
            </MonoText>
        </View>
    </View>
 
    )

}

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        flexDirection: 'row',
    },

    symbol:{
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.light.tint,
        justifyContent: 'space-between',
    },

    icon:{
        marginLeft: 50,
    },

})