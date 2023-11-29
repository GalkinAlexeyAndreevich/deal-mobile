import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Calendar, Agenda,LocaleConfig } from "react-native-calendars";
import { Card } from "react-native-paper";
const timeToString = (time: any): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

export default function CalendarPage() {
    const [items, setItems] = useState({});
    const [selected, setSelected] = useState("");

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -5; i < 5; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: "Item for " + strTime + " #" + j,
                            height: Math.max(
                                50,
                                Math.floor(Math.random() * 150)
                            ),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <Calendar
                style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    height: 350,
                }}
                theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    textSectionTitleColor: "#b6c1cd",
                    selectedDayBackgroundColor: "#00adf5",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#00adf5",
                    dayTextColor: "#2d4150",
                    textDisabledColor: "#d9e",
                }}
								onDayPress={day => {
									setSelected(day.dateString);
								}}
								markedDates={{
									[selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
								}}
								
            />
            {/* <Agenda
						scrollEnabled={false}
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString(new Date())}
        renderItem={renderItem}
				firstDay={1}
      	/> */}
        </ScrollView>
    );
}
