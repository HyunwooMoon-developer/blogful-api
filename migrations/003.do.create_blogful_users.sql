CREATE TABLE blogful_users(
    id integer primary key generated by default as identity,
    fullname text not null,
    username text not null unique,
    password text,
    nickname text,
    date_created TIMESTAMPTZ not null default now()
);

alter table blogful_articles
add column
author integer references blogful_users(id)
on delete set null;