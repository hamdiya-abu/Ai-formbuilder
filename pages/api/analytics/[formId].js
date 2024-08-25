import { db } from '../../../configs';
import { JsonForms, userResponses, formViews } from '../../../configs/schema';
import { eq ,sql} from 'drizzle-orm';

export default async function handler(req, res) {
  const { formId } = req.query;

  if (req.method === 'GET') {
    try {
      // Fetch form details
      const [form] = await db.select().from(JsonForms).where(eq(JsonForms.id, formId));

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      //Fetch submission count
      const submissionCount = await db
        .select({ count: sql`COUNT(*)` })
        .from(userResponses)
        .where(eq(userResponses.formRef, formId))
        .then((res) => res[0]?.count || 0);

      // Fetch view count
      const viewCount = await db
        .select({ count: sql`COUNT(*)` })
        .from(formViews)
        .where(eq(formViews.formId, formId))
        .then((res) => res[0]?.count || 0);

      // Calculate conversion rate
      const conversionRate = viewCount > 0 ? ((submissionCount / viewCount) * 100).toFixed(2) : 0;


      // Fetch submissions over time (last 7 days)
      const submissionsOverTime = await db
  .select({
    date: sql`DATE_TRUNC('day', TO_TIMESTAMP(${userResponses.createdAt}, 'DD/MM/YYYY'))`,
    count: sql`COUNT(*)`,
  })
  .from(userResponses)
  .where(eq(userResponses.formRef, formId))
  .groupBy(sql`DATE_TRUNC('day', TO_TIMESTAMP(${userResponses.createdAt}, 'DD/MM/YYYY'))`)
  .orderBy(sql`DATE_TRUNC('day', TO_TIMESTAMP(${userResponses.createdAt}, 'DD/MM/YYYY'))`);


      res.status(200).json({
        form,
        submissionCount,
        viewCount,
        conversionRate,
        submissionsOverTime,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}