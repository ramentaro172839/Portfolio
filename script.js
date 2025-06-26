/*
Portfolio JavaScript
インタラクティブ機能とアニメーション
Vanilla JavaScript使用
*/

// DOM要素を取得
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// アプリケーションの初期化
function initializeApp() {
    setupScrollEffects();
    setupMobileMenu();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupSkillsAnimation();
    setupFormSubmission();
}

// スクロール効果の設定
function setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ヘッダーの背景変更
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // アクティブなナビゲーションリンクの更新
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// アクティブなナビゲーションリンクの更新
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // すべてのナビリンクからactiveクラスを削除
            navLinks.forEach(link => link.classList.remove('active'));
            
            // 対応するナビリンクにactiveクラスを追加
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// モバイルメニューの設定
function setupMobileMenu() {
    hamburger.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // モバイルメニューのリンクをクリックした時にメニューを閉じる
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // メニュー外をクリックした時にメニューを閉じる
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// モバイルメニューの開閉
function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

// モバイルメニューを閉じる
function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

// スムーズスクロールの設定
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer の設定（スクロール時のアニメーション）
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // スキルプログレスバーのアニメーション
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // 監視対象の要素を設定
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // セクション全体も監視
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// スキルバーのアニメーション設定
function setupSkillsAnimation() {
    // スキルバーの初期設定
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        bar.setAttribute('data-target-width', width);
    });
}

// スキルバーのアニメーション実行
function animateSkillBars() {
    skillProgressBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-target-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, index * 200); // 順次アニメーション
    });
}

// フォーム送信の処理
function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

// フォーム送信のハンドリング
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // ボタンの状態を変更
    const originalText = submitButton.textContent;
    submitButton.textContent = '送信中...';
    submitButton.disabled = true;
    
    // 実際の送信処理（バックエンドがある場合）
    // ここではダミーの処理を実装
    setTimeout(() => {
        showNotification('メッセージを送信しました！', 'success');
        form.reset();
        
        // ボタンの状態を元に戻す
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// 通知の表示
function showNotification(message, type = 'info') {
    const notification = createNotificationElement(message, type);
    document.body.appendChild(notification);
    
    // アニメーションで表示
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 3秒後に削除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 通知要素の作成
function createNotificationElement(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // スタイルを直接設定
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // タイプに応じた背景色
    const colors = {
        success: '#00ADB5',
        error: '#FF6B6B',
        info: '#4ECDC4'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    return notification;
}

// ポートフォリオカードのモーダル機能（将来の拡張用）
function setupPortfolioModals() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        const viewButton = card.querySelector('.btn');
        if (viewButton) {
            viewButton.addEventListener('click', function() {
                // モーダルを開く処理（実装は必要に応じて）
                console.log('Portfolio item clicked');
            });
        }
    });
}

// ユーティリティ関数
const utils = {
    // デバウンス関数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // スロットル関数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 要素が画面内にあるかチェック
    isElementInViewport: function(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// パフォーマンス最適化
const optimizedScrollHandler = utils.throttle(function() {
    updateActiveNavLink();
}, 100);

// 通知スタイルの動的追加
const notificationStyles = `
    .notification.show {
        transform: translateX(0) !important;
    }
    
    .notification:hover {
        transform: translateX(0) scale(1.05) !important;
    }
`;

// スタイルを動的に追加
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = notificationStyles;
    document.head.appendChild(style);
}

// 初期化時にスタイルを追加
addNotificationStyles();

// ESLint用のグローバル変数宣言
/* global IntersectionObserver */

console.log('Portfolio script loaded successfully');