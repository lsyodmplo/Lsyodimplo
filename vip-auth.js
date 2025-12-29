// ===== VIP AUTHENTICATION SYSTEM - ULTIMATE BEAUTY v3.0 =====
// Hệ thống xác thực VIP với giao diện cực đẹp, đảm bảo hoạt động 100%

class VIPAuthSystem {
    constructor() {
        this.isAuthenticated = false;
        this.vipKey = null;
        
        // Khởi tạo ngay lập tức
        this.init();
    }

    init() {
        // Xóa localStorage để test
        // localStorage.removeItem('vip_auth_token'); // Uncomment để test
        
        // Kiểm tra xác thực
        if (!this.checkAuth()) {
            this.createModal();
        } else {
            this.unlockWebsite();
        }
        
        this.setupProtection();
    }

    checkAuth() {
        const token = localStorage.getItem('vip_auth_token');
        if (token) {
            try {
                const data = JSON.parse(atob(token));
                if (this.validateKey(data.key)) {
                    this.isAuthenticated = true;
                    this.vipKey = data.key;
                    return true;
                }
            } catch (e) {
                localStorage.removeItem('vip_auth_token');
            }
        }
        return false;
    }

    createModal() {
        // Xóa modal cũ nếu có
        const existing = document.getElementById('vipModal');
        if (existing) existing.remove();

        // Tạo CSS
        this.injectCSS();

        // Tạo HTML modal
        const modalHTML = `
            <div id="vipModal" class="vip-modal">
                <!-- Background Effects -->
                <div class="vip-bg-effects">
                    <div class="vip-particles">
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                    </div>
                    <div class="vip-waves">
                        <div class="wave wave1"></div>
                        <div class="wave wave2"></div>
                        <div class="wave wave3"></div>
                    </div>
                    <div class="vip-gradient-orb orb1"></div>
                    <div class="vip-gradient-orb orb2"></div>
                    <div class="vip-gradient-orb orb3"></div>
                </div>

                <!-- Modal Content -->
                <div class="vip-container">
                    <!-- Header -->
                    <div class="vip-header">
                        <div class="vip-crown">
                            <div class="crown-icon">👑</div>
                            <div class="crown-sparkles">
                                <span class="sparkle">✨</span>
                                <span class="sparkle">💎</span>
                                <span class="sparkle">⭐</span>
                                <span class="sparkle">🌟</span>
                            </div>
                        </div>
                        <h1 class="vip-title">VIP ACCESS REQUIRED</h1>
                        <p class="vip-subtitle">RPG Maker AI Translator ULTIMATE v4.0</p>
                        <div class="vip-badges">
                            <span class="badge">🔒 SECURED</span>
                            <span class="badge">🛡️ PROTECTED</span>
                            <span class="badge">⚡ PREMIUM</span>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="vip-body">
                        <!-- Message -->
                        <div class="vip-message">
                            <div class="message-icon">🔐</div>
                            <h3>Truy cập VIP được yêu cầu</h3>
                            <p>Để sử dụng công cụ dịch AI cao cấp này, bạn cần có <strong>VIP Key</strong></p>
                            <div class="features-grid">
                                <div class="feature">🤖 AI Translation</div>
                                <div class="feature">⚡ Live Preview</div>
                                <div class="feature">🎯 Smart Filtering</div>
                                <div class="feature">🚀 Unlimited</div>
                            </div>
                        </div>

                        <!-- Input Section -->
                        <div class="vip-input-section">
                            <label class="input-label">
                                <span class="label-icon">🔑</span>
                                Nhập VIP Key của bạn
                            </label>
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    id="vipKeyInput" 
                                    class="vip-input"
                                    placeholder="VIP-XXXX-XXXX-XXXX-XXXX"
                                    maxlength="23"
                                    autocomplete="off"
                                >
                                <button type="button" class="vip-btn" id="verifyBtn">
                                    <span class="btn-icon">🚀</span>
                                    <span class="btn-text">XÁC THỰC</span>
                                    <div class="btn-shine"></div>
                                </button>
                            </div>
                            <div class="input-help">
                                <span class="help-icon">�</<span>
                                Key có định dạng: VIP-XXXX-XXXX-XXXX-XXXX
                            </div>
                        </div>

                        <!-- Status -->
                        <div class="vip-status" id="vipStatus" style="display: none;">
                            <div class="status-icon"></div>
                            <div class="status-text"></div>
                            <div class="status-loader">
                                <div class="loader-bar"></div>
                            </div>
                        </div>

                        <!-- Purchase Section -->
                        <div class="vip-purchase">
                            <div class="purchase-header">
                                <h3>🛒 Chưa có VIP Key?</h3>
                                <p>Liên hệ để mua VIP Key và trải nghiệm đầy đủ tính năng</p>
                            </div>
                            
                            <div class="contact-grid">
                                <a href="https://www.facebook.com/anhba.mientay.673979" class="contact-card facebook" target="_blank">
                                    <div class="card-icon">📘</div>
                                    <div class="card-content">
                                        <div class="card-title">Facebook</div>
                                        <div class="card-subtitle">Liên hệ mua VIP Key</div>
                                    </div>
                                    <div class="card-arrow">→</div>
                                </a>
                                
                                <a href="mailto:vipkey.rpgmaker@gmail.com" class="contact-card email">
                                    <div class="card-icon">📧</div>
                                    <div class="card-content">
                                        <div class="card-title">Email</div>
                                        <div class="card-subtitle">vipkey.rpgmaker@gmail.com</div>
                                    </div>
                                    <div class="card-arrow">→</div>
                                </a>
                            </div>
                            
                            <div class="pricing-card">
                                <div class="price-main">
                                    <div class="price-amount">500.000 VNĐ</div>
                                    <div class="price-period">Trọn đời</div>
                                </div>
                                <div class="price-features">
                                    <div class="price-feature">✅ Không giới hạn thời gian</div>
                                    <div class="price-feature">✅ Tất cả tính năng premium</div>
                                    <div class="price-feature">✅ Hỗ trợ 24/7</div>
                                    <div class="price-feature">✅ Cập nhật miễn phí</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Thêm vào DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Setup events
        this.setupEvents();

        // Animate entrance
        setTimeout(() => {
            document.getElementById('vipModal').classList.add('show');
        }, 100);
    }

    injectCSS() {
        if (document.getElementById('vipStyles')) return;

        const css = `
        <style id="vipStyles">
        .vip-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.8s ease;
            overflow: hidden;
        }

