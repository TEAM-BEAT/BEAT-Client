import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// API 모킹을 위한 서버 생성
export const server = setupServer(...handlers);
