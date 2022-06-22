import React,{useState,useRef} from 'react'
import {View, Text, StyleSheet,Image,FlatList,SafeAreaView,TouchableOpacity,ScrollView,TouchableHighlight,Button,TextInput} from 'react-native'
import { FontAwesome,EvilIcons,Feather } from '@expo/vector-icons';

import RBSheet from "react-native-rbs";

export default function MainScreen({navigation} ){
  const refRBSheet = useRef();
  const [foodItem,setFoodItem] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [newEditItem, setNewEditItem] = useState();
  const [foodData,setFoodData] = useState([
    {
      id : Math.floor(Math.random() * 1000000),
      name : 'Mango',
      price: '50',
    },
    {
      id: Math.floor(Math.random() * 1000000),
      name : 'Apple',
      price :'100'
    }
  ])
 
  
  const addFoodItem = ()=>{
    setFoodData([...foodData,{id:Math.floor(Math.random() * 1000000),name:foodItem,price:foodPrice}])
    setToggleSubmit(true) 
  }

  const editItem = (id) => {
    setNewEditItem(foodData.find((item)=>{
      return item.id === id
    }))
    console.log(newEditItem)
    refRBSheet.current.open()
    setToggleSubmit(false)
  }

  function removeFoodItem(id) {
    const newList = foodData.filter((item) => item.id !== id);
    console.log(newList)
    setFoodData(newList)
  }
  return(
    <View style={styles.container}>
    <ScrollView>
      <SafeAreaView>
      <FlatList
      data={foodData}
      renderItem={({ item, index, separators }) => (
        <View>
           <View style={styles.banner}>
            <View style={styles.dataContainer}>
              <View style={styles.dataBanner}>
                <View style={{flexDirection:'row',}}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/6_dot_icon.png')}
                />
                <Text style={styles.foodTag}>{item.name}</Text>
                </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.priceTag}>{"Price: "}</Text>
                <FontAwesome name="rupee" size={18} color="black" />
                <Text style={styles.price}>{" "+item.price}</Text>
              </View>
            </View>
          </View>
        
        <View style={styles.editContainer}>
          <View style={styles.editBanner}>
            <EvilIcons name="pencil" size={26} color="black" onPress={()=> editItem(item.id)}/>
            <Feather name="trash" size={18} color="black" onPress={()=>removeFoodItem(item.id)}/>
          </View>
        </View>
      </View>
        </View>
        )}
      />
      <TouchableOpacity style={styles.addFoodbtn} onPress={() => {refRBSheet.current.open(),foodData}} >
        <Text style = {{fontSize:15, fontWeight:'bold',color:'black'}}><Text style={{fontSize:20,fontWeight:'bold'}}>+</Text> Add Food Item</Text>
      </TouchableOpacity>
      </SafeAreaView>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.finalFoodBtn} onPress = {()=>{navigation.navigate("FinalFoodList",{data:foodData})}}>
          <Text style={styles.finalFoodBtnText}>Final Food List</Text>
        </TouchableOpacity>
      </View>

    <RBSheet
        ref={refRBSheet}
        height={350}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType={"fade"}
        
        customStyles={{
          container: {
            borderTopLeftRadius:30,
            borderTopRightRadius:30,

          },
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
        
      >{console.log(newEditItem)}
        <View style={styles.rbSheetContainer}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Add Food</Text>

        <Text style={{fontSize:16,marginTop:15}}>Food Name</Text>
        <TextInput
        style={styles.input}
        onChangeText={text =>{setFoodItem(text)}}
        value={foodItem}
        />

        <Text style={{fontSize:16,marginTop:15}}>Food Price</Text>
        <TextInput
        style={styles.input}
        onChangeText={text => {setFoodPrice(text)}}
        value={foodPrice}
        />

        <View>
        { 
        toggleSubmit ? 
        <TouchableOpacity 
            style={styles.addFoodBtn} 
            onPress={()=>{ 
              (foodItem != "" && foodPrice != "") ? addFoodItem(): refRBSheet.current.close(),
              setToggleSubmit(true),refRBSheet.current.close(),
              foodData}}>
                
          <Text style={styles.addFoodBtnText}>Add Food Item</Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity 
            style={styles.addFoodBtn} 
            onPress={()=>{ 
              (foodItem != "" && foodPrice != "") ? addFoodItem(): refRBSheet.current.close(),
              setToggleSubmit(true),refRBSheet.current.close(),
              foodData}}>
                
          <Text style={styles.addFoodBtnText}>Edit Food Item</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
      </RBSheet>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  finalFoodBtn:{
    margin:20,
    height:50,
    borderRadius:10,
    borderWidth:0.5,
    backgroundColor:'#3CB371',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderColor:'#3CB371',
  },
  finalFoodBtnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
  },
  addFoodbtn:{
    margin:20,
    height:50,
    borderRadius:10,
    borderWidth:0.5,
    backgroundColor:'#90EE90',
    opacity:0.5,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderColor:'#3CB371',
  },

  input: {
    height: 50,
    borderWidth:0.5,
    borderRadius:10,
    padding: 10,
  },
  addFoodBtn:{
    marginTop:20,
    height:50,
    borderRadius:10,
    borderWidth:0.5,
    backgroundColor:'#3CB371',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#3CB371',
  },
  addFoodBtnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
  },
  rbSheetContainer:{
    backgroundColor: 'white',
    padding: 20,
    height: 700,
    borderRadius:30,
  },
  // {},
  // {},
  banner:{
    margin:20,
    height:50,
    borderRadius:10,
    borderWidth:0.5,
    backgroundColor:'#e2e2e2',
    flexDirection:'row',
    borderColor:'#D3D3D3',
  },
  dataContainer:{
    flex:1,
    padding:15,
    justifyContent:'space-between'
  },
  dataBanner:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  tinyLogo: {
    tintColor:'gray',
    width: 20,
    height: 20,
  },
  priceTag:{
    fontWeight:'bold',
    color:'gray',
    fontSize:16,
  },
  foodTag:{
    fontWeight:'bold',
    fontSize:16,
    color:'black',
    marginLeft:10
  },
  price:{
    fontSize:16,
    fontWeight:'bold',
  },
  editContainer:{
    padding:15,
    borderLeftWidth:2,
    borderColor:'#D3D3D3',
  },
  editBanner:{
    flexDirection:'row',
    width:60,
    justifyContent:'space-between',
  },

})