import React, { useState } from "react";

export const ColorModeContext = React.createContext({
  //carrega o thema inicial da aplicação
  mode: "",
  setMode: () => { alert("voce precisa me configurar primeiro") },
  toggleMode: () => { alert("voce precisa me configurar primeiro") }
});

export default function ColorModeProvider(props){
  const [mode, setMode] = useState(props.initialMode);

   function toggleMode(){
    mode === "dark" ? setMode("light") : setMode("dark")
  }

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleMode }}>
      { props.children }
    </ColorModeContext.Provider>
  )
}