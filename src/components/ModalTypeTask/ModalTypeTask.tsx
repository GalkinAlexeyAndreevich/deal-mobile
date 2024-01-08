import {
	View,
	Pressable,
	Modal,
	StyleSheet,
	TouchableHighlight,
	Text,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { typeTasks } from "@utils/dataNoFetch";
import { ITypeTask } from "@interfaces";

export default function ModalTypeTask() {
	const [openModal, setOpenModal] = useState(false);
	const [selectedType,setSelectedType] = useState<ITypeTask>({} as ITypeTask)
	const TypeItem = ({item})=>{
		return(
			<Pressable style={{padding:10, display:"flex", flexDirection:"row", alignItems:"center"}} onPress={()=>{
				setSelectedType(item)
				setOpenModal(false)
			}}>
				<View style={{
					width:10,
					height:10,
					borderRadius:50,
					backgroundColor:item.color,
					marginRight:10
				}}>
				</View>
				<Text>{item.value}</Text>
			</Pressable>
		)
	}
	return (
			<>
					<Pressable
							onPress={() => {
									setOpenModal(true);
							}}
							style={{
									// flex: 1,
									// width: 150,
									height: 50,
									zIndex: 2,
									padding: 15,
									borderRadius: 10,
									marginLeft: 18,
									backgroundColor:Object.keys(selectedType).length?selectedType.color:"#d9fcff",
									display: "flex",
									// alignItems: "stretch",
									
									// width:"100%"
							}}>
							<Text style={{opacity:0.5}}>
								{Object.keys(selectedType).length?selectedType.value:"Категории"}
							</Text>
					</Pressable>

					<Modal
							transparent={true}
							animationType={"slide"}
							visible={openModal}
							onRequestClose={() => setOpenModal(false)}>
							<TouchableHighlight
									style={styles.background}
									onPress={() => setOpenModal(false)}
									underlayColor={"transparent"}>
									<View />
							</TouchableHighlight>
							<View style={styles.outerContainer}>
									<View style={styles.container}>
											<FlatList data={typeTasks} renderItem={TypeItem} keyExtractor={(_,index)=>String(index)}/>
									</View>
							</View>
					</Modal>
			</>
	);
}

const styles = StyleSheet.create({
	container: {
			// flex:1,
			margin: 5,
			backgroundColor: "white",
			display: "flex",
			borderRadius:20,
			opacity:0.9,
			// width: 200,
			// height: 300,
			// flexDirection: "row",
			alignItems: "center",
			justifyContent:"center"
	},
	background: {
			flex:1,
			// backgroundColor: "black",
			// opacity: 0.5,
			zIndex: 1,
			justifyContent:"center",
			alignItems:"center"
	},
	outerContainer: {
			// flex:1,
			zIndex: 2,
			dispatch:"flex",
			justifyContent:"center",
			alignItems:"center",
			position: "absolute",
			// alignItems: "stretch",

			// backgroundColor: "white",
			bottom: "20%",
			// right:"30%",
			// left:"50%"
	},
});
