import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { IAdditionInfo } from "../../interfaces";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

interface IProps {
  additionInfo: IAdditionInfo;
}
const mbToMMHG = (mb: number) => {
  return Math.round(mb * 0.750062);
};
const kmHToMc = (speed: number) => {
  
  return Math.round(speed/3.6);
};

export default function AdditionWeatherInfoNow({ additionInfo }: IProps) {
  console.log(additionInfo);

  // const [additionInfo, setAdditionInfo] = useState<IAdditionInfo>();
  // if (!additionInfo) return;

  return (
    additionInfo && <View style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons
        style={styles.img}
          name="weather-windy"
          size={24}
        ></MaterialCommunityIcons>
        <Text style={styles.paragraph}>
          {kmHToMc(Number(additionInfo.Wind.Speed.Metric.Value))}м/с,
          {additionInfo.Wind.Direction.Localized}
        </Text>
        <FontAwesome
          style={{
            transform: [
              { rotate: `${additionInfo.Wind.Direction.Degrees - 45}deg` },
            ],

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top:"auto",
            marginLeft:7,
          }}
          name="location-arrow"
          size={15}
          color="black"
        />
      </View>
      <View style={styles.row}>
        <SimpleLineIcons style={styles.img} name="speedometer" size={24} />
        <Text style={styles.paragraph}>
          {mbToMMHG(additionInfo.Pressure.Metric.Value)} мм рт. ст.
        </Text>
      </View>
      <View style={styles.row}>
        <SimpleLineIcons style={styles.img} name="drop" size={24} />
        <Text style={styles.paragraph}>{additionInfo.RelativeHumidity}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 10,
    maxWidth: 150,
  },
  paragraph: {
    fontSize: 15,
    paddingLeft: 4,
  },
  row: {
    display: "flex",
    alignItems:"center",
    flexDirection: "row",
    paddingBottom: 4,
  },
  img:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center"
  }
});
