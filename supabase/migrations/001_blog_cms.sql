-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  cover_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure columns exist if the table was already created in an earlier migration
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- Create services_config table
CREATE TABLE IF NOT EXISTS services_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  cta_text TEXT DEFAULT 'Book Now',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create site_settings table (key-value)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
-- Anyone can read published posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Admins can do everything
CREATE POLICY "Admins have full access to blog posts" ON blog_posts
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );

-- Services Config Policies
-- Anyone can read active services
CREATE POLICY "Public can view active services" ON services_config
  FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins have full access to services config" ON services_config
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );

-- Site Settings Policies
-- Anyone can read settings
CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins have full access to site settings" ON site_settings
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );

-- Setup Supabase Storage Bucket for Blog Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images');

-- Seed Services
INSERT INTO services_config (name, slug, price, description, features, is_featured, display_order)
VALUES 
('Discovery Call', 'discovery', '25,000', 'The first step in working with Salvere. Understand your concerns and goals.', ARRAY['Health intake review', 'Initial goal setting', 'Next steps guidance'], false, 1),
('Single Session', 'single', '50,000', 'A focused, one-time consultation designed to help you understand root causes.', ARRAY['Root cause analysis', 'Lab result review', 'Clear explanation'], false, 2),
('Salvere Personalized Guide', 'guide', '80,000', 'A comprehensive, actionable guide tailored to your unique body chemistry.', ARRAY['Therapeutic meal plan', 'Supplement protocol', 'Lifestyle changes'], true, 3),
('Management Package', 'management', '150,000', 'Ongoing support and monthly check-ins for sustainable health transformation.', ARRAY['4 sessions per month', 'Continuous guidance', 'Progress tracking'], false, 4)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Blog Posts
INSERT INTO blog_posts (title, slug, content, author, status, excerpt, is_featured, cover_image)
VALUES 
('The Gut-Brain Connection: Why Your Mood Starts in Your Belly', 'gut-brain-connection', 'The human body is an incredible, interconnected system. For years, we thought the brain was the sole commander...', 'Dewumi Ebuk', 'published', 'Discover how your digestive health directly impacts your mental clarity and emotional well-being.', true, '/blog_gut_brain.png'),
('3 Simple Lifestyle Changes for Sustainable Energy', 'lifestyle-energy-tips', 'In our fast-paced world, many professionals rely on endless caffeine to get through the day...', 'Dewumi Ebuk', 'published', 'Stop the caffeine cycle. Learn the functional medicine approach to natural, lasting energy.', false, '/blog_sustainable_energy.png')
ON CONFLICT (slug) DO UPDATE SET cover_image = EXCLUDED.cover_image, is_featured = EXCLUDED.is_featured;
