import Carousel from "react-native-snap-carousel";
import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React from "react";

interface ArrNumbers {
    value: string;
    label: string;
}

export default function MyCarousel() {
    const isCarousel = React.useRef(null);
    const { width } = useWindowDimensions();
    const testArr: ArrNumbers[] = [
        { value: "5", label: "5" },
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "25", label: "25" },
        { value: "30", label: "30" },
        { value: "35", label: "35" },
        { value: "40", label: "40" },
        { value: "45", label: "45" },
        { value: "50", label: "50" },
        { value: "55", label: "55" },
    ];
    const CarouselCardItem = ({
        item,
        index,
    }: {
        item: ArrNumbers;
        index: number;
    }) => {
        const indexItem = testArr.findIndex(
            (value) => value.value == item.value
        );
        return (
            <Pressable
                onPress={() => {
                    console.log(item.value, index, indexItem);
                    isCarousel.current.snapToItem(indexItem);
                }}>
                <Text style={{ fontSize: 20 }}>{item.label}</Text>
            </Pressable>
        );
    };
    return (
        <View style={{backgroundColor:"yellow",paddingLeft:10,width:width,display:"flex", justifyContent:'center', alignItems:'center'}}>
            <Carousel
                ref={isCarousel}
                // loop={true}
                data={testArr}
                sliderWidth={Math.round(width)}
                itemWidth={Math.round((width) / 7)}
                vertical={false}
                renderItem={CarouselCardItem}						
            />
        </View>
    );
}
