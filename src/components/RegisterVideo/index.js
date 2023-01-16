import { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import { environment } from "../../environments/environment"
import { createClient } from "@supabase/supabase-js";

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

function getThumbnail(url){
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

const supabase = createClient(environment.PROJECT_URL, environment.KEY)

export default function RegisterVideo(){
  const formCadastro = useForm({
    initialValues: {playlist: "", titulo: "", url: ""}
  });
  const [formVisivel, setFormVisivel] = useState(false);

  console.log();

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>

      {formVisivel && (
              <form onSubmit={(event)=> {
                event.preventDefault();
                supabase.from("video").insert({
                  playlist: formCadastro.values.playlist,
                  title: formCadastro.values.titulo,
                  url: formCadastro.values.url,
                  thumb: getThumbnail(formCadastro.values.url),
                })
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  console.log('error: ', err)
                })

                setFormVisivel(false);
                formCadastro.clearForm();
              }}>
                <div>
                  <button type="button" className="close-modal" onClick={()=> setFormVisivel(false)}>
                    X
                  </button>

                  <input 
                    placeholder="Playlist"
                    name="playlist"
                    value={formCadastro.values.playlist} 
                    onChange={formCadastro.handleChange} 
                  />
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