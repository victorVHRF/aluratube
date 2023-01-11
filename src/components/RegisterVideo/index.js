import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(props) { 
  const [values, setValues] = useState(props.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value
      const name = event.target.name
      setValues({
        ...values,
        [name]: value
      })
    },
    clearForm(){
      setValues({})
    }
  }
}

export default function RegisterVideo(){
  const formCadastro = useForm({
    initialValues: {titulo: "", url: ""}
  });
  const [formVisivel, setFormVisivel] = useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>

      {formVisivel && (
              <form onSubmit={(event)=> {
                event.preventDefault();
                setFormVisivel(false);
                formCadastro.clearForm();
              }}>
                <div>
                  <button type="button" className="close-modal" onClick={()=> setFormVisivel(false)}>
                    X
                  </button>

                  <input 
                    placeholder="Título do vídeo"
                    name="titulo"
                    value={formCadastro.values.titulo} 
                    onChange={formCadastro.handleChange} 
                  />
                  <input 
                    placeholder="URL"
                    name="url" 
                    value={formCadastro.values.url} 
                    onChange={formCadastro.handleChange} 
                  />

                  <button type="submit">
                    Cadastrar
                  </button>
                </div>
              </form>
      )}
    </StyledRegisterVideo>
  )
}