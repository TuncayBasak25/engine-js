import Keyboard, Mouse from engine.inputs;

function refreshInputs() {
  Keyboard.refresh();
  Mouse.refresh();
}

export refreshInputs;
