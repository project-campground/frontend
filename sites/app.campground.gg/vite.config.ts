import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom", "@mui/joy", "@emotion/react", "@emotion/styled"],
  },
  plugins: [reactRouter(), tsconfigPaths(), viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, '../../lang/*'),
          dest: 'locales',
        },
      ],
    }),],
});
