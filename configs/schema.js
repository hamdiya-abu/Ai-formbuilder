//import { boolean } from "drizzle-orm/mysql-core";
import { pgTable, varchar , serial ,text, integer,boolean,timestamp} from "drizzle-orm/pg-core";

export const JsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    theme:varchar('theme'),
    background:varchar('background'),
    style:varchar('style'),
   createdBy:varchar('createdBy').notNull(),
   createdAt:varchar('createdAt').notNull(),
   enableSignIn:boolean('enabledSignIn').default(false)
  });

  export const userResponses=pgTable('userResponses',{
    id: serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    createdBy:varchar('createdBy').default('anonymous'),
    createdAt:varchar('createdAt').notNull(),
    formRef:integer('formRef').references(()=>JsonForms.id)
  });

  // New table for tracking form views
export const formViews = pgTable('formViews', {
  id: serial('id').primaryKey(),
  formId: integer('formId').references(() => JsonForms.id).notNull(),
  viewedAt: timestamp('viewedAt').defaultNow(),
});