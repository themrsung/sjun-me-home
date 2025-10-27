import React, { useEffect, useState } from 'react';
import './App.css';

type ThemeMode = 'dark' | 'light';
type ContactIcon = 'mail' | 'telegram' | 'phone';

const companyBrand = {
  label: '미래 리서치',
  imageSrc: '/white-bg.png',
};

const linkItems = [
  {
    label: '클래스101 멤버십',
    href: 'https://class101.net/ko/creators/@sjun/membership?creatorId=y9LBXJ8qHwgfntqiXIY9QffRkC02',
    description: '경제를 본질적으로 이해하는 대표 커리큘럼. 지금 바로 합류하세요.',
    emphasis: true,
  },
  {
    label: '인스타그램',
    href: 'https://instagram.com/sjun.me',
    description: '서준의 생각과 일상을 가장 먼저 확인해보세요.',
  },
  {
    label: '기업정보 시스템',
    href: 'https://finance.sjun.me/',
    description: '데이터 기반 기업 분석 리포트와 대시보드.',
  },
];

const contactLinks: Array<{
  label: string;
  href: string;
  icon: ContactIcon;
  isExternal?: boolean;
}> = [
  {
    label: '이메일로 문의하기',
    href: 'mailto:biz@sjun.me',
    icon: 'mail',
  },
  {
    label: '텔레그램 채널로 이동',
    href: 'https://t.me/themrsung',
    icon: 'telegram',
    isExternal: true,
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

  const stored = window.localStorage.getItem('sjun-theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('sjun-theme', theme);
  }, [theme]);

  const currentYear = new Date().getFullYear();

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <section className="profile">
          <div className="avatar">
            <img src="/profile-big.jpg" alt="서준 프로필" loading="lazy" />
          </div>
          <h1 className="creator-name">서준</h1>
          <p className="legal-name">Min Jun Sung (성민준)</p>
          <p className="role">대표 · 디지털팀</p>
          <p className="catchphrase">
            경제를 보는 새로운 관점. 본질만을 다루는 진짜 강의를 선보입니다.
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
            </dl>
          </div>
        </details>

        <footer className="footer">
          <span className="footer-copy">
            © {currentYear} Mirae Research, All Rights Reserved.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
