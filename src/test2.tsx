import { useState } from "react";

const ExampleComponent = () => {
  const [count, setCount] = useState(0);
  const someVar = 10;
  let unusedVar;
  var varVariable = "This should be a let or const";

  function handleClick() {
    setCount(count + 1);
    alert("Button clicked"); // no-alert
  }

  function handleLoop() {
    for (let i = 0; i < 5; i++) {
      function insideLoop() {
        // no-loop-func
        console.log(i);
      }
      insideLoop();
    }
  }

  function redundantConstructor() {
    // no-useless-constructor
    return null;
  }

  if (count == 5) {
    // eqeqeq
    console.log("Count is 5");
  } else {
    count = 0;
  } // no-else-return

  console.log(varVariable);
  console.log("gi");

  eval('console.log("This is eval")'); // no-eval

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default ExampleComponent;
