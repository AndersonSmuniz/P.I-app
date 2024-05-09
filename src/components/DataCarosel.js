import React from "react";
import { FlatList } from "react-native";
import DateCard from "./DateCards";
import { addDays } from 'date-fns';

const DateCarousel = ({ handleDateSelection , selectedDate}) => {
  const nextDays = [];
  let currentDate = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = addDays(currentDate, i);
    nextDays.push(nextDate);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={nextDays}
      keyExtractor={(item) => item.toISOString()}
      renderItem={({ item }) => (
        <DateCard date={item} handleDateSelection={handleDateSelection} selectedDate={selectedDate} />
      )}
    />
  );
};

export default DateCarousel;
