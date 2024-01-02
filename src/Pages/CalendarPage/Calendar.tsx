import { View, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { MarkedDates, Theme } from "react-native-calendars/src/types";
import moment from "moment";
import DayComponent from "./DayComponent";
import HeaderComponent from "./HeaderComponent";
import defineLocale from "./localeConfig"
interface Props {
    markedDates: MarkedDates;
    setOpenModal: (open: boolean) => void;
    countTask: number;
    currentDate: string;
    setCurrentDate: (date: string) => void;
}
type countOnWeek = {
    [key: number]: number;
};

export default function CustomCalendar({
    markedDates,
    setOpenModal,
    countTask,
    currentDate,
    setCurrentDate,
}: Props) {
    let monthYear = moment(currentDate).format("MM-yyyy");
    // Функция оптимизация высоты для недели
    const getStartAndEndOfWeeks = (month: string | Date) => {
        console.log("getStartAndEndOfWeeks", month);
        const startOfMonth = moment(month).startOf("month");
        const endOfMonth = moment(month).endOf("month");

        const startWeek = startOfMonth.isoWeek();
        const endWeek = endOfMonth.isoWeek();
        console.log(startOfMonth, endOfMonth, startWeek, endWeek);

        let filtered = {} as countOnWeek;
        for (let i = startWeek; i <= endWeek; i++) {
            filtered[i] = 0;
        }

        const filteredMarkedDates = Object.keys(markedDates).reduce(
            (filtered, date) => {
                const currentNumberWeek = moment(date).isoWeek();
                if (moment(date).year() !== moment(month).year())
                    return filtered;
                if (
                    currentNumberWeek >= startWeek &&
                    currentNumberWeek <= endWeek
                ) {
                    filtered[currentNumberWeek] = Math.max(
                        filtered[currentNumberWeek],
                        markedDates[date]?.dots?.length
                    );
                }
                return filtered;
            },
            filtered
        );
        console.log(filteredMarkedDates);
        console.log("Снова вызвали функцию");

        return filteredMarkedDates || {};
    };
    // Перерасчет произойдет если изменится месяц или год, а также количество заданий
    const countOnWeek = useMemo(
        () => getStartAndEndOfWeeks(currentDate),
        [countTask, monthYear]
    );
    defineLocale()

    return (
        <View style={{ height: "83%" }}>
            <ScrollView horizontal={false}>
                <Calendar
                    key={currentDate}
                    current={currentDate}
                    firstDay={1}
                    date={currentDate}
                    theme={calendarTheme}
                    customHeaderTitle={
                        <HeaderComponent
                            currentDate={currentDate}
                            setOpenModal={setOpenModal}
                        />
                    }
                    markingType="multi-dot"
                    dayComponent={({ date, marking }) => (
                        <DayComponent
                            date={date}
                            marking={marking}
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            countOnWeek={countOnWeek}
                        />
                    )}
                    markedDates={markedDates}
                    onMonthChange={(date) => {
                        setCurrentDate(date.dateString);
                    }}
                />
            </ScrollView>
        </View>
    );
}
export const calendarTheme: Theme = {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#00adf5",
    dayTextColor: "#2d4150",
    textDisabledColor: "#d9e",
    weekVerticalMargin: 0,
};
