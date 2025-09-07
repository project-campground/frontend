import { createTheme } from "@mantine/core"

const theme = createTheme({
    fontFamily: `Nunito Sans, sans-serif`,
    primaryColor: "orange",
    colors: {
        pink: ["#ff2661", "#ff2661", "#ff2661", "#ff2661", "#ff2661", "#ff2661", "#ff2661", "#ff2661", "#ff2661", "#ff2661", ],
        red: ["#ff402b", "#ff402b", "#ff402b", "#ff402b", "#ff402b", "#ff402b", "#ff402b", "#ff402b", "#ff402b", "#ff402b", ],
        orange: ["#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26", "#ff5a26"],
        green: ["#20eb53", "#20eb53", "#20eb53", "#20eb53", "#20eb53", "#20eb53", "#20eb53", "#20eb53", "#20eb53", "#20eb53", ],
    },
    defaultGradient: {
        from: "orange",
        to: "pink",
        deg: 60
    }
});

export default theme;