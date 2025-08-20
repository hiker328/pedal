import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseKey)
}

// Cria o cliente Supabase apenas se as variáveis estiverem configuradas
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl!, supabaseKey!)
  : null

// Função helper para usar o Supabase com verificação
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase não está configurado. Verifique as variáveis de ambiente.")
  }
  return supabase!
}
