import { VscGithubInverted } from 'react-icons/vsc';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { api } from '../../services/api';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=6e3633a35c5410f5d936`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    console.log(user);
  }

  useEffect(() => {
    const url = window.location.href;

    const hasGitHubCode = url.includes('?code=');

    if (hasGitHubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong> Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGitHub}>
        <VscGithubInverted size={24} />
        Entra com GitHub
      </a>
    </div>
  );
}
