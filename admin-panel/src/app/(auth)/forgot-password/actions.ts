'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/reset-password`,
  })

  if (error) {
    redirect('/forgot-password?error=Could not send reset link')
  }

  redirect('/forgot-password?success=Check your email for the reset link')
}
