import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root": {
        height: "100%",
        margin: 0,
        padding: 0,
      },
    },
  },
});

export default theme;
