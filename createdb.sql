-- Create the tables, remember to update the backend to use the right_case for sql files

-- You want a many to one relationship between the sessions and the users

-- Consider also having the sql files removed on deletion of the user

-- \d <name of table to get all the types
CREATE TABLE sessions(
    session_id SERIAL NOT NULL PRIMARY KEY,
    phone_number BIGINT NOT NULL,
    call_duration INT NOT NULL
);


CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    phone_number BIGINT,
    password VARCHAR(100),
    user_sessions INT REFERENCES sessions(session_id)
);

-- CASCADE DELETE IF REQUIRED https://kb.objectrocket.com/postgresql/how-to-use-the-postgresql-delete-cascade-1369

-- need to add an update step that adds the session to a user :
    -- UPDATE users SET user_sessions = (returned session id on creation) WHERE id = (user_id)
        -- ^pseudocode, need to use variables

