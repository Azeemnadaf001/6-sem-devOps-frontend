import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "http://ec2-13-201-115-29.ap-south-1.compute.amazonaws.com:3000",
        changeOrigin: true,
      },
    },
  },
});
