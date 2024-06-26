
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Text, View } from "./Themed"
import { StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome6 } from '@expo/vector-icons';
import { MonoText } from "./StyledText";
import { Link } from "expo-router";
import { useMutation, gql } from "@apollo/client";

const mutation = gql`
    mutation MyMutation($symbol:String!, $user_id:String!) {
    insertFavorites(symbol: $symbol, user_id: $user_id) {
      id
      symbol
      user_id
    }
  }`;

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


    const[runMutation] = useMutation(mutation, {variables: {user_id: 'ali', symbol: stock.symbol }});

    const change = Number.parseFloat(stock.percent_change);

    const onFavoritesPressed = () => {
        runMutation();
    }

    return (
    <Link href={'/'+ stock.symbol} asChild>
        <Pressable style = {styles.container}>
            {/* {left container} */}
            <View style={{flex: 1, gap: 5,}}>
                <Text style={styles.symbol}>
                    {stock.symbol}
                    <> </>
                    <FontAwesome6 onPress={onFavoritesPressed} name="heart-circle-plus" size={18 } color="gray"  style = {styles.icon} />
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
        </Pressable>
    </Link>  
 
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