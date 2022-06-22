import React from 'react';
import {View, FlatList,Text,StyleSheet,ScrollView} from 'react-native'

export default function FinalFoodList(props) {
  console.log(props.route.params.data)
  const foodData = props.route.params.data;
  return(
    <View style={styles.container}>
      <ScrollView>
      <Text>{"["}</Text>
      <FlatList
        data={foodData}
        renderItem={({ item, index, separators }) => (
          <View>
            <Text style={styles.jsonText}>{"{\n\t name: \""+item.name+"\",\n\t price: \""+item.price+"\",\n},"}</Text>
          </View>
          )}
      />
      <Text>{"]"}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#dcdcdc',
    borderRadius:10,
    margin:15,
    padding:15,
  },
  jsonText:{
    fontSize:16,

  }
})