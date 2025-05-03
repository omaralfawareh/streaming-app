/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";


export const signInAction = async (state:any, formData: FormData) => {
    const cookieStore = await cookies();
  cookieStore.set("name", "omar");

    console.log(formData);
        if(!formData.get("email") || !formData.get("password")){ 
            return false
        }
        // redirect('/')
        return true;
        
  };