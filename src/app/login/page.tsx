import { redirect } from 'next/navigation';
import { GoogleLoginButton } from '#features/auth';
import { auth } from '#shared/lib/utils/auth';
import * as styles from './styles.css';

export default async function Login() {
  const session = await auth();
  if (session) redirect('/');

  return (
    <div className={styles.container}>
      <GoogleLoginButton />
    </div>
  );
}
