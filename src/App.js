import React, { useEffect, useState } from "react";
import {
  parse,
  format,
  distanceInWordsToNow,
  differenceInDays,
  isPast,
} from "date-fns";

import getInterestingDates from "./interestingDates";

const distanceOfTimeInWords = date => {
  if (isPast(date)) return `${distanceInWordsToNow(date)} ago`;
  return `in ${distanceInWordsToNow(date)}`;
};

export const App = props => {
  const [birthday, setBirthday] = useState(parse("1991-09-01"));

  const interestingDates = getInterestingDates(birthday);

  const now = new Date();

  return (
    <div className="my-4 mx-4 md:mx-auto md:w-1/2 xl:w-1/3">
      <h1 className="text-6xl">Bonus Birthdays</h1>
      <p className="mt-4">
        Tell me when you were born, and I'll tell you about some fun upcoming
        dates you can celebrate.
      </p>
      <p className="mt-4 text-xl italic">
        I was born on{" "}
        <input
          type="date"
          value={format(birthday, "YYYY-MM-DD")}
          onChange={e => setBirthday(parse(e.target.value))}
          className="italic shadow"
        />
      </p>

      {interestingDates.map(({ date, description }) => {
        return (
          <div
            className={
              "rounded shadow p-4 mt-4 " +
              (isPast(date) ? "bg-gray-200" : "bg-white")
            }
          >
            <p className="float-right">
              Age: {(differenceInDays(date, birthday) / 365).toFixed(1)}
            </p>
            <p className="text-gray-600">{format(date, "YYYY-MM-DD")}</p>
            <h2 className="block text-xl leading-tight mt-2">{description}</h2>
            <p className="mt-2 text-gray-600">{distanceOfTimeInWords(date)}</p>
          </div>
        );
      })}
      <p className="my-6">
        This is a quick proof-of-concept. Tweet{" "}
        <a href="https://twitter.com/cgenco" className="text-blue-500">
          @cgenco
        </a>{" "}
        for feature requests or ideas for other cool dates!
      </p>
    </div>
  );
};

export default App;
