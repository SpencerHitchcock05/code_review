import { createContext, useState } from "react";

const UserContext = createContext({
    user: null,
    setUser: () => {},
})

const { Provider } = UserContext;

function UserProvider({children}) {
    const [user, setUser] = useState();

    return <Provider value={{ user, setUser }}>{children}</Provider>
}

export { UserContext, UserProvider };