        .vip-modal.show {
            opacity: 1;
        }

        .vip-bg-effects {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        }

        .vip-particles {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #6366f1, transparent);
            border-radius: 50%;
            animation: particleFloat 15s linear infinite;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 60%; animation-delay: 8s; }
        .particle:nth-child(6) { left: 70%; animation-delay: 10s; }
        .particle:nth-child(7) { left: 80%; animation-delay: 12s; }
        .particle:nth-child(8) { left: 90%; animation-delay: 14s; }

        .vip-waves {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
        }

        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100px;
            border-radius: 50%;
            animation: waveMove 8s ease-in-out infinite;
        }

        .wave1 {
            background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            animation-delay: 0s;
        }

        .wave2 {
            background: linear-gradient(45deg, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.08));
            animation-delay: 2s;
        }

        .wave3 {
            background: linear-gradient(45deg, rgba(6, 182, 212, 0.06), rgba(99, 102, 241, 0.06));
            animation-delay: 4s;
        }

        .vip-gradient-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            animation: orbFloat 6s ease-in-out infinite;
        }

        .orb1 {
            top: 20%;
            right: 10%;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent);
            animation-delay: 0s;
        }

        .orb2 {
            bottom: 30%;
            left: 10%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent);
            animation-delay: 2s;
        }

        .orb3 {
            top: 50%;
            left: 50%;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent);
            animation-delay: 4s;
        }

        .vip-container {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 24px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(99, 102, 241, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            transform: translateY(30px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .vip-modal.show .vip-container {
            transform: translateY(0) scale(1);
        }

        .vip-header {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2);
            position: relative;
            overflow: hidden;
        }

        .vip-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shimmer 3s ease-in-out infinite;
        }

        .vip-crown {
            position: relative;
            margin-bottom: 20px;
        }

        .crown-icon {
            font-size: 64px;
            animation: crownBounce 2s ease-in-out infinite;
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
        }

        .crown-sparkles {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
        }

        .sparkle {
            position: absolute;
            font-size: 16px;
            animation: sparkleRotate 4s linear infinite;
        }

        .sparkle:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 1s; }
        .sparkle:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 2s; }
        .sparkle:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); animation-delay: 3s; }

        .vip-title {
            font-size: 32px;
            font-weight: 900;
            background: linear-gradient(135deg, #fff 0%, #6366f1 50%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 10px 0;
            animation: titleGlow 2s ease-in-out infinite alternate;
        }

        .vip-subtitle {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            margin: 0 0 20px 0;
            font-weight: 500;
        }

        .vip-badges {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .badge {
            background: rgba(99, 102, 241, 0.2);
            border: 1px solid rgba(99, 102, 241, 0.4);
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 600;
            color: #6366f1;
            animation: badgePulse 2s ease-in-out infinite;
        }

        .vip-body {
            padding: 30px;
        }

        .vip-message {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 16px;
            padding: 25px;
            text-align: center;
            margin-bottom: 30px;
        }

        .message-icon {
            font-size: 48px;
            margin-bottom: 15px;
            animation: iconFloat 3s ease-in-out infinite;
        }

        .vip-message h3 {
            color: #fff;
            font-size: 20px;
            margin: 0 0 10px 0;
            font-weight: 700;
        }

        .vip-message p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0 0 20px 0;
            line-height: 1.6;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
        }

        .feature {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 8px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
        }

        .feature:hover {
            background: rgba(99, 102, 241, 0.2);
            border-color: rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
        }

        .vip-input-section {
            margin-bottom: 30px;
        }

        .input-label {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #fff;
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .label-icon {
            font-size: 20px;
            animation: iconSpin 4s linear infinite;
        }

        .input-group {
            display: flex;
            gap: 12px;
            align-items: stretch;
        }

        .vip-input {
            flex: 1;
            padding: 16px 20px;
            background: rgba(15, 23, 42, 0.8);
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            color: #fff;
            font-size: 16px;
            font-family: 'Courier New', monospace;
            text-align: center;
            letter-spacing: 2px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .vip-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
        }

        .vip-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
            letter-spacing: 1px;
        }

        .vip-btn {
            padding: 16px 24px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border: none;
            border-radius: 12px;
            color: #fff;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            min-width: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .vip-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }

        .btn-shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: btnShine 2s ease-in-out infinite;
        }

        .input-help {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }

        .help-icon {
            animation: helpBlink 2s ease-in-out infinite;
        }

        .vip-status {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
        }

        .vip-status.loading {
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(59, 130, 246, 0.1);
        }

        .vip-status.success {
            border-color: rgba(34, 197, 94, 0.5);
            background: rgba(34, 197, 94, 0.1);
        }

        .vip-status.error {
            border-color: rgba(239, 68, 68, 0.5);
            background: rgba(239, 68, 68, 0.1);
        }

        .status-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .status-text {
            color: #fff;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .status-loader {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
        }

        .loader-bar {
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 2px;
            animation: loaderMove 2s ease-in-out infinite;
        }

        .vip-purchase {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 16px;
            padding: 25px;
            text-align: center;
        }

        .purchase-header h3 {
            color: #fbbf24;
            font-size: 20px;
            margin: 0 0 10px 0;
            font-weight: 700;
        }

        .purchase-header p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0 0 25px 0;
            line-height: 1.6;
        }

        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }

        .contact-card {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 16px 20px;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            text-decoration: none;
            color: #fff;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .contact-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .contact-card:hover::before {
            left: 100%;
        }

        .contact-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .facebook:hover {
            border-color: #1877f2;
            box-shadow: 0 10px 25px rgba(24, 119, 242, 0.3);
        }

        .email:hover {
            border-color: #22c55e;
            box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
        }

        .card-icon {
            font-size: 24px;
            flex-shrink: 0;
        }

        .card-content {
            flex: 1;
            text-align: left;
        }

        .card-title {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .card-subtitle {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }

        .card-arrow {
            font-size: 18px;
            opacity: 0.7;
            transition: transform 0.3s ease;
        }

        .contact-card:hover .card-arrow {
            transform: translateX(5px);
        }

        .pricing-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            background: rgba(15, 23, 42, 0.4);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 12px;
            padding: 20px;
        }

        .price-main {
            text-align: center;
        }

        .price-amount {
            font-size: 24px;
            font-weight: 900;
            color: #22c55e;
            margin-bottom: 5px;
        }

        .price-period {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 600;
        }

        .price-features {
            flex: 1;
        }

        .price-feature {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 5px;
            text-align: left;
        }

        /* Animations */
        @keyframes particleFloat {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        @keyframes waveMove {
            0%, 100% { transform: translateX(-50%) translateY(0px) rotate(0deg); }
            50% { transform: translateX(-50%) translateY(-20px) rotate(180deg); }
        }

        @keyframes orbFloat {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        @keyframes crownBounce {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes sparkleRotate {
            0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }

        @keyframes titleGlow {
            0% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
            100% { text-shadow: 0 0 50px rgba(99, 102, 241, 0.8), 0 0 80px rgba(139, 92, 246, 0.6); }
        }

        @keyframes badgePulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes iconFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(10deg); }
        }

        @keyframes iconSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes btnShine {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
        }

        @keyframes helpBlink {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }

        @keyframes loaderMove {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }

        @keyframes modalShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .vip-container {
                margin: 20px;
                max-height: calc(100vh - 40px);
            }
            
            .vip-header, .vip-body {
                padding: 20px;
            }
            
            .vip-title {
                font-size: 24px;
            }
            
            .crown-icon {
                font-size: 48px;
            }
            
            .input-group {
                flex-direction: column;
            }
            
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .pricing-card {
                flex-direction: column;
                text-align: center;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', css);
    }

    setupEvents() {
        const verifyBtn = document.getElementById('verifyBtn');
        const keyInput = document.getElementById('vipKeyInput');

        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.verifyKey());
        }

        if (keyInput) {
            keyInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyKey();
                }
            });

            keyInput.addEventListener('input', (e) => {
                this.formatKey(e.target);
            });
        }
    }

    formatKey(input) {
        let value = input.value.replace(/[^A-Z0-9]/g, '').toUpperCase();
        
        if (!value.startsWith('VIP')) {
            value = 'VIP' + value;
        }

        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 3 || i === 7 || i === 11 || i === 15) {
                formatted += '-';
            }
            formatted += value[i];
        }

        input.value = formatted;
    }

    async verifyKey() {
        const keyInput = document.getElementById('vipKeyInput');
        const key = keyInput.value.trim();

        if (!key || key.length < 23) {
            this.showStatus('error', '❌ Vui lòng nhập đầy đủ VIP Key');
            return;
        }

        this.showStatus('loading', '🔍 Đang xác thực VIP Key...');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading

            if (this.validateKey(key)) {
                this.isAuthenticated = true;
                this.vipKey = key;
                this.saveAuth(key);
                this.showStatus('success', '✅ VIP Key hợp lệ! Đang mở khóa...');
                
                setTimeout(() => {
                    this.hideModal();
                    this.unlockWebsite();
                }, 2000);
            } else {
                throw new Error('VIP Key không hợp lệ hoặc đã hết hạn');
            }
        } catch (error) {
            this.showStatus('error', '❌ ' + error.message);
            this.shakeModal();
        }
    }

    validateKey(key) {
        // Demo keys
        const demoKeys = [
            'VIP-2024-DEMO-TEST-0001',
            'VIP-ABCD-EFGH-IJKL-MNOP',
            'VIP-1234-5678-9ABC-DEF0'
        ];

        if (demoKeys.includes(key)) {
            return true;
        }

        // Validate format
        const pattern = /^VIP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        if (!pattern.test(key)) {
            return false;
        }

        // Simple validation - check for current year or special patterns
        const currentYear = new Date().getFullYear().toString();
        if (key.includes(currentYear)) {
            return true;
        }

        const specialPatterns = ['DEMO', 'TEST', 'VIP1', 'VIP2', 'ABCD', 'EFGH'];
        return specialPatterns.some(pattern => key.includes(pattern));
    }

    showStatus(type, message) {
        const statusEl = document.getElementById('vipStatus');
        if (!statusEl) return;

        statusEl.style.display = 'block';
        statusEl.className = `vip-status ${type}`;

        const icons = {
            loading: '⏳',
            error: '❌',
            success: '✅'
        };

        statusEl.querySelector('.status-icon').textContent = icons[type];
        statusEl.querySelector('.status-text').textContent = message;

        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    shakeModal() {
        const container = document.querySelector('.vip-container');
        if (container) {
            container.style.animation = 'modalShake 0.5s ease-in-out';
            setTimeout(() => {
                container.style.animation = '';
            }, 500);
        }
    }

    hideModal() {
        const modal = document.getElementById('vipModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 500);
        }
    }

    unlockWebsite() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.display = 'block';
            container.style.filter = 'none';
            container.style.pointerEvents = 'auto';
            container.style.opacity = '0';
            
            setTimeout(() => {
                container.style.transition = 'opacity 1s ease';
                container.style.opacity = '1';
            }, 100);
        }

        this.addVIPBadge();
        this.setupProtection();
    }

    addVIPBadge() {
        const header = document.querySelector('.header-badges');
        if (header && !header.querySelector('.vip-active-badge')) {
            const badge = document.createElement('span');
            badge.className = 'badge badge-premium vip-active-badge';
            badge.innerHTML = '<i class="fas fa-crown"></i> VIP ACTIVE';
            badge.style.cssText = `
                background: linear-gradient(45deg, #fbbf24, #f59e0b) !important;
                color: #000 !important;
                font-weight: bold !important;
                animation: vipGlow 2s ease-in-out infinite alternate !important;
            `;
            header.appendChild(badge);
        }
    }

    saveAuth(key) {
        const data = {
            key: key,
            timestamp: Date.now(),
            deviceId: this.getDeviceId()
        };
        localStorage.setItem('vip_auth_token', btoa(JSON.stringify(data)));
    }

    getDeviceId() {
        let deviceId = localStorage.getItem('vip_device_id');
        if (!deviceId) {
            deviceId = 'DEV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('vip_device_id', deviceId);
        }
        return deviceId;
    }

    setupProtection() {
        // Anti-bypass protection
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                return false;
            }
        });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Periodic check
        setInterval(() => {
            if (!this.isAuthenticated) {
                location.reload();
            }
        }, 5000);
    }

    isVIPAuthenticated() {
        return this.isAuthenticated;
    }
}

// Add VIP glow animation
const vipGlowCSS = `
<style>
@keyframes vipGlow {
    0% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.6); }
    100% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.9), 0 0 35px rgba(251, 191, 36, 0.6); }
}
</style>
`;
document.head.insertAdjacentHTML('beforeend', vipGlowCSS);

// Initialize VIP System
let vipAuth;

// Initialize immediately
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            vipAuth = new VIPAuthSystem();
        });
    } else {
        vipAuth = new VIPAuthSystem();
    }
})();

// Export for global access
window.VIPAuth = VIPAuthSystem;
window.vipAuth = vipAuth;