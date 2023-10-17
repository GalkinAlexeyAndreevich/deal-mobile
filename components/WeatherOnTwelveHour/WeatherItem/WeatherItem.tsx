import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { IWeatherOnHour } from "../../../interfaces";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface IProps{
	weatherItem:IWeatherOnHour
}

export default function WeatherItem({ weatherItem }:IProps ) {
	const {
			DateTime,
			WeatherIcon,
			IconPhrase,
			Temperature,
	} = weatherItem;
	return (
    <View style={styles.container}>
      <Text style={styles.text}>{moment(DateTime).hours()}:00</Text>
      <Image
        source={{
          uri: `https://developer.accuweather.com/sites/default/files/${
            Number(WeatherIcon) < 10 ? ("0" + WeatherIcon) : WeatherIcon
          }-s.png`,
        }}
        style={{ width: 40, height: 40 }}
      />
      <Text style={styles.text}>{Math.round(Temperature.Value)}°</Text>

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 15,
		padding: 10,
	},
});
