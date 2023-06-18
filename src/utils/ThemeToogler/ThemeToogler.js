export const defaultValue = {
  constLight: "#F8F9FA",
  constDark: "rgb(3, 37, 65)",
  main: "#90A955",
  mobile: "550px",
  tablet: "1050px",
  minWidth: "340px",
  maxWidth: "2000px",
};

export const lightMode = {
  colors: {
    light: "#EDF2F4",
    dark: "#252422",
    reversedClr: defaultValue.constDark,
    constLight: defaultValue.constLight,
    constDark: defaultValue.constDark,
    main: defaultValue.main,
  },
  mobile: defaultValue.mobile,
  tablet: defaultValue.tablet,
  minWidth: defaultValue.minWidth,
  maxWidth: defaultValue.maxWidth,
};

export const darkMode = {
  colors: {
    light: "rgb(3, 37, 65)",
    dark: "#121211",
    reversedClr: defaultValue.constLight,
    constLight: defaultValue.constLight,
    constDark: defaultValue.constDark,
    main: defaultValue.main,
  },
  mobile: defaultValue.mobile,
  tablet: defaultValue.tablet,
  minWidth: defaultValue.minWidth,
  maxWidth: defaultValue.maxWidth,
};
