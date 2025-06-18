export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
          domains: string[];
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
          domains?: string[];
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
          domains?: string[];
        };
      };
    }
}
};