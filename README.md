This project was generated with [DevFactory]

It consists of two packages:

### [Server](./server/README.md)

## Entity with static data

- Add a ts file in server/scripts repository that contains your postgres querries
- Import your file in the seed.ts and loop over it to execute each querry.

### Example


**server/scripts/categorySeed.ts**

```
export  const  modifyUpdatedAtDefaultValue =
'ALTER TABLE "public"."Category" ALTER COLUMN "updatedAt" SET DEFAULT now()';

export  const  modifyIdDefaultValue =
'ALTER TABLE "public"."Category" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()::text';

export  const  addCategoryData =
'INSERT INTO "public"."Category"(label, description) VALUES ' +
"('Comedy', 'Comedy'), " +
"('Animation', 'Animation'), " +
"('Action', 'Action'), " +
"('Crime ', 'Crime'), " +
"('Thriller ', 'Thriller'), " +
"('Mystery ', 'Mystery'), " +
"('Adventure ', 'Adventure'); ";
```

**server/scripts/seed.ts**

```
import  *  as  categorySeed  from  "./categorySeed"

for (const  query  of  Object.values(categorySeed)) {
	await  client.$queryRawUnsafe(query)
}
```
