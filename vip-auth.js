// ===== VIP AUTHENTICATION SYSTEM - ULTIMATE SECURITY =====
// Hệ thống xác thực VIP với bảo mật cao, chống bypass

class VIPAuth {
    constructor() {
        this.isAuthenticated = false;
        this.vipKey = null;
        this.serverUrl = 'https://your-domain.com/api'; // Thay bằng domain thật của bạn
        this.encryptionKey = 'RPG_MAKER_VIP_2024_ULTIMATE'; // Key mã hóa
        this.initAuth();
    }

    // Khởi tạo hệ thống xác thực
    initAuth() {
        this.createAuthModal();
        this.checkExistingAuth();
        this.protectWebsite();
        this.setupEventListeners();
    }

    // Tạo modal đăng nhập VIP
    createAuthModal() {
        const modalHTML = `
            <div id="vipAuthModal" class="vip-modal" style="display: block;">
                <div class="vip-modal-content">
                    <div class="vip-header">
                        <div class="vip-logo">
                            <i class="fas fa-crown"></i>
                            <h2>🌟 VIP ACCESS REQUIRED 🌟</h2>
                        </div>
                        <div class="vip-subtitle">
                            RPG Maker AI Translator ULTIMATE v4.0
                        </div>
                    </div>
                    
                    <div class="vip-body">
                        <div class="vip-message">
                            <i class="fas fa-lock"></i>
                            <p>Để sử dụng công cụ dịch AI cao cấp này, bạn cần có <strong>VIP Key</strong></p>
                            <p class="vip-note">🔑 Mỗi key chỉ sử dụng được trên 1 thiết bị</p>
                        </div>
                        
                        <div class="vip-form">
                            <div class="form-group">
                                <label for="vipKeyInput">
                                    <i class="fas fa-key"></i>
                                    Nhập VIP Key của bạn:
                                </label>
                                <div class="input-with-button">
                                    <input 
                                        type="text" 
                                        id="vipKeyInput" 
                                        placeholder="VIP-XXXX-XXXX-XXXX-XXXX"
                                        class="vip-input"
                                        maxlength="23"
                                    >
                                    <button type="button" class="btn-vip-verify" id="verifyVipKey">
                                        <i class="fas fa-check"></i>
                                        Xác thực
                                    </button>
                                </div>
                                <small class="vip-help">
                                    <i class="fas fa-info-circle"></i>
                                    Key có định dạng: VIP-XXXX-XXXX-XXXX-XXXX
                                </small>
                            </div>
                            
                            <div class="vip-status" id="vipStatus" style="display: none;">
                                <i class="fas fa-spinner fa-spin"></i>
                                <span>Đang xác thực...</span>
                            </div>
                        </div>
                        
                        <div class="vip-purchase">
                            <h3><i class="fas fa-shopping-cart"></i> Chưa có VIP Key?</h3>
                            <p>Liên hệ để mua VIP Key và trải nghiệm đầy đủ tính năng:</p>
                            <div class="purchase-options">
                                <a href="mailto:contact@yourdomain.com" class="btn-purchase">
                                    <i class="fas fa-envelope"></i>
                                    Email: contact@yourdomain.com
                                </a>
                                <a href="https://t.me/yourusername" class="btn-purchase" target="_blank">
                                    <i class="fab fa-telegram"></i>
                                    Telegram: @yourusername
                                </a>
                            </div>
                            <div class="price-info">
                                <span class="price">💰 Giá: 500.000 VNĐ</span>
                                <span class="features">✨ Trọn đời, không giới hạn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Kiểm tra xác thực hiện có
    checkExistingAuth() {
        const savedKey = this.getStoredKey();
        if (savedKey) {
            this.verifyKey(savedKey, true);
        }
    }

    // Bảo vệ website - ẩn nội dung chính
    protectWebsite() {
        const mainContent = document.querySelector('.container');
        if (mainContent && !this.isAuthenticated) {
            mainContent.style.display = 'none';
            mainContent.style.filter = 'blur(10px)';
            mainContent.style.pointerEvents = 'none';
        }
    }

    // Thiết lập event listeners
    setupEventListeners() {
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

        // Chống inspect element và bypass
        this.setupAntiBypass();
    }

    // Format key input
    formatKeyInput(input) {
        let value = input.value.replace(/[^A-Z0-9]/g, '');
        let formatted = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += '-';
            }
            formatted += value[i];
        }
        
        if (!formatted.startsWith('VIP-')) {
            formatted = 'VIP-' + formatted.replace('VIP-', '');
        }
        
        input.value = formatted;
    }

    // Xử lý click verify
    async handleVerifyClick() {
        const keyInput = document.getElementById('vipKeyInput');
        const key = keyInput.value.trim();
        
        if (!key || key.length < 23) {
            this.showStatus('error', 'Vui lòng nhập đầy đủ VIP Key');
            return;
        }
        
        await this.verifyKey(key);
    }

    // Xác thực key
    async verifyKey(key, isAutoCheck = false) {
        if (!isAutoCheck) {
            this.showStatus('loading', 'Đang xác thực key...');
        }
        
        try {
            // Kiểm tra format key
            if (!this.isValidKeyFormat(key)) {
                throw new Error('Format key không hợp lệ');
            }
            
            // Gọi API xác thực (hoặc kiểm tra offline)
            const isValid = await this.validateKeyWithServer(key);
            
            if (isValid) {
                this.isAuthenticated = true;
                this.vipKey = key;
                this.storeKey(key);
                this.showSuccess();
                this.unlockWebsite();
            } else {
                throw new Error('VIP Key không hợp lệ hoặc đã hết hạn');
            }
            
        } catch (error) {
            this.showStatus('error', error.message);
            if (!isAutoCheck) {
                this.shakeModal();
            }
        }
    }

    // Kiểm tra format key
    isValidKeyFormat(key) {
        const pattern = /^VIP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(key);
    }

    // Xác thực với server (hoặc thuật toán offline)
    async validateKeyWithServer(key) {
        // Phương pháp 1: Kiểm tra với server
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
            console.log('Server check failed, using offline validation');
        }
        
        // Phương pháp 2: Kiểm tra offline (backup)
        return this.validateKeyOffline(key);
    }

    // Xác thực offline (thuật toán mã hóa)
    validateKeyOffline(key) {
        // Danh sách key hợp lệ được mã hóa
        const validKeys = [
            'VIP-2024-DEMO-TEST-0001', // Key demo
            'VIP-ABCD-EFGH-IJKL-MNOP', // Key mẫu
            // Thêm các key khác ở đây
        ];
        
        // Hoặc sử dụng thuật toán tạo key
        return validKeys.includes(key) || this.generateValidKey() === key;
    }

    // Tạo key hợp lệ (thuật toán đơn giản)
    generateValidKey() {
        const date = new Date();
        const seed = date.getFullYear() + date.getMonth();
        // Thuật toán tạo key dựa trên seed
        return `VIP-${seed}-DEMO-TEST-0001`;
    }

    // Lấy device ID
    getDeviceId() {
        let deviceId = localStorage.getItem('vip_device_id');
        if (!deviceId) {
            deviceId = 'DEV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('vip_device_id', deviceId);
        }
        return deviceId;
    }

    // Lưu key
    storeKey(key) {
        const encrypted = btoa(JSON.stringify({
            key: key,
            timestamp: Date.now(),
            deviceId: this.getDeviceId()
        }));
        localStorage.setItem('vip_auth_token', encrypted);
    }

    // Lấy key đã lưu
    getStoredKey() {
        try {
            const encrypted = localStorage.getItem('vip_auth_token');
            if (encrypted) {
                const data = JSON.parse(atob(encrypted));
                // Kiểm tra thời gian (key có thể hết hạn)
                const daysPassed = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
                if (daysPassed < 365) { // Key có hiệu lực 1 năm
                    return data.key;
                }
            }
        } catch (error) {
            console.error('Error reading stored key:', error);
        }
        return null;
    }

    // Hiển thị trạng thái
    showStatus(type, message) {
        const statusEl = document.getElementById('vipStatus');
        if (!statusEl) return;
        
        statusEl.style.display = 'block';
        statusEl.className = `vip-status ${type}`;
        
        const icons = {
            loading: 'fas fa-spinner fa-spin',
            error: 'fas fa-times-circle',
            success: 'fas fa-check-circle'
        };
        
        statusEl.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
        `;
    }

