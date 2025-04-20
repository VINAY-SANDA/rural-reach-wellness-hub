
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeDatabase } from './lib/supabase';

// Initialize Supabase database
initializeDatabase().catch(console.error);

createRoot(document.getElementById("root")!).render(<App />);
