import { createClient } from "@supabase/supabase-js";
import {environment} from "../../src/environments/environment"

const supabase = createClient(environment.PROJECT_URL, environment.KEY);

export function videoService() {
  return {
    getAllVideos(){
       return supabase.from("video")
                .select("*")
    }
  }
}