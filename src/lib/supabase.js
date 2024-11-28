import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pyxspdyppqaqpasllwwv.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHNwZHlwcHFhcXBhc2xsd3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTg0MDksImV4cCI6MjA0ODM3NDQwOX0.FdGZ5APobxZmAn3B8GOS89eiDYyxGw1pVwPpwKECh2E";

export const supabase = createClient(supabaseUrl, supabaseKey);
