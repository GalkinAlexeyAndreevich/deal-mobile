import { ScrollView, View } from "react-native";
import React, { useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { MarkedDates, Theme } from "react-native-calendars/src/types";
import moment from "moment";
import DayComponent from "./DayComponent";
import HeaderComponent from "./HeaderComponent";
import defineLocale from "./localeConfig";
interface Props {
    markedDates: MarkedDates;
    setOpenModal: (open: boolean) => void;
    countTask: number;
    currentDate: string;
    setCurrentDate: (date: string) => void;
}
type countOnWeek = {
    [key: number]: {
        textLength: number;
        countTask: number;
        maxLength: number;
    };
};

export default function CustomCalendar({
    markedDates,
    setOpenModal,
    countTask,
    currentDate,
    setCurrentDate,
}: Props) {
    let monthYear = moment(currentDate).format("MM-yyyy");
    const countWord = () => {
        console.log("test", Object.values(markedDates));
        const arrDates = Object.values(markedDates);
        let count = 0;
        for (let i = 0; i < arrDates.length; i++) {
            if (!arrDates[i].dots) continue;
            for (let j = 0; j < arrDates[i].dots!.length; j++) {
                count += arrDates[i].dots![j].key?.length || 0;
            }
        }
        return count;
    };
    const count = countWord();
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
            filtered[i] = {
                textLength: 0,
                countTask: 0,
                maxLength: 0,
            };
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
                    if (markedDates[date]?.dots !== undefined) {
                        let textLength = 0;

                        for (
                            let i = 0;
                            i < markedDates[date]?.dots!.length;
                            i++
                        ) {
                            let count: number =
                                markedDates[date]?.dots![i]?.key?.length || 0;
                            textLength += count;
                        }

                        filtered[currentNumberWeek].textLength = Math.max(
                            filtered[currentNumberWeek].textLength,
                            textLength
                        );
                        filtered[currentNumberWeek].countTask = Math.max(
                            filtered[currentNumberWeek].countTask,
                            markedDates[date]?.dots!.length
                        );
                        const sum =
                            (filtered[currentNumberWeek].countTask || 1) * 17 +
                            filtered[currentNumberWeek].textLength * 2;
                        filtered[currentNumberWeek].maxLength = Math.max(
                            filtered[currentNumberWeek].maxLength,
                            Math.round(sum)
                        );
                    }
                }
                return filtered;
            },
            filtered
        );
        console.log("Снова вызвали функцию", filteredMarkedDates);

        return filteredMarkedDates || {};
    };
    // Перерасчет произойдет если изменится месяц или год, а также количество заданий
    const countOnWeek = useMemo(
        () => getStartAndEndOfWeeks(currentDate),
        [countTask, monthYear, count]
    );
    defineLocale();

    return (
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
                dayComponent={({ date, marking }) =>
                    date && (
                        <DayComponent
                            date={date}
                            marking={marking}
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            countOnWeek={countOnWeek}
                        />
                    )
                }
                markedDates={markedDates}
                onMonthChange={(date) => {
                    setCurrentDate(date.dateString);
                }}
            />
            <View
                style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: 75,
                }}></View>
        </ScrollView>
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
