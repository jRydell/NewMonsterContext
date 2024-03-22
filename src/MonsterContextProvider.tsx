import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

type Monster = {
  name: string;
  eyes: number;
  color: string;
  tentacles: number;
  id: string;
  hasHorns: boolean;
};

// GlobalState
type MonsterState = {
  monsters: Monster[];
};

const initialMonsterState: MonsterState = {
  monsters: [
    {
      id: uuidv4(),
      name: "Gugge",
      eyes: 3,
      tentacles: 12,
      color: "blue",
      hasHorns: true,
    },
    {
      id: uuidv4(),
      name: "Lisa",
      eyes: 26,
      tentacles: 9,
      color: "black",
      hasHorns: true,
    },
    {
      id: uuidv4(),
      name: "Kalle",
      eyes: 56,
      tentacles: 3,
      color: "green",
      hasHorns: true,
    },
  ],
};

export const MonsterContext = createContext<{
  state: MonsterState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialMonsterState,
  dispatch: () => null,
});

type Action =
  | { type: "ADD"; payload: Monster }
  | { type: "REMOVE"; payload: string };

const reducer = (state: MonsterState, action: Action) => {
  switch (action.type) {
    case "ADD":
      return {
        monsters: [...state.monsters, action.payload],
      };
    case "REMOVE":
      return {
        monsters: state.monsters.filter(
          (monster) => monster.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

type MonsterContextProviderProp = {
  children: React.ReactNode;
};
function MonsterContextProvider({ children }: MonsterContextProviderProp) {
  // här kan vi använda useReducer eller useState

  const [state, dispatch] = useReducer(reducer, initialMonsterState);

  return (
    <MonsterContext.Provider value={{ state, dispatch }}>
      {children}
    </MonsterContext.Provider>
  );
}

export default MonsterContextProvider;
