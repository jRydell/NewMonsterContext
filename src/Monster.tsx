import { useContext, useState } from "react";
import { MonsterContext } from "./MonsterContextProvider";
import { v4 as uuidv4 } from "uuid";

const Monster = () => {
  const { state, dispatch } = useContext(MonsterContext);
  const [name, setName] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    dispatch({
      type: "ADD",
      payload: {
        name: name,
        eyes: 0,
        tentacles: 0,
        color: "",
        id: uuidv4(),
        hasHorns: true,
      },
    });
  };

  const handleClickDelete = (id: string) => {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  };

  return (
    <div>
      <ul>
        {state.monsters.map((monster) => {
          return (
            <li key={monster.id}>
              Name: {monster.name}, Tentacles: {monster.tentacles}, Eyes:{" "}
              {monster.eyes}, Color: {monster.color}, Has Horns:{" "}
              {monster.hasHorns ? "Yes" : "No"}
              <button onClick={() => handleClickDelete(monster.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Add monster</button>
    </div>
  );
};

export default Monster;
