import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Stack } from 'expo-router';
import StockListItem from '@/src/components/StockListItem';
import { useQuery, gql } from '@apollo/client';
 

const query = gql`
query MyQuery($symbol: String) {
  quotes(symbol: $symbol) {
    name
    value {
      name
      symbol
      percent_change
      close
    } 
  }
}`; 


export default function TabOneScreen() {


  const {data, loading, error} = useQuery(query, {variables: {symbol: 'GME,NVDA,IBM,KULR,'}});

  if(loading){
    return <ActivityIndicator/>
  }

  if(error){
    return <Text>Failed to fetch stocks</Text>
  }

const stocks = data.quotes.map((q) => q.value);

console.log(JSON.stringify(stocks, null, 2));

  return (
    <View style={styles.container}>

      <Stack.Screen options={{title:'Stocks'}}/>

      <FlatList 
      data={stocks} 
      renderItem={({item}) => <StockListItem stock={item}/>} 
      contentContainerStyle = {{ gap: 20, padding: 10, }}
      />

     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
