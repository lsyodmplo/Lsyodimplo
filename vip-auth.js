// ===== VIP AUTHENTICATION SYSTEM - SIMPLE & WORKING =====

class VIPAuth {
    constructor() {
        this.isAuthenticated = false;
        this.vipKey = null;
        console.log('🔑 VIP Auth System initializing...');
        this.init();
    }

    init() {
        console.log('🚀 VIP Auth init started');
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Longer delay để user có thời gian thấy loading screen
        setTimeout(() => {
            // Kiểm tra xác thực hiện có
            if (!this.checkExistingAuth()) {
                console.log('❌ No VIP auth found, showing modal');
                // Thêm delay trước khi hide loading và show modal
                setTimeout(() => {
                    this.hideLoadingScreen();
                    // Thêm delay nhỏ để transition mượt
                    setTimeout(() => {
                        this.showModal();
                    }, 500);
                }, 1000);
            } else {
                console.log('✅ VIP auth found, unlocking website');
                this.hideLoadingScreen();
                this.unlockWebsite();
            }
        }, 2000); // Tăng từ 1000ms lên 2000ms
        
        this.setupProtection();
    }

    checkExistingAuth() {
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

    showLoadingScreen() {
        const loadingScreen = document.getElementById('vipLoadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Update loading text progressively
            const loadingText = loadingScreen.querySelector('p');
            if (loadingText) {
                const messages = [
                    'Đang kiểm tra quyền truy cập...',
                    'Đang xác thực VIP key...',
                    'Đang chuẩn bị giao diện...'
                ];
                
                let messageIndex = 0;
                const updateMessage = () => {
                    if (messageIndex < messages.length && loadingScreen.style.display !== 'none') {
                        loadingText.textContent = messages[messageIndex];
                        messageIndex++;
                        setTimeout(updateMessage, 800);
                    }
                };
                
                updateMessage();
            }
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('vipLoadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }

    showModal() {
        console.log('📱 Creating VIP modal...');
        
        // Xóa modal cũ nếu có
        const existing = document.getElementById('vipModal');
        if (existing) existing.remove();

        // Inject CSS
        this.injectCSS();

        // Tạo modal HTML
        const modalHTML = `
            <div id="vipModal" class="vip-modal">
                <div class="vip-overlay"></div>
                <div class="vip-container">
                    <div class="vip-header">
                        <div class="vip-crown">👑</div>
                        <h1>VIP ACCESS REQUIRED</h1>
                        <p>RPG Maker AI Translator ULTIMATE v4.0</p>
                    </div>
                    
                    <div class="vip-body">
                        <div class="vip-message">
                            <h3>🔐 Truy cập VIP được yêu cầu</h3>
                            <p>Để sử dụng công cụ dịch AI cao cấp này, bạn cần có <strong>VIP Key</strong></p>
                        </div>

                        <div class="vip-input-section">
                            <label>🔑 Nhập VIP Key của bạn:</label>
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    id="vipKeyInput" 
                                    placeholder="VIP-XXXX-XXXX-XXXX-XXXX"
                                    maxlength="23"
                                >
                                <button id="verifyBtn">XÁC THỰC</button>
                            </div>
                            <small>💡 Key có định dạng: VIP-XXXX-XXXX-XXXX-XXXX</small>
                            <div class="input-tip">
                                <i class="fas fa-clock"></i>
                                <span>Bạn có đủ thời gian để nhập key, không bị giới hạn thời gian</span>
                            </div>
                        </div>

                        <div id="vipStatus" class="vip-status" style="display: none;">
                            <div class="status-content"></div>
                        </div>

                        <div class="vip-purchase">
                            <h3>🛒 Chưa có VIP Key?</h3>
                            <p>Liên hệ để mua VIP Key và trải nghiệm đầy đủ tính năng</p>
                            
                            <div class="contact-buttons">
                                <a href="https://www.facebook.com/anhba.mientay.673979" target="_blank" class="contact-btn facebook">
                                    📘 Facebook
                                </a>
                                <a href="mailto:vipkey.rpgmaker@gmail.com" class="contact-btn email">
                                    📧 Email
                                </a>
                            </div>
                            
                            <div class="price-info">
                                <div class="price">💰 500.000 VNĐ - Trọn đời</div>
                                <div class="features">
                                    ✅ Không giới hạn thời gian<br>
                                    ✅ Tất cả tính năng premium<br>
                                    ✅ Hỗ trợ 24/7
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

        console.log('✅ VIP modal created successfully');
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
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .vip-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            animation: fadeIn 0.5s ease;
        }

        .vip-container {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            backdrop-filter: blur(20px);
            border: 2px solid #6366f1;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(99, 102, 241, 0.3);
            position: relative;
            z-index: 1;
            animation: slideUp 0.6s ease;
        }

        .vip-header {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        }

        .vip-crown {
            font-size: 48px;
            margin-bottom: 15px;
            animation: bounce 2s infinite;
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
        }

        .vip-header h1 {
            font-size: 24px;
            font-weight: 900;
            background: linear-gradient(135deg, #fff 0%, #6366f1 50%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0 0 10px 0;
        }

        .vip-header p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
            font-size: 14px;
        }

        .vip-body {
            padding: 30px;
        }

        .vip-message {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin-bottom: 25px;
        }

        .vip-message h3 {
            color: #fff;
            font-size: 18px;
            margin: 0 0 10px 0;
            font-weight: 700;
        }

        .vip-message p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
            line-height: 1.5;
        }

        .vip-input-section {
            margin-bottom: 25px;
        }

        .vip-input-section label {
            display: block;
            color: #fff;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 8px;
        }

        #vipKeyInput {
            flex: 1;
            padding: 12px 16px;
            background: rgba(15, 23, 42, 0.8);
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            font-family: 'Courier New', monospace;
            text-align: center;
            letter-spacing: 1px;
            transition: all 0.3s ease;
        }

        #vipKeyInput:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }

        #vipKeyInput::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }

        #verifyBtn {
            padding: 12px 20px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border: none;
            border-radius: 8px;
            color: #fff;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        #verifyBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        .vip-input-section small {
            color: rgba(255, 255, 255, 0.6);
            font-size: 12px;
        }

        .input-tip {
            margin-top: 8px;
            padding: 8px 12px;
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 6px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .input-tip i {
            color: #3b82f6;
        }

        .vip-status {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .vip-status.loading {
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(59, 130, 246, 0.1);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { 
                border-color: rgba(59, 130, 246, 0.5);
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
            }
            50% { 
                border-color: rgba(59, 130, 246, 0.8);
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
            }
        }

        .vip-status.success {
            border-color: rgba(34, 197, 94, 0.5);
            background: rgba(34, 197, 94, 0.1);
        }

        .vip-status.error {
            border-color: rgba(239, 68, 68, 0.5);
            background: rgba(239, 68, 68, 0.1);
        }

        .status-content {
            color: #fff;
            font-weight: 600;
        }

        .vip-purchase {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }

        .vip-purchase h3 {
            color: #fbbf24;
            font-size: 18px;
            margin: 0 0 8px 0;
            font-weight: 700;
        }

        .vip-purchase p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0 0 20px 0;
            line-height: 1.5;
        }

        .contact-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .contact-btn {
            padding: 10px 20px;
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 8px;
            text-decoration: none;
            color: #fff;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            background: rgba(15, 23, 42, 0.6);
        }

        .contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .facebook:hover {
            border-color: #1877f2;
            background: rgba(24, 119, 242, 0.1);
        }

        .email:hover {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.1);
        }

        .price-info {
            background: rgba(15, 23, 42, 0.4);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 8px;
            padding: 15px;
        }

        .price {
            font-size: 18px;
            font-weight: 900;
            color: #22c55e;
            margin-bottom: 10px;
        }

        .features {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { 
                opacity: 0; 
                transform: translateY(30px) scale(0.95); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .shake {
            animation: shake 0.5s ease-in-out;
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
            
            .input-group {
                flex-direction: column;
            }
            
            .contact-buttons {
                flex-direction: column;
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

        console.log('✅ VIP events setup complete');
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

        console.log('🔍 Verifying key:', key);

        if (!key || key.length < 23) {
            this.showStatus('error', '❌ Vui lòng nhập đầy đủ VIP Key');
            return;
        }

        this.showStatus('loading', '🔍 Đang xác thực VIP Key...');

        try {
            // Enhanced loading với progress steps - slower timing
            const steps = [
                '🔍 Đang kiểm tra định dạng key...',
                '🌐 Đang kết nối database...',
                '🔐 Đang xác thực quyền truy cập...',
                '✅ Xác thực thành công!'
            ];
            
            // Slower timing để user có thời gian đọc
            for (let i = 0; i < steps.length; i++) {
                this.showStatus('loading', steps[i]);
                await new Promise(resolve => setTimeout(resolve, 1200)); // Tăng từ 800ms lên 1200ms
            }

            if (this.validateKey(key)) {
                this.isAuthenticated = true;
                this.vipKey = key;
                this.saveAuth(key);
                this.showStatus('success', '✅ VIP Key hợp lệ! Đang mở khóa website...');
                
                console.log('🎯 VIP Auth Status:', {
                    isAuthenticated: this.isAuthenticated,
                    vipKey: this.vipKey,
                    timestamp: new Date().toISOString()
                });
                
                // Hiển thị unlock steps với timing chậm hơn
                setTimeout(async () => {
                    const unlockSteps = [
                        '🔓 Đang mở khóa giao diện...',
                        '⚡ Đang kích hoạt tính năng...',
                        '🎉 Hoàn tất! Chào mừng VIP!'
                    ];
                    
                    for (let i = 0; i < unlockSteps.length; i++) {
                        this.showStatus('success', unlockSteps[i]);
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Tăng từ 600ms lên 1000ms
                    }
                    
                    // Thêm delay trước khi hide modal
                    setTimeout(() => {
                        this.hideModal();
                        this.unlockWebsite();
                        
                        // Double check after unlock
                        setTimeout(() => {
                            const container = document.getElementById('mainContainer');
                            console.log('🔍 Container status after unlock:', {
                                exists: !!container,
                                display: container?.style.display,
                                opacity: container?.style.opacity,
                                visible: container?.offsetHeight > 0
                            });
                        }, 1000);
                    }, 1500); // Thêm delay 1.5s để user thấy success message
                }, 1000);
            } else {
                throw new Error('VIP Key không hợp lệ hoặc đã hết hạn');
            }
        } catch (error) {
            this.showStatus('error', '❌ ' + error.message);
            this.shakeModal();
        }
    }

    validateKey(key) {
        console.log('🔑 Validating key:', key);
        
        // Demo keys (always work for testing)
        const demoKeys = [
            'VIP-2024-DEMO-TEST-0001',
            'VIP-ABCD-EFGH-IJKL-MNOP',
            'VIP-1234-5678-9ABC-DEF0'
        ];

        if (demoKeys.includes(key)) {
            console.log('✅ Demo key valid');
            return true;
        }

        // Validate format first
        const pattern = /^VIP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        if (!pattern.test(key)) {
            console.log('❌ Invalid format');
            return false;
        }

        // Check against valid keys list (generated by create-key.py)
        const validKeys = this.loadValidKeys();
        if (validKeys.includes(key)) {
            console.log('✅ Key found in valid keys database');
            return true;
        }

        // If not in database, reject
        console.log('❌ Key not found in database');
        return false;
    }

    loadValidKeys() {
        try {
            // Try to load from localStorage (updated by create-key.py)
            const keysData = localStorage.getItem('vip_valid_keys');
            if (keysData) {
                const keys = JSON.parse(keysData);
                console.log('📋 Loaded valid keys from storage:', keys.length);
                return keys;
            }

            // Try to load from embedded keys (fallback)
            const embeddedKeys = this.getEmbeddedKeys();
            if (embeddedKeys.length > 0) {
                console.log('📋 Using embedded keys:', embeddedKeys.length);
                return embeddedKeys;
            }

            console.log('⚠️ No valid keys found, using demo keys only');
            return [];
        } catch (e) {
            console.error('❌ Error loading valid keys:', e);
            return [];
        }
    }

    getEmbeddedKeys() {
        // This will be updated by create-key.py
        return window.VIP_VALID_KEYS || [];
    }

    showStatus(type, message) {
        const statusEl = document.getElementById('vipStatus');
        if (!statusEl) return;

        statusEl.style.display = 'block';
        statusEl.className = `vip-status ${type}`;
        statusEl.querySelector('.status-content').textContent = message;

        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    shakeModal() {
        const container = document.querySelector('.vip-container');
        if (container) {
            container.classList.add('shake');
            setTimeout(() => {
                container.classList.remove('shake');
            }, 500);
        }
    }

    hideModal() {
        const modal = document.getElementById('vipModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    unlockWebsite() {
        console.log('🔓 Unlocking website...');
        
        const container = document.getElementById('mainContainer') || document.querySelector('.container');
        if (container) {
            // Force override CSS với !important
            container.style.setProperty('display', 'block', 'important');
            container.style.setProperty('filter', 'none', 'important');
            container.style.setProperty('pointer-events', 'auto', 'important');
            container.style.setProperty('opacity', '0', 'important');
            
            setTimeout(() => {
                container.style.setProperty('transition', 'opacity 0.8s ease', 'important');
                container.style.setProperty('opacity', '1', 'important');
            }, 100);
            
            console.log('🎯 Container styles applied:', {
                display: container.style.display,
                filter: container.style.filter,
                pointerEvents: container.style.pointerEvents,
                opacity: container.style.opacity
            });
        } else {
            console.error('❌ Container not found!');
        }

        this.addVIPBadge();
        console.log('✅ Website unlocked successfully');
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
                box-shadow: 0 0 15px rgba(251, 191, 36, 0.6) !important;
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
        console.log('💾 VIP auth saved');
    }

    getDeviceId() {
        let deviceId = localStorage.getItem('vip_device_id');
        if (!deviceId) {
            deviceId = 'DEV-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11);
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

        // Periodic check - DISABLED để user có thời gian nhập key
        // setInterval(() => {
        //     if (!this.isAuthenticated) {
        //         const token = localStorage.getItem('vip_auth_token');
        //         if (!token) {
        //             location.reload();
        //         }
        //     }
        // }, 5000);
    }

    isVIPAuthenticated() {
        return this.isAuthenticated;
    }
}

// Initialize VIP System
console.log('🚀 Loading VIP Auth System...');

let vipAuth;

// Initialize immediately
(function() {
    function initVIP() {
        try {
            vipAuth = new VIPAuth();
            window.vipAuth = vipAuth;
            console.log('✅ VIP Auth System loaded successfully');
        } catch (error) {
            console.error('❌ VIP Auth System failed to load:', error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVIP);
    } else {
        initVIP();
    }
})();

// Export for global access
window.VIPAuth = VIPAuth;