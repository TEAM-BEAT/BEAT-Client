// vite.config.ts
import react from "file:///E:/BEAT/BEAT-Client/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///E:/BEAT/BEAT-Client/node_modules/vite/dist/node/index.js";
import svgr from "file:///E:/BEAT/BEAT-Client/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///E:/BEAT/BEAT-Client/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        memo: true
      }
    }),
    tsconfigPaths()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  optimizeDeps: {
    include: ["react-lottie-player"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxCRUFUXFxcXEJFQVQtQ2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxCRUFUXFxcXEJFQVQtQ2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9CRUFUL0JFQVQtQ2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHN2Z3Ioe1xyXG4gICAgICBzdmdyT3B0aW9uczoge1xyXG4gICAgICAgIGljb246IHRydWUsXHJcbiAgICAgICAgbWVtbzogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgdHNjb25maWdQYXRocygpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgZXh0ZW5zaW9uczogW1wiLmpzXCIsIFwiLmpzeFwiLCBcIi50c1wiLCBcIi50c3hcIl0sXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcInJlYWN0LWxvdHRpZS1wbGF5ZXJcIl0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsT0FBTyxXQUFXO0FBQ25RLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sVUFBVTtBQUNqQixPQUFPLG1CQUFtQjtBQUcxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxhQUFhO0FBQUEsUUFDWCxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sTUFBTTtBQUFBLEVBQzNDO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMscUJBQXFCO0FBQUEsRUFDakM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
