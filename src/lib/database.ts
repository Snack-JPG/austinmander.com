import { createClient } from '@supabase/supabase-js';
import { env, isDatabaseConfigured } from './env';
import { logger } from './logger';

// Initialize Supabase client if configured
const supabase = isDatabaseConfigured()
  ? createClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  : null;

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  message?: string;
  source?: string;
  score?: number;
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string;
  subscribed: boolean;
  created_at?: string;
  updated_at?: string;
}

// Lead management functions
export async function createLead(lead: Lead) {
  if (!supabase) {
    // Fallback: store in local JSON file (for development)
    return storeFallbackLead(lead);
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ ...lead, status: lead.status || 'new' }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    logger.error('Database error', error);
    // Fallback to local storage
    return storeFallbackLead(lead);
  }
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    logger.error('Database error', error);
    return { success: false, error: 'Failed to update lead' };
  }
}

export async function getLeads(filters?: { status?: string; limit?: number }) {
  if (!supabase) {
    return { success: false, error: 'Database not configured', data: [] };
  }

  try {
    let query = supabase.from('leads').select('*');
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    logger.error('Database error', error);
    return { success: false, error: 'Failed to fetch leads', data: [] };
  }
}

// Newsletter management functions
export async function subscribeToNewsletter(email: string, name?: string) {
  if (!supabase) {
    return storeFallbackSubscriber({ email, name, subscribed: true });
  }

  try {
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.subscribed) {
        return { success: false, error: 'Already subscribed' };
      }
      
      // Resubscribe
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({ subscribed: true, updated_at: new Date().toISOString() })
        .eq('email', email)
        .select()
        .single();
        
      if (error) throw error;
      return { success: true, data };
    }

    // New subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, name, subscribed: true }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    logger.error('Database error', error);
    return storeFallbackSubscriber({ email, name, subscribed: true });
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ subscribed: false, updated_at: new Date().toISOString() })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    logger.error('Database error', error);
    return { success: false, error: 'Failed to unsubscribe' };
  }
}

// Fallback storage (for development without database)
import fs from 'fs/promises';
import path from 'path';

const FALLBACK_DIR = path.join(process.cwd(), '.data');
const LEADS_FILE = path.join(FALLBACK_DIR, 'leads.json');
const SUBSCRIBERS_FILE = path.join(FALLBACK_DIR, 'subscribers.json');

async function ensureFallbackDir() {
  try {
    await fs.mkdir(FALLBACK_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

async function storeFallbackLead(lead: Lead) {
  try {
    await ensureFallbackDir();
    
    let leads = [];
    try {
      const content = await fs.readFile(LEADS_FILE, 'utf-8');
      leads = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }

    const newLead = {
      ...lead,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: 'new',
    };
    
    leads.push(newLead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    
    logger.info('Lead stored locally (database not configured)', { lead: newLead });
    return { success: true, data: newLead };
  } catch (error) {
    logger.error('Fallback storage error', error);
    return { success: false, error: 'Failed to store lead' };
  }
}

async function storeFallbackSubscriber(subscriber: NewsletterSubscriber) {
  try {
    await ensureFallbackDir();
    
    let subscribers = [];
    try {
      const content = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
      subscribers = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }

    const existing = subscribers.find((s: any) => s.email === subscriber.email);
    if (existing && existing.subscribed) {
      return { success: false, error: 'Already subscribed' };
    }

    if (existing) {
      existing.subscribed = true;
      existing.updated_at = new Date().toISOString();
    } else {
      subscribers.push({
        ...subscriber,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      });
    }
    
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    
    logger.info('Subscriber stored locally (database not configured)', { email: subscriber.email });
    return { success: true, data: subscriber };
  } catch (error) {
    logger.error('Fallback storage error', error);
    return { success: false, error: 'Failed to store subscriber' };
  }
}