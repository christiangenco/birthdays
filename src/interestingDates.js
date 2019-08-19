import {
  addDays,
  setYear,
  getYear,
  compareAsc,
  parse,
  differenceInDays,
} from "date-fns";
import people from "./people";

const deltaDates = [
  {
    delta: 10000,
    description: "You turn 10,000 days old",
  },
  {
    delta: 12345,
    description: "You turn 12,345 days old",
  },
  {
    delta: 15000,
    description: "You turn 15,000 days old",
  },
  {
    delta: 20000,
    description: "You turn 20,000 days old",
  },
];

people.forEach(({ name, born, events }) => {
  const personBirthday = parse(born);
  events.forEach(({ date, description }) => {
    deltaDates.push({
      delta: differenceInDays(date, personBirthday),
      description,
    });
  });
});

const daysThisYear = [
  {
    delta: 0,
    description: "Your next birthday!",
  },
  {
    delta: 365 / 2,
    description: "Your next half birthday",
  },
  {
    delta: 365 / 4,
    description: "Your next quarter birthday",
  },
  {
    delta: (365 / 4) * 3,
    description: "Your next three-quarters birthday",
  },
];

export default birthday => {
  let interestingDates = [];

  deltaDates.forEach(({ delta, description }) =>
    interestingDates.push({ date: addDays(birthday, delta), description })
  );

  const birthdayThisYear = setYear(birthday, getYear(new Date()));
  daysThisYear.forEach(({ delta, description }) =>
    interestingDates.push({
      date: addDays(birthdayThisYear, delta),
      description,
    })
  );

  return interestingDates.sort((a, b) => compareAsc(a.date, b.date));
};
