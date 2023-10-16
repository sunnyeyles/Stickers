import { useState, useEffect } from 'react'

export const usePersistentState = (key: string, defaultValue: any) => {

  // read key from local storage if not found use default value
  const [value, setValue] = useState(() => {
    let currentValue

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue
    }

    return currentValue
  });

  // update local storage when value changes
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(value));
    console.log("persist", value)
  }, [value])

  return [value, setValue]
}
