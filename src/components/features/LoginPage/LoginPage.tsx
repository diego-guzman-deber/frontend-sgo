import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input }  from '../../ui/Input';
import styles from './LoginPage.module.css';

/* ── Íconos inline SVG (sin dependencias extra) ── */
function IconMail() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      width="100%" height="100%">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2 7l8 5 8-5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      width="100%" height="100%">
      <rect x="4" y="9" width="12" height="9" rx="2" />
      <path d="M7 9V6a3 3 0 016 0v3" />
      <circle cx="10" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function IconEye({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      width="100%" height="100%">
      <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      width="100%" height="100%">
      <path d="M3 3l14 14M8.5 8.6A2.5 2.5 0 0012.4 12M6.1 6.2C4.2 7.4 2.8 9 2 10s3 6 8 6a9 9 0 004.8-1.4M9 4.1A8.4 8.4 0 0110 4c5 0 8 6 8 6a13.3 13.3 0 01-1.8 2.6" />
    </svg>
  );
}

/* ── Tipos ── */
interface LoginFormState {
  email:    string;
  password: string;
}

interface LoginFormErrors {
  email?:    string;
  password?: string;
}

/* ── Componente principal ── */
export function LoginPage() {
  const [form, setForm]       = useState<LoginFormState>({ email: '', password: '' });
  const [errors, setErrors]   = useState<LoginFormErrors>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]  = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: LoginFormErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'El correo es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Ingresa un correo válido.';
    }
    if (!form.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (form.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: conectar con el servicio de autenticación
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
  }

  return (
    <div className={styles.page}>
      {/* Fondo decorativo */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
        <div className={styles.bgGrid}  />
      </div>

      {/* Card */}
      <main className={styles.card} role="main">
        {/* Cabecera */}
        <header className={styles.header}>
          <div className={styles.logoMark} aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
              <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
              <path d="M9 16h14M16 9v14" stroke="#fff" strokeWidth="2.5"
                strokeLinecap="round" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2d6a2d" />
                  <stop offset="1" stopColor="#3a8a3a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <p className={styles.brand}>El Deber</p>
            <h1 className={styles.title}>Sistema de Gestión de Órdenes</h1>
          </div>
        </header>

        <div className={styles.divider} />

        {/* Formulario */}
        <form
          id="login-form"
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>

          <Input
            id="login-email"
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="correo@eldeber.com.bo"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            leftIcon={<IconMail />}
          />

          <div className={styles.passwordField}>
            <Input
              id="login-password"
              name="password"
              type={showPass ? 'text' : 'password'}
              label="Contraseña"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon={<IconLock />}
              rightIcon={
                <button
                  type="button"
                  className={styles.togglePass}
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <IconEye open={showPass} />
                </button>
              }
            />
          </div>

          <div className={styles.forgotRow}>
            <button type="button" className={styles.forgotLink}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button
            type="submit"
            id="login-submit"
            fullWidth
            size="lg"
            loading={loading}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </Button>
        </form>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} El Deber · SGO v1.0</p>
      </footer>
    </div>
  );
}
