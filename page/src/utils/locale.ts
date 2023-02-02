import { timeFormat, timeFormatDefaultLocale, TimeLocaleDefinition } from "d3";

const esMXLocale: TimeLocaleDefinition = {
  dateTime: "%x, %X",
  date: "%d/%m/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ],
  shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  months: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  shortMonths: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ],
};

export function localeFormatter(locale: TimeLocaleDefinition) {
  timeFormatDefaultLocale(locale);

  return timeFormat;
}

export function esMXFormatter(specifier: string) {
  return localeFormatter(esMXLocale)(specifier);
}
