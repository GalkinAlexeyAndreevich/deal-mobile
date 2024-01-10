import {
	View,
	Pressable,
	Modal,
	StyleSheet,
	TouchableHighlight,
	Text,
	FlatList,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { defaultTypeTasks } from "@utils/dataNoFetch";
import { ITypeTask } from "@interfaces";


interface Props{
	selectedType:ITypeTask
	setSelectedType:Dispatch<SetStateAction<ITypeTask>>
}

export default function ModalTypeTask({selectedType, setSelectedType}:Props) {
	const [openModal, setOpenModal] = useState(false);
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
									height: 50,
									zIndex: 2,
									padding: 15,
									borderRadius: 10,
									marginLeft: 18,
									backgroundColor:Object.keys(selectedType).length?selectedType.color:"#d9fcff",
									display: "flex",
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
											<FlatList data={defaultTypeTasks} renderItem={TypeItem} keyExtractor={(_,index)=>String(index)}/>
									</View>
							</View>
					</Modal>
			</>
	);
}

const styles = StyleSheet.create({
	container: {
			margin: 5,
			backgroundColor: "white",
			display: "flex",
			borderRadius:20,
			opacity:0.9,
			alignItems: "center",
			justifyContent:"center"
	},
	background: {
			flex:1,
			zIndex: 1,
			justifyContent:"center",
			alignItems:"center"
	},
	outerContainer: {
			zIndex: 2,
			dispatch:"flex",
			justifyContent:"center",
			alignItems:"center",
			position: "absolute",
			bottom: "20%",
	},
});
