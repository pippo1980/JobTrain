CREATE TABLE train_t
(
  id TEXT PRIMARY KEY,
  train_type TEXT NOT NULL,
  serial_num TEXT NOT NULL,
  name TEXT NOT NULL,
  price TEXT,
  vip_price TEXT,
  apply_count INTEGER,
  total_count INTEGER,
  signin_time TEXT,
  train_time TEXT,
  classroom TEXT,
  student_desc TEXT,
  train_desc TEXT NOT NULL,
  requirement TEXT NOT NULL,
  purpose_org TEXT NOT NULL,
  obtain_skill TEXT NOT NULL,
  target_role TEXT NOT NULL
);
