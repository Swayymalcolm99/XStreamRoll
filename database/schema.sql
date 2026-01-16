-- Stellar Streaming Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Streams table
CREATE TABLE IF NOT EXISTS streams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stream data table
CREATE TABLE IF NOT EXISTS stream_data (
    id SERIAL PRIMARY KEY,
    stream_id INTEGER NOT NULL REFERENCES streams(id),
    data JSONB NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stream events table for processed events
CREATE TABLE IF NOT EXISTS stream_events (
    id SERIAL PRIMARY KEY,
    stream_id INTEGER NOT NULL REFERENCES streams(id),
    event_type VARCHAR(100),
    event_data JSONB NOT NULL,
    processed_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_streams_user_id ON streams(user_id);
CREATE INDEX idx_stream_data_stream_id ON stream_data(stream_id);
CREATE INDEX idx_stream_data_timestamp ON stream_data(timestamp);

-- Index for efficient event querying
CREATE INDEX idx_stream_events_stream_id ON stream_events(stream_id);
CREATE INDEX idx_stream_events_created_at ON stream_events(created_at);
