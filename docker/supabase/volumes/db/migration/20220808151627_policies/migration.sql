create or replace function requesting_user_id() returns text  language sql stable 
as $$ 
select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text; 
$$;

CREATE OR REPLACE FUNCTION current_Entreprise_id() RETURNS text AS $$
SELECT "Entreprise".id
FROM public."Entreprise",public."Recruiter",public."User"
WHERE 
"User"."id"=requesting_user_id()
AND "Entreprise"."id" = "Recruiter"."entrepriseId" 
AND "Recruiter"."userId"  = "User"."id";
$$
LANGUAGE SQL
;

CREATE OR REPLACE FUNCTION current_publication_id() RETURNS text AS $$
SELECT "Entreprise".id
FROM public."Entreprise",public."Recruiter",public."User"
WHERE 
"User"."id"=requesting_user_id()
AND "Entreprise"."id" = "Recruiter"."entrepriseId" 
AND "Recruiter"."userId"  = "User"."id";
$$
LANGUAGE SQL
;