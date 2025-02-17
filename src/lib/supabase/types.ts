export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          phone: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      military_service: {
        Row: {
          id: string
          user_id: string
          rank: string
          branch: string
          primary_mos: string
          unit: string | null
          start_date: string
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          rank: string
          branch: string
          primary_mos: string
          unit?: string | null
          start_date: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          rank?: string
          branch?: string
          primary_mos?: string
          unit?: string | null
          start_date?: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      evaluations: {
        Row: {
          id: string
          military_service_id: string
          evaluation_type: string
          evaluation_date: string
          responsibilities: string[]
          skills: string[]
          awards: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          military_service_id: string
          evaluation_type: string
          evaluation_date: string
          responsibilities?: string[]
          skills?: string[]
          awards?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          military_service_id?: string
          evaluation_type?: string
          evaluation_date?: string
          responsibilities?: string[]
          skills?: string[]
          awards?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      job_matches: {
        Row: {
          id: string
          evaluation_id: string
          onet_code: string
          job_title: string
          match_score: number | null
          selected: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          evaluation_id: string
          onet_code: string
          job_title: string
          match_score?: number | null
          selected?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          evaluation_id?: string
          onet_code?: string
          job_title?: string
          match_score?: number | null
          selected?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}