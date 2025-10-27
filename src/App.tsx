import React, { useEffect, useState } from 'react';
import './App.css';

type ThemeMode = 'dark' | 'light';
type ContactIcon = 'mail' | 'telegram' | 'phone' | 'instagram';

const companyBrand = {
  label: '미래 리서치',
  imageSrc: '/white-bg.png',
};

const linkItems = [
  {
    label: '멤버십 가입하기',
    href: 'https://class101.net/ko/creators/@sjun/membership?creatorId=y9LBXJ8qHwgfntqiXIY9QffRkC02',
    description: '월 4,900원으로 압도적인 투자 우위를 확보하세요.',
    emphasis: true,
  },
  {
    label: '인공지능 시대, 버블에 투자하는 법',
    href: 'https://class101.net/ko/products/68db8809c371cea6c296a532',
    description: '자본주의는 반복됩니다. 수익의 정답은 과거에 있습니다.',
  },
  {
    label: '텔레그램 채널',
    href: 'https://t.me/sjun_101',
    description: '가장 빠르게 투자 인사이트를 받아보세요.',
  },
];

const contactLinks: Array<{
  label: string;
  href: string;
  icon: ContactIcon;
  isExternal?: boolean;
}> = [
  {
    label: '텔레그램 채널',
    href: 'https://t.me/themrsung',
    icon: 'telegram',
    isExternal: true,
  },
  {
    label: '인스타그램',
    href: 'https://instagram.com/sjun.me',
    icon: 'instagram',
    isExternal: true,
  },
  {
    label: '이메일로 문의하기',
    href: 'mailto:biz@sjun.me',
    icon: 'mail',
  },
  {
    label: '대표번호로 전화하기',
    href: 'tel:070-8065-7316',
    icon: 'phone',
  },
];

