import React, { useContext, useState } from "react";
import { MonsterContext } from "./MonsterContextProvider";
import { v4 as uuidv4 } from "uuid";

const Monster = () => {
  const { state, dispatch } = useContext(MonsterContext);
  const [name, setName] = useState("");
  const [eyes, setEyes] = useState(0);
  const [tentacles, setTentacles] = useState(0);
  const [color, setColor] = useState("");
  const [hasHorns, setHasHorns] = useState(false);

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleChangeEyes: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEyes(Number(e.target.value));
  };

  const handleChangeTentacles: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTentacles(Number(e.target.value));
  };

  const handleChangeColor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setColor(e.target.value);
  };

  const handleChangeHasHorns: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setHasHorns(e.target.checked);
  };

  const handleClick = () => {
    dispatch({
      type: "ADD",
      payload: {
        name: name,
        eyes: eyes,
        tentacles: tentacles,
        color: color,
        id: uuidv4(),
        hasHorns: hasHorns,
      },
    });
    setName("");
    setEyes(0);
    setTentacles(0);
    setColor("");
    setHasHorns(false);
  };

  const handleClickDelete = (id: string) => {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  };

  // Calculate total number of tentacles
  const totalTentacles = state.monsters.reduce(
    (total, monster) => total + monster.tentacles,
    0
  );

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" value={name} onChange={handleChangeName} />
      <label htmlFor="eyes">Eyes: </label>
      <input type="number" id="eyes" value={eyes} onChange={handleChangeEyes} />
      <label htmlFor="tentacles">Tentacles: </label>
      <input
        type="number"
        id="tentacles"
        value={tentacles}
        onChange={handleChangeTentacles}
      />
      <label htmlFor="color">Color: </label>
      <input
        type="text"
        id="color"
        value={color}
        onChange={handleChangeColor}
      />
      <label>
        <input
          type="checkbox"
          checked={hasHorns}
          onChange={handleChangeHasHorns}
        />
        Has Horns
      </label>
      <button onClick={handleClick}>Add monster</button>
      <ul>
        {state.monsters.map((monster) => {
          return (
            <li key={monster.id}>
              Name: {monster.name}, Tentacles: {monster.tentacles}, Eyes:{" "}
              {monster.eyes}, Color: {monster.color}, Has Horns:{" "}
              {monster.hasHorns ? "Yes" : "No"}{" "}
              <button onClick={() => handleClickDelete(monster.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <p>Total number of tentacles: {totalTentacles}</p>
    </div>
  );
};

export default Monster;
