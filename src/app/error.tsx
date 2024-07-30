"use client";

import { useEffect } from "react";

type ErrorType = {
  error: string;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Произола ошибка.</h2>
      <button onClick={reset}>Обновить страницу.</button>
    </div>
  );
}
