import { doc, getDoc } from 'firebase/firestore';

import { db } from '../api';

import { TUser } from '@/types/TUser';

export async function getUser(id: string): Promise<TUser> {
  try {
    const userDoc = await getDoc(doc(db, 'users', id));
    const user = userDoc.data() as TUser;

    return user;
  } catch (error) {
    throw error;
  }
}
