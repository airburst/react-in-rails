import React, { useState, FC } from "react";
import style from "./HelloWorld.module.css";

type HelloProps = {
  name: string;
};

const HelloWorld: FC<HelloProps> = ({ name }: HelloProps) => {
  const [_name, setName] = useState(name);

  return (
    <div>
      <h3>Hello, {_name}!</h3>
      <hr />
      <form>
        <label className={style.bright} htmlFor="name">
          Say hello to:
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

export default HelloWorld;
