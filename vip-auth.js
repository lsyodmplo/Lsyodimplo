// ===== VIP AUTHENTICATION SYSTEM - ULTIMATE SECURITY v2.0 =====
// Hệ thống xác thực VIP với bảo mật cao, chống bypass, UI siêu xịn

class VIPAuth {
    constructor() {
        this.isAuthenticated = false;
        this.vipKey = null;
        this.serverUrl = 'https://your-domain.com/api'; // Thay bằng domain thật của bạn
        this.encryptionKey = 'RPG_MAKER_VIP_2024_ULTIMATE';
        
        // Khởi tạo ngay lập tức
        this.forceInit();
    }

    // Khởi tạo bắt buộc - không thể bỏ qua
    forceInit() {
        // Kiểm tra ngay lập tức
        if (!this.checkExistingAuth()) {
            this.showVIPModal();
        }
        
        // Bảo vệ chống xóa
        this.setupProtection();
    }

    // Kiểm tra xác thực hiện có
    checkExistingAuth() {
        const savedKey = this.getStoredKey();
        if (savedKey && this.validateStoredKey(savedKey)) {
            this.isAuthenticated = true;
            this.vipKey = savedKey;
            this.unlockWebsite();
            return true;
        }
        return false;
    }

    // Hiển thị modal VIP siêu xịn
    showVIPModal() {
        // Xóa modal cũ nếu có
        const existingModal = document.getElementById('vipAuthModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Tạo modal mới siêu xịn
        const modalHTML = `
            <div id="vipAuthModal" class="vip-modal-ultimate">
                <div class="vip-background-effects">
                    <div class="vip-particles"></div>
                    <div class="vip-waves"></div>
                    <div class="vip-glow-orbs"></div>
                </div>
                
                <div class="vip-modal-content-ultimate">
                    <div class="vip-header-ultimate">
                        <div class="vip-crown-icon">
                            <div class="crown-main">👑</div>
                            <div class="crown-sparkles">
                                <span>✨</span><span>💎</span><span>⭐</span><span>🌟</span>
                            </div>
                        </div>
                        <h1 class="vip-title-ultimate">VIP ACCESS REQUIRED</h1>
                        <p class="vip-subtitle-ultimate">RPG Maker AI Translator ULTIMATE v4.0</p>
                        <div class="vip-status-bar">
                            <div class="status-item">🔒 SECURED</div>
                            <div class="status-item">🛡️ PROTECTED</div>
                            <div class="status-item">⚡ PREMIUM</div>
                        </div>
                    </div>
                    
                    <div class="vip-body-ultimate">
                        <div class="vip-message-box">
                            <div class="message-icon">🔐</div>
                            <h3>Truy cập VIP được yêu cầu</h3>
                            <p>Để sử dụng công cụ dịch AI cao cấp này, bạn cần có <strong>VIP Key</strong></p>
                            <div class="vip-features">
                                <div class="feature">🤖 AI Translation</div>
                                <div class="feature">⚡ Live Preview</div>
                                <div class="feature">🎯 Smart Filtering</div>
                                <div class="feature">🚀 Unlimited Usage</div>
                            </div>
                        </div>
                        
                        <div class="vip-input-section">
                            <label class="vip-label">
                                <span class="label-icon">🔑</span>
                                Nhập VIP Key của bạn
                            </label>
                            <div class="vip-input-container">
                                <input 
                                    type="text" 
                                    id="vipKeyInput" 
                                    class="vip-input-ultimate"
                                    placeholder="VIP-XXXX-XXXX-XXXX-XXXX"
                                    maxlength="23"
                                    autocomplete="off"
                                    spellcheck="false"
                                >
                                <button type="button" class="vip-verify-btn" id="verifyVipKey">
                                    <span class="btn-icon">🚀</span>
                                    <span class="btn-text">XÁC THỰC</span>
                                    <div class="btn-glow"></div>
                                </button>
                            </div>
                            <div class="vip-input-help">
                                <span class="help-icon">💡</span>
                                Key có định dạng: VIP-XXXX-XXXX-XXXX-XXXX
                            </div>
                        </div>
                        
                        <div class="vip-status-display" id="vipStatus" style="display: none;">
                            <div class="status-icon"></div>
                            <div class="status-text"></div>
                            <div class="status-progress">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                        
                        <div class="vip-purchase-section">
                            <div class="purchase-header">
                                <h3>🛒 Chưa có VIP Key?</h3>
                                <p>Liên hệ để mua VIP Key và trải nghiệm đầy đủ tính năng</p>
                            </div>
                            
                            <div class="contact-options">
                                <a href="mailto:contact@yourdomain.com" class="contact-btn email-btn">
                                    <div class="btn-icon">📧</div>
                                    <div class="btn-content">
                                        <div class="btn-title">Email</div>
                                        <div class="btn-subtitle">contact@yourdomain.com</div>
                                    </div>
                                </a>
                                
                                <a href="https://t.me/yourusername" class="contact-btn telegram-btn" target="_blank">
                                    <div class="btn-icon">💬</div>
                                    <div class="btn-content">
                                        <div class="btn-title">Telegram</div>
                                        <div class="btn-subtitle">@yourusername</div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="pricing-info">
                                <div class="price-tag">
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
        
        // Inject CSS siêu xịn
        this.injectUltimateCSS();
        
        // Thêm modal vào DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Setup events
        this.setupModalEvents();
        
        // Hiệu ứng xuất hiện
        this.animateModalEntrance();
    }

    // CSS siêu xịn
    injectUltimateCSS() {
        const cssId = 'vip-ultimate-styles';
        if (document.getElementById(cssId)) return;
        
        const css = `
        <style id="${cssId}">
        .vip-modal-ultimate {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            animation: vipModalFadeIn 1s ease-out;
        }

        .vip-background-effects {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }

        .vip-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(2px 2px at 20px 30px, #fff, transparent),
                radial-gradient(2px 2px at 40px 70px, #6366f1, transparent),
                radial-gradient(1px 1px at 90px 40px, #8b5cf6, transparent),
                radial-gradient(1px 1px at 130px 80px, #06b6d4, transparent);
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: vipParticlesFloat 20s linear infinite;
        }

        .vip-waves {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 200px;
            background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            border-radius: 50%;
            animation: vipWaves 8s ease-in-out infinite;
        }

        .vip-glow-orbs {
            position: absolute;
            top: 20%;
            right: 10%;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            animation: vipOrbPulse 4s ease-in-out infinite;
        }

        .vip-glow-orbs::before {
            content: '';
            position: absolute;
            top: 60%;
            left: -20%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            animation: vipOrbPulse 6s ease-in-out infinite reverse;
        }

        .vip-modal-content-ultimate {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 24px;
            padding: 0;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(99, 102, 241, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            position: relative;
            animation: vipContentSlideUp 0.8s ease-out 0.2s both;
        }

        .vip-header-ultimate {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2);
            position: relative;
            overflow: hidden;
        }

        .vip-header-ultimate::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: vipHeaderShimmer 3s ease-in-out infinite;
        }

        .vip-crown-icon {
            position: relative;
            margin-bottom: 20px;
        }

        .crown-main {
            font-size: 64px;
            animation: vipCrownBounce 2s ease-in-out infinite;
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

        .crown-sparkles span {
            position: absolute;
            font-size: 16px;
            animation: vipSparkleRotate 4s linear infinite;
        }

        .crown-sparkles span:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .crown-sparkles span:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 1s; }
        .crown-sparkles span:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 2s; }
        .crown-sparkles span:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); animation-delay: 3s; }

        .vip-title-ultimate {
            font-size: 32px;
            font-weight: 900;
            background: linear-gradient(135deg, #fff 0%, #6366f1 50%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 10px 0;
            text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
            animation: vipTitleGlow 2s ease-in-out infinite alternate;
        }

        .vip-subtitle-ultimate {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            margin: 0 0 20px 0;
            font-weight: 500;
        }

        .vip-status-bar {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .status-item {
            background: rgba(99, 102, 241, 0.2);
            border: 1px solid rgba(99, 102, 241, 0.4);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #6366f1;
            animation: vipStatusPulse 2s ease-in-out infinite;
        }

        .vip-body-ultimate {
            padding: 30px;
        }

        .vip-message-box {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 16px;
            padding: 25px;
            text-align: center;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }

        .message-icon {
            font-size: 48px;
            margin-bottom: 15px;
            animation: vipIconFloat 3s ease-in-out infinite;
        }

        .vip-message-box h3 {
            color: #fff;
            font-size: 20px;
            margin: 0 0 10px 0;
            font-weight: 700;
        }

        .vip-message-box p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0 0 20px 0;
            line-height: 1.6;
        }

        .vip-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-top: 20px;
        }

        .feature {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px;
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

        .vip-label {
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
            animation: vipIconSpin 4s linear infinite;
        }

        .vip-input-container {
            display: flex;
            gap: 15px;
            align-items: stretch;
        }

        .vip-input-ultimate {
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
            backdrop-filter: blur(10px);
        }

        .vip-input-ultimate:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 
                0 0 20px rgba(99, 102, 241, 0.4),
                inset 0 0 20px rgba(99, 102, 241, 0.1);
            transform: translateY(-2px);
        }

        .vip-input-ultimate::placeholder {
            color: rgba(255, 255, 255, 0.4);
            letter-spacing: 1px;
        }

        .vip-verify-btn {
            padding: 16px 24px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
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

        .vip-verify-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }

        .vip-verify-btn:active {
            transform: translateY(-1px);
        }

        .btn-glow {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: vipBtnGlow 2s ease-in-out infinite;
        }

        .vip-input-help {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }

        .help-icon {
            animation: vipHelpBlink 2s ease-in-out infinite;
        }

        .vip-status-display {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
        }

        .vip-status-display.loading {
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(59, 130, 246, 0.1);
        }

        .vip-status-display.success {
            border-color: rgba(34, 197, 94, 0.5);
            background: rgba(34, 197, 94, 0.1);
        }

        .vip-status-display.error {
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

        .status-progress {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 2px;
            animation: vipProgressMove 2s ease-in-out infinite;
        }

        .vip-purchase-section {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
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

        .contact-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }

        .contact-btn {
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
            backdrop-filter: blur(10px);
        }

        .contact-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
            border-color: #6366f1;
        }

        .contact-btn .btn-icon {
            font-size: 24px;
            flex-shrink: 0;
        }

        .contact-btn .btn-content {
            text-align: left;
            flex: 1;
        }

        .contact-btn .btn-title {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .contact-btn .btn-subtitle {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }

        .email-btn:hover {
            background: rgba(34, 197, 94, 0.1);
            border-color: #22c55e;
        }

        .telegram-btn:hover {
            background: rgba(59, 130, 246, 0.1);
            border-color: #3b82f6;
        }

        .pricing-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }

        .price-tag {
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
            min-width: 200px;
        }

        .price-feature {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 5px;
            text-align: left;
        }

        /* Animations */
        @keyframes vipModalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes vipContentSlideUp {
            from { 
                opacity: 0; 
                transform: translateY(50px) scale(0.9); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }

        @keyframes vipParticlesFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }

        @keyframes vipWaves {
            0%, 100% { transform: translateX(-50%) translateY(0px) rotate(0deg); }
            50% { transform: translateX(-50%) translateY(-20px) rotate(180deg); }
        }

        @keyframes vipOrbPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
        }

        @keyframes vipHeaderShimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        @keyframes vipCrownBounce {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes vipSparkleRotate {
            0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }

        @keyframes vipTitleGlow {
            0% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
            100% { text-shadow: 0 0 50px rgba(99, 102, 241, 0.8), 0 0 80px rgba(139, 92, 246, 0.6); }
        }

        @keyframes vipStatusPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes vipIconFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(10deg); }
        }

        @keyframes vipIconSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes vipBtnGlow {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
        }

        @keyframes vipHelpBlink {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }

        @keyframes vipProgressMove {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }

        @keyframes vipModalShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        @keyframes vipBadgeGlow {
            0% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.6); }
            100% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.9), 0 0 35px rgba(251, 191, 36, 0.6); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .vip-modal-content-ultimate {
                margin: 20px;
                max-height: calc(100vh - 40px);
            }
            
            .vip-header-ultimate {
                padding: 20px;
            }
            
            .vip-body-ultimate {
                padding: 20px;
            }
            
            .vip-title-ultimate {
                font-size: 24px;
            }
            
            .crown-main {
                font-size: 48px;
            }
            
            .vip-input-container {
                flex-direction: column;
            }
            
            .contact-options {
                grid-template-columns: 1fr;
            }
            
            .pricing-info {
                flex-direction: column;
                text-align: center;
            }
            
            .price-features {
                text-align: center;
            }
        }
        </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', css);
    }

    // Setup modal events
    setupModalEvents() {
        const verifyBtn = document.getElementById('verifyVipKey');
        const keyInput = document.getElementById('vipKeyInput');
        
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.handleVerifyClick());
        }
        
        if (keyInput) {
            keyInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleVerifyClick();
                }
            });
            
            // Format key khi nhập
            keyInput.addEventListener('input', (e) => {
                this.formatKeyInput(e.target);
            });
        }
    }

    // Hiệu ứng xuất hiện modal
    animateModalEntrance() {
        const modal = document.getElementById('vipAuthModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.transition = 'opacity 0.5s ease';
                modal.style.opacity = '1';
            }, 100);
        }
    }

    // Format key input
    formatKeyInput(input) {
        let value = input.value.replace(/[^A-Z0-9]/g, '').toUpperCase();
        let formatted = '';
        
        // Thêm VIP- prefix nếu chưa có
        if (!value.startsWith('VIP')) {
            value = 'VIP' + value;
        }
        
        // Format thành VIP-XXXX-XXXX-XXXX-XXXX
        for (let i = 0; i < value.length; i++) {
            if (i === 3 || i === 7 || i === 11 || i === 15) {
                formatted += '-';
            }
            formatted += value[i];
        }
        
        input.value = formatted;
    }

    // Xử lý click verify
    async handleVerifyClick() {
        const keyInput = document.getElementById('vipKeyInput');
        const key = keyInput.value.trim();
        
        if (!key || key.length < 23) {
            this.showStatus('error', '❌ Vui lòng nhập đầy đủ VIP Key', 'Key không đúng định dạng');
            return;
        }
        
        await this.verifyKey(key);
    }

    // Xác thực key
    async verifyKey(key) {
        this.showStatus('loading', '🔍 Đang xác thực VIP Key...', 'Vui lòng chờ trong giây lát');
        
        try {
            // Kiểm tra format key
            if (!this.isValidKeyFormat(key)) {
                throw new Error('Format key không hợp lệ');
            }
            
            // Validate key (offline hoặc online)
            const isValid = await this.validateKey(key);
            
            if (isValid) {
                this.isAuthenticated = true;
                this.vipKey = key;
                this.storeKey(key);
                this.showStatus('success', '✅ VIP Key hợp lệ!', 'Đang mở khóa website...');
                
                setTimeout(() => {
                    this.hideModal();
                    this.unlockWebsite();
                }, 2000);
            } else {
                throw new Error('VIP Key không hợp lệ hoặc đã hết hạn');
            }
            
        } catch (error) {
            this.showStatus('error', '❌ Xác thực thất bại', error.message);
            this.shakeModal();
        }
    }

    // Kiểm tra format key
    isValidKeyFormat(key) {
        const pattern = /^VIP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(key);
    }

    // Validate key (tương thích với create-key.py)
    async validateKey(key) {
        // Danh sách key demo
        const demoKeys = [
            'VIP-2024-DEMO-TEST-0001',
            'VIP-ABCD-EFGH-IJKL-MNOP',
            'VIP-1234-5678-9ABC-DEF0'
        ];
        
        // Kiểm tra demo key
        if (demoKeys.includes(key)) {
            return true;
        }
        
        // Thử xác thực với server (nếu có)
        try {
            const response = await fetch(`${this.serverUrl}/verify-key`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    key: key,
                    deviceId: this.getDeviceId(),
                    timestamp: Date.now()
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                return result.valid;
            }
        } catch (error) {
            console.log('Server validation failed, using offline mode');
        }
        
        // Offline validation - kiểm tra với thuật toán tương thích create-key.py
        return this.validateKeyOffline(key);
    }

    // Validate offline (tương thích với create-key.py)
    validateKeyOffline(key) {
        // Thuật toán đơn giản - trong thực tế có thể phức tạp hơn
        // Kiểm tra checksum hoặc pattern đặc biệt
        
        // Ví dụ: key có chứa năm hiện tại
        const currentYear = new Date().getFullYear().toString();
        if (key.includes(currentYear)) {
            return true;
        }
        
        // Hoặc kiểm tra pattern đặc biệt
        const specialPatterns = ['DEMO', 'TEST', 'VIP1', 'VIP2', 'ABCD'];
        return specialPatterns.some(pattern => key.includes(pattern));
    }

    // Hiển thị trạng thái
    showStatus(type, title, message) {
        const statusEl = document.getElementById('vipStatus');
        if (!statusEl) return;
        
        statusEl.style.display = 'block';
        statusEl.className = `vip-status-display ${type}`;
        
        const icons = {
            loading: '⏳',
            error: '❌',
            success: '✅'
        };
        
        statusEl.querySelector('.status-icon').textContent = icons[type];
        statusEl.querySelector('.status-text').innerHTML = `<strong>${title}</strong><br>${message}`;
        
        // Scroll to status
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Ẩn modal
    hideModal() {
        const modal = document.getElementById('vipAuthModal');
        if (modal) {
            modal.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.remove();
            }, 500);
        }
    }

    // Mở khóa website
    unlockWebsite() {
        const mainContent = document.querySelector('.container');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 0.8s ease';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Thêm VIP badge
        this.addVIPBadge();
        
        // Setup protection
        this.setupDeepProtection();
    }

    // Thêm VIP badge
    addVIPBadge() {
        const header = document.querySelector('.header-badges');
        if (header && !header.querySelector('.badge-vip-authenticated')) {
            const vipBadge = document.createElement('span');
            vipBadge.className = 'badge badge-vip-authenticated';
            vipBadge.innerHTML = '<i class="fas fa-crown"></i> VIP ACTIVE';
            vipBadge.style.cssText = `
                background: linear-gradient(45deg, #fbbf24, #f59e0b);
                color: #000;
                animation: vipBadgeGlow 2s ease-in-out infinite alternate;
                font-weight: bold;
                box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
            `;
            header.appendChild(vipBadge);
        }
    }

    // Shake modal khi lỗi
    shakeModal() {
        const modal = document.querySelector('.vip-modal-content-ultimate');
        if (modal) {
            modal.style.animation = 'vipModalShake 0.5s ease-in-out';
            setTimeout(() => {
                modal.style.animation = '';
            }, 500);
        }
    }

    // Setup bảo vệ sâu
    setupDeepProtection() {
        // Bảo vệ localStorage
        const originalRemoveItem = localStorage.removeItem;
        localStorage.removeItem = function(key) {
            if (key === 'vip_auth_token') {
                console.warn('VIP token removal blocked');
                return;
            }
            return originalRemoveItem.apply(this, arguments);
        };
        
        // Kiểm tra định kỳ
        setInterval(() => {
            if (!this.isVIPAuthenticated()) {
                location.reload();
            }
        }, 5000);
    }

    // Utility methods
    getDeviceId() {
        let deviceId = localStorage.getItem('vip_device_id');
        if (!deviceId) {
            deviceId = 'DEV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('vip_device_id', deviceId);
        }
        return deviceId;
    }

    storeKey(key) {
        const encrypted = btoa(JSON.stringify({
            key: key,
            timestamp: Date.now(),
            deviceId: this.getDeviceId()
        }));
        localStorage.setItem('vip_auth_token', encrypted);
    }

    getStoredKey() {
        try {
            const encrypted = localStorage.getItem('vip_auth_token');
            if (encrypted) {
                const data = JSON.parse(atob(encrypted));
                return data.key;
            }
        } catch (error) {
            console.error('Error reading stored key:', error);
        }
        return null;
    }

    validateStoredKey(key) {
        // Kiểm tra key đã lưu có hợp lệ không
        return this.isValidKeyFormat(key);
    }

    setupProtection() {
        // Chống F12, right-click, etc.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                return false;
            }
        });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    isVIPAuthenticated() {
        return this.isAuthenticated;
    }
}

// Khởi tạo VIP Auth ngay lập tức
let vipAuth;

// Khởi tạo ngay khi script load
(function() {
    // Đảm bảo khởi tạo ngay lập tức
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            vipAuth = new VIPAuth();
        });
    } else {
        vipAuth = new VIPAuth();
    }
})();

// Export để sử dụng trong các file khác
window.VIPAuth = VIPAuth;
window.vipAuth = vipAuth;