const renderIcon = (type: ContactIcon) => {
  switch (type) {
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4.25 5.5h15.5a1.75 1.75 0 0 1 1.75 1.75v9.5a1.75 1.75 0 0 1-1.75 1.75H4.25A1.75 1.75 0 0 1 2.5 16.75v-9.5A1.75 1.75 0 0 1 4.25 5.5Zm0 1.5a.25.25 0 0 0-.25.25v.33l8 5.08 8-5.08v-.33a.25.25 0 0 0-.25-.25Zm15.5 11a.25.25 0 0 0 .25-.25V8.77l-7.55 4.79a.75.75 0 0 1-.8 0L4.25 8.77v8.98a.25.25 0 0 0 .25.25Z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.82 3.18a1.4 1.4 0 0 0-1.42-.17L3.4 10.33a1.1 1.1 0 0 0 .12 2.06l3.83 1.14 1.5 4.6a1.07 1.07 0 0 0 1.7.5l2.15-1.76 3.65 2.7a1.1 1.1 0 0 0 1.73-.66l2.3-14.1a1.1 1.1 0 0 0-.28-.96Zm-3.53 3.23-7.2 6.53a.75.75 0 0 0-.2.33l-.7 2.3-.94-2.88a.75.75 0 0 1 .47-.94l8.57-3.06a.38.38 0 0 1 .28.7l-4.9 3.52 2.94 2.16 1.68-8.16Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5Zm0 1.5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.25a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm5.25-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8.7 3.5h-.92a1.53 1.53 0 0 0-1.51 1.3c-.47 3.16.5 6.62 2.89 10.37 2.4 3.74 5 5.9 7.77 6.5a1.53 1.53 0 0 0 1.62-.82l.4-.87a1.53 1.53 0 0 0-.49-1.88l-2.24-1.56a1.53 1.53 0 0 0-1.99.2l-.78.79c-.3.3-.78.37-1.15.15a10.07 10.07 0 0 1-3.62-3.97c-.19-.37-.11-.83.2-1.12l.8-.76a1.53 1.53 0 0 0 .23-1.97L9.29 5a1.53 1.53 0 0 0-1.4-.83Z" />
        </svg>
      );
    default:
      return null;
  }
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    if (media.addEventListener) {
      media.addEventListener('change', handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!copiedKey) {
      return;
    }

    const timer = window.setTimeout(() => setCopiedKey(null), 1600);
    return () => window.clearTimeout(timer);
  }, [copiedKey]);

  const currentYear = new Date().getFullYear();

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopy = async (value: string, key: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
    } catch (error) {
      console.error('Clipboard copy failed', error);
    }
  };

  return (
    <div className="app-shell">
      <div className="glow-backdrop" aria-hidden />
      <main className="card">
        <div className="top-bar">
          <div className="brand-badge">
            <img
              src={companyBrand.imageSrc}
              alt={`${companyBrand.label} 로고`}
              loading="lazy"
            />
            <span className="brand-name">{companyBrand.label}</span>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="4.25" fill="currentColor" />
                <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="4.6" />
                  <line x1="12" y1="19.4" x2="12" y2="22" />
                  <line x1="4.6" y1="12" x2="2" y2="12" />
                  <line x1="22" y1="12" x2="19.4" y2="12" />
                  <line x1="6.1" y1="6.1" x2="4.4" y2="4.4" />
                  <line x1="19.6" y1="19.6" x2="17.9" y2="17.9" />
                  <line x1="6.1" y1="17.9" x2="4.4" y2="19.6" />
                  <line x1="19.6" y1="4.4" x2="17.9" y2="6.1" />
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M17.75 15.77a6.75 6.75 0 0 1-9.52-9.52 8.25 8.25 0 1 0 9.52 9.52ZM11.5 2.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5Zm7.75 8.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5Zm-8.52 8.5a.75.75 0 0 0-.53.22l-.71.7a.75.75 0 0 0 1.06 1.07l.7-.7a.75.75 0 0 0-.52-1.29ZM4 11.5H3a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5Zm1.24-6.96-.7-.7a.75.75 0 1 0-1.06 1.06l.7.71A.75.75 0 0 0 5.24 4.54ZM11.5 7.25a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Zm7.95-2.71a.75.75 0 0 0-1.06-1.06l-.7.7a.75.75 0 0 0 1.06 1.07l.7-.7ZM11.5 19.75h-1a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5Z" />
              </svg>
            )}
          </button>
        </div>

        <section className="profile">
          <div className="avatar">
            <img src="/profile-big.jpg" alt="서준 프로필" loading="lazy" />
          </div>
          <h1 className="creator-name">서준</h1>
          <p className="legal-name">Min Jun Sung · 성민준</p>
          <p className="role">대표 · 디지털팀</p>
          <p className="catchphrase">
            경제를 보는 새로운 관점.<br />
            <span className="catchphrase-em">본질</span>만을 다루는 진짜 강의를 선보입니다.
          </p>
        </section>

        <section className="contact-actions" aria-label="연락 수단">
          {contactLinks.map(({ label, href, icon, isExternal }) => (
            <a
              key={label}
              href={href}
              className="contact-button"
              aria-label={label}
              title={label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {renderIcon(icon)}
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </section>

        <section className="link-list" aria-label="주요 링크">
          {linkItems.map(({ label, href, description, emphasis }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`link-tile${emphasis ? ' link-tile--primary' : ''}`}
            >
              <span className="link-label">{label}</span>
              <span className="link-description">{description}</span>
            </a>
          ))}
        </section>

        <details className="business-details">
          <summary>사업자 정보 확인</summary>
          <div className="business-content">
            <dl>
              <div>
                <dt>상호</dt>
                <dd>미래 리서치</dd>
              </div>
              <div>
                <dt>사업자등록번호</dt>
                <dd>726-15-02574</dd>
              </div>
              <div>
                <dt>통신판매신고번호</dt>
                <dd>2025-경기광주-1911</dd>
              </div>
              <div>
                <dt>대표번호</dt>
                <dd>070-8065-7316</dd>
              </div>
              <div>
                <dt>소재지</dt>
                <dd>경기도 광주시 오포읍 문형산안길 49-53, 1동 102호</dd>
              </div>
              <div>
                <dt>호스팅제공자</dt>
                <dd>Vercel, Inc.</dd>
              </div>
              <hr className="business-divider" />
              <div>
                <dt>세금계산서 발급</dt>
                <dd>
                  <button
                    type="button"
                    className="business-copy"
                    onClick={() => handleCopy('sjun@hometax.go.kr', 'tax')}
                    aria-label="세금계산서 발급 이메일 복사"
                  >
                    <span className="business-copy__value">sjun@hometax.go.kr</span>
                    <span
                      className={`copy-feedback${copiedKey === 'tax' ? ' is-active' : ''}`}
                      aria-live="polite"
                    >
                      {copiedKey === 'tax' ? '복사됨' : '복사'}
                    </span>
                  </button>
                  <span className="business-note">계속사업자 · 일반과세 개인사업자</span>
                </dd>
              </div>
            </dl>
          </div>
        </details>

        <footer className="footer">
          <span className="footer-copy">
            © {currentYear} Mirae Research, All Rights Reserved.
          </span>
          <div className="footer-links">
            <a
              className="footer-link"
              href="https://class101.net/ko/creators/@sjun"
              target="_blank"
              rel="noopener noreferrer"
            >
              클래스101
            </a>
            <span className="footer-separator" aria-hidden="true">
              |
            </span>
            <a
              className="footer-link"
              href="https://discord.gg/XjjHwJDy"
              target="_blank"
              rel="noopener noreferrer"
            >
              미래 온라인
            </a>
            <span className="footer-separator" aria-hidden="true">
              |
            </span>
            <a
              className="footer-link"
              href="https://www.dropbox.com/scl/fo/twd57t33btb702r499mus/AOj9u4ZGLMSSsLEnJ1MY1Tg?rlkey=iu8jrdobumdl1o90k7aba8ihs&st=tsksmxsq&dl=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              보도자료
            </a>
          </div>
          <p className="disclaimer">
            <strong>사칭 및 사기에 유의하세요.</strong> 미래 리서치는 투자자문업자가 아니며, 어떠한 경우에도 금전적 대가를 조건으로 투자 권유를 제공하지 않습니다.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
