import { Group, Button, Text } from "@mantine/core";
import { useCounter } from "@mantine/hooks";

export const Demo = () => {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <Text>Count: {count}</Text>
      <Group position="center">
        <Button
          // sx prop to override styles
          sx={{}}
          onClick={handlers.increment}
          radius="sm"
          variant="outline"
        ></Button>
        <Button onClick={handlers.decrement}>Decrement</Button>
        <Button onClick={handlers.reset}>Reset</Button>
        <Button onClick={() => handlers.set(5)}>Set 5</Button>
      </Group>
    </>
  );
};