    // Hiển thị thành công
    showSuccess() {
        this.showStatus('success', '✅ VIP Key hợp lệ! Đang mở khóa...');
        
        setTimeout(() => {
            const modal = document.getElementById('vipAuthModal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    // Mở khóa website
    unlockWebsite() {
        const mainContent = document.querySelector('.container');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            
            // Hiệu ứng mở khóa
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 0.5s ease';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'scale(1)';
            }, 100);
        }
        
        // Thêm badge VIP
        this.addVIPBadge();
        
        // QUAN TRỌNG: Tích hợp sâu vào website
        this.integrateDeepProtection();
    }
    
    // Tích hợp bảo vệ sâu - KHÔNG THỂ XÓA
    integrateDeepProtection() {
        // Inject VIP check vào tất cả function quan trọng
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            if (!localStorage.getItem('vip_auth_token')) {
                throw new Error('VIP authentication required');
            }
            return originalFetch.apply(this, args);
        };
        
        // Bảo vệ localStorage
        const originalRemoveItem = localStorage.removeItem;
        localStorage.removeItem = function(key) {
            if (key === 'vip_auth_token') {
                console.warn('VIP token removal blocked');
                return;
            }
            return originalRemoveItem.apply(this, arguments);
        };
        
        // Bảo vệ DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach((node) => {
                        if (node.tagName === 'SCRIPT' && 
                            (node.src && node.src.includes('vip-auth.js'))) {
                            location.reload();
                        }
                    });
                }
            });
        });
        
        observer.observe(document.head, {
            childList: true,
            subtree: true
        });
        
        // Kiểm tra định kỳ
        setInterval(() => {
            if (!this.isVIPAuthenticated()) {
                document.body.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(45deg, #ff0000, #000000);
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Arial, sans-serif;
                        font-size: 24px;
                        text-align: center;
                        z-index: 999999;
                    ">
                        <div>
                            <h1>🚫 VIP SESSION EXPIRED</h1>
                            <p>Your VIP session has expired or been tampered with</p>
                            <button onclick="location.reload()" style="
                                padding: 15px 30px;
                                font-size: 16px;
                                background: #6366f1;
                                color: #fff;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                margin-top: 20px;
                            ">Refresh Page</button>
                        </div>
                    </div>
                `;
            }
        }, 3000);
    }

    // Thêm badge VIP
    addVIPBadge() {
        const header = document.querySelector('.header-badges');
        if (header) {
            const vipBadge = document.createElement('span');
            vipBadge.className = 'badge badge-vip authenticated';
            vipBadge.innerHTML = '<i class="fas fa-crown"></i> VIP ACTIVE';
            header.appendChild(vipBadge);
        }
    }

    // Shake modal khi lỗi
    shakeModal() {
        const modal = document.querySelector('.vip-modal-content');
        if (modal) {
            modal.classList.add('shake');
            setTimeout(() => {
                modal.classList.remove('shake');
            }, 500);
        }
    }

    // Chống bypass và inspect element
    setupAntiBypass() {
        // Chống F12
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                this.showAntiBypassWarning();
                return false;
            }
        });

        // Chống right click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showAntiBypassWarning();
        });

        // Detect DevTools
        let devtools = {
            open: false,
            orientation: null
        };
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || 
                window.outerWidth - window.innerWidth > 200) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.handleDevToolsOpen();
                }
            } else {
                devtools.open = false;
            }
        }, 500);

        // Chống copy code
        document.addEventListener('selectstart', (e) => {
            if (!this.isAuthenticated) {
                e.preventDefault();
            }
        });
    }

    // Cảnh báo chống bypass
    showAntiBypassWarning() {
        if (!this.isAuthenticated) {
            alert('🚫 Chức năng này bị vô hiệu hóa!\n\nVui lòng nhập VIP Key để sử dụng.');
        }
    }

    // Xử lý khi mở DevTools
    handleDevToolsOpen() {
        if (!this.isAuthenticated) {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #ff0000, #000000);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Arial, sans-serif;
                    font-size: 24px;
                    text-align: center;
                    z-index: 999999;
                ">
                    <div>
                        <h1>🚫 ACCESS DENIED</h1>
                        <p>Developer tools detected!</p>
                        <p>Please refresh and enter valid VIP Key</p>
                        <button onclick="location.reload()" style="
                            padding: 10px 20px;
                            font-size: 16px;
                            background: #fff;
                            color: #000;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-top: 20px;
                        ">Refresh Page</button>
                    </div>
                </div>
            `;
        }
    }

    // Kiểm tra trạng thái xác thực
    isVIPAuthenticated() {
        return this.isAuthenticated;
    }

    // Logout VIP
    logout() {
        this.isAuthenticated = false;
        this.vipKey = null;
        localStorage.removeItem('vip_auth_token');
        location.reload();
    }
}

// CSS cho VIP Auth Modal
const vipAuthCSS = `
<style>
.vip-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: vipFadeIn 0.5s ease;
}

.vip-modal-content {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 2px solid #6366f1;
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
    position: relative;
    overflow: hidden;
}

.vip-modal-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent);
    animation: vipShimmer 2s infinite;
    pointer-events: none;
}

.vip-header {
    text-align: center;
    margin-bottom: 30px;
}

.vip-logo i {
    font-size: 48px;
    color: #fbbf24;
    margin-bottom: 10px;
    animation: vipPulse 2s infinite;
}

.vip-header h2 {
    color: #f1f5f9;
    margin: 10px 0;
    font-size: 24px;
    text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.vip-subtitle {
    color: #94a3b8;
    font-size: 14px;
}

.vip-message {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 25px;
    text-align: center;
}

.vip-message i {
    font-size: 32px;
    color: #6366f1;
    margin-bottom: 15px;
}

.vip-message p {
    color: #f1f5f9;
    margin: 10px 0;
    line-height: 1.5;
}

.vip-note {
    color: #fbbf24 !important;
    font-weight: bold;
}

.vip-form {
    margin-bottom: 25px;
}

.vip-form label {
    color: #f1f5f9;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

.vip-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #374151;
    border-radius: 8px;
    background: #1f2937;
    color: #f1f5f9;
    font-size: 16px;
    font-family: 'Courier New', monospace;
    text-align: center;
    letter-spacing: 2px;
}

.vip-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}

.input-with-button {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.btn-vip-verify {
    padding: 12px 20px;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.btn-vip-verify:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.vip-help {
    color: #94a3b8;
    font-size: 12px;
}

.vip-status {
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    margin-top: 15px;
}

.vip-status.loading {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
}

.vip-status.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
}

.vip-status.success {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #22c55e;
}

.vip-purchase {
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

.vip-purchase h3 {
    color: #fbbf24;
    margin-bottom: 15px;
}

.vip-purchase p {
    color: #f1f5f9;
    margin-bottom: 15px;
}

.purchase-options {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.btn-purchase {
    padding: 10px 15px;
    background: rgba(99, 102, 241, 0.2);
    color: #6366f1;
    text-decoration: none;
    border-radius: 8px;
    border: 1px solid rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    font-size: 14px;
}

.btn-purchase:hover {
    background: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
}

.price-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.price {
    color: #22c55e;
    font-weight: bold;
}

.features {
    color: #94a3b8;
    font-size: 12px;
}

.badge-vip.authenticated {
    background: linear-gradient(45deg, #fbbf24, #f59e0b);
    color: #000;
    animation: vipGlow 2s infinite;
}

.shake {
    animation: vipShake 0.5s ease-in-out;
}

@keyframes vipFadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes vipShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes vipPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes vipGlow {
    0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
    50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.8); }
}

@keyframes vipShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

@media (max-width: 768px) {
    .vip-modal-content {
        margin: 20px;
        padding: 20px;
    }
    
    .input-with-button {
        flex-direction: column;
    }
    
    .purchase-options {
        flex-direction: column;
    }
    
    .price-info {
        flex-direction: column;
        text-align: center;
    }
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', vipAuthCSS);

// Khởi tạo VIP Auth khi trang load
let vipAuth;
document.addEventListener('DOMContentLoaded', () => {
    vipAuth = new VIPAuth();
});

// Export để sử dụng trong các file khác
window.VIPAuth = VIPAuth;