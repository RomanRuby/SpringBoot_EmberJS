CREATE TABLE authors (
  id   BIGSERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE posts (
  id   BIGSERIAL PRIMARY KEY,
  title VARCHAR ,
  date  TIMESTAMP,
  body VARCHAR ,
  author_id    BIGINT REFERENCES authors
);





