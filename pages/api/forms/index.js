import { db } from '../../../configs';
import { JsonForms } from '../../../configs/schema';
import { getAuth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const staticForms = [
        {
          id: 10,
          jsonform: '{"formTitle": "Test Form", "formFields": []}',
          theme: 'default',
          createdBy: 'user_2hK0p8wve8m5oFY9jlyGvVAeZ6W',
          createdAt: '2024-08-25',
          enableSignIn: true
        },
        {
          id: 18,
          jsonform: '{"formTitle": "Test Form 2", "formFields": []}',
          theme: 'default',
          createdBy: 'user_2hK0p8wve8m5oFY9jlyGvVAeZ6W',
          createdAt: '2024-08-26',
          enableSignIn: true
        },
        {
          id: 15,
          jsonform: '{"formTitle": "Test Form 3", "formFields": []}',
          theme: 'default',
          createdBy: 'user_2hK0p8wve8m5oFY9jlyGvVAeZ6W',
          createdAt: '2024-08-26',
          enableSignIn: true
        },
        {
          id: 17,
          jsonform: '{"formTitle": "Test Form 4", "formFields": []}',
          theme: 'default',
          createdBy: 'user_2hK0p8wve8m5oFY9jlyGvVAeZ6W',
          createdAt: '2024-08-26',
          enableSignIn: true
        },
        {
          id: 16,
          jsonform: '{"formTitle": "Test Form 5", "formFields": []}',
          theme: 'default',
          createdBy: 'user_2hK0p8wve8m5oFY9jlyGvVAeZ6W',
          createdAt: '2024-08-26',
          enableSignIn: true
        },
      ];

      res.status(200).json({ forms: staticForms });
    } catch (error) {
      console.error('Error fetching user forms:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
