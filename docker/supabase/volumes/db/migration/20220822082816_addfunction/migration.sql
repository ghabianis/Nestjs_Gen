create or replace function requesting_user_role()
returns text 
language sql stable 
as $$ 
select nullif(current_setting('request.jwt.claims', true)::json->>'role', '')::text; 
$$;;