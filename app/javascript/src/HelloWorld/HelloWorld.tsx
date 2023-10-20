import { Divider, Text, TextField } from "@simplybusiness/mobius";
import "@simplybusiness/theme-sb";
import React, { useState } from "react";

type Props = {
  name?: string;
};

const HelloWorld = ({ name }: Props) => {
  const [_name, setName] = useState(name);

  const handleChange = (value: string) => {
    setName(value);
  };

  return (
    <div>
      <Text variant="h1">Hello, {_name}!</Text>
      <Divider />
      <form>
        <TextField
          label="Say hello to:"
          value={_name}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default HelloWorld;
