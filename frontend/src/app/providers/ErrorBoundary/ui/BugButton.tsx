import React, { useEffect, useState } from "react";
import Button from "shared/ui/Button/Button";

const BugButton = () => {
  const [error, setError] = useState(false);

  const onError = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return <Button onClick={onError}>Ошибка</Button>;
};

export default BugButton;
