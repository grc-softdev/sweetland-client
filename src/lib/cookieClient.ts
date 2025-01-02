import { getCookie } from "cookies-next";

export const getCookieClient = () => {
    const token = getCookie("session")

    return token;
}