'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (!email || !password) {
    redirect('/signup?error=' + encodeURIComponent('Email and password are required'))
  }

  if (password.length < 6) {
    redirect('/signup?error=' + encodeURIComponent('Password must be at least 6 characters'))
  }

  if (confirmPassword && password !== confirmPassword) {
    redirect('/signup?error=' + encodeURIComponent('Passwords do not match'))
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=' + encodeURIComponent('Admin account created successfully! Please sign in.'))
}
