-- Meta key/value table; used to version the seeded plan content so
-- deploys with updated plan data refresh the plans table.
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
