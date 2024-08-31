CREATE TABLE public.products (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    recipe TEXT NOT NULL,
    image TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    image_names TEXT[]  -- Array of text values to store multiple image names
);