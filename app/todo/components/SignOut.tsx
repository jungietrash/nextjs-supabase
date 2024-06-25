import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const SignOut = () => {

    const LogOut = async () => {
        "use server";

        const supabase = await createSupabaseServerClient();

        await supabase.auth.signOut();
        redirect('/auth-server-action');
    }

  return (
    <form action={LogOut}>
       <button className='bg-blue-200'>Sign Out</button> 
    </form>
  )
}

export default SignOut