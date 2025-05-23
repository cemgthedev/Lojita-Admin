import { collection, getDocs } from 'firebase/firestore';

import { db } from '../api';

import { TUser } from '@/types/TUser';

export async function searchUser(): Promise<TUser[]> {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => doc.data() as TUser);

    return users;
  } catch (error) {
    throw error;
  }
}
