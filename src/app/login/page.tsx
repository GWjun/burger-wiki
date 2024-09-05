import { redirect } from 'next/navigation';
import { GoogleLoginButton } from '#features/auth';
import { auth } from '#shared/lib/utils/auth';
import LogoText from '#shared/ui/LogoText';
import * as styles from './styles.css';

export default async function Login() {
  const session = await auth();
  if (session) redirect('/');

  return (
    <div className={styles.container}>
      <LogoText size={40} />
      <p className={styles.text}>버거 일지를 기록해 보세요</p>
      <GoogleLoginButton />
    </div>
  );
}
