import axios from "axios";

const getAccessToken = (): string | null => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const userObj = JSON.parse(user);
      return userObj.accessToken || "";
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return "";
    }
  }
  return "";
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,

  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T>(...args);
}
