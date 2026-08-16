-- Plans: full plan documents (recipes, weeks, macros) keyed by plan id.
CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Checks: shopping-list and prep-step completion, one row per checked item.
CREATE TABLE IF NOT EXISTS checks (
  plan TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('shop', 'step')),
  item INTEGER NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (plan, kind, item)
);
