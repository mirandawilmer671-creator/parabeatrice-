function startMagic() {
    const surprise = document.getElementById('surpriseArea');
    const btn = document.getElementById('magicButton');
    const music = document.getElementById('birthdaySong');

    // Inicia la música al tocar el botón
    music.play().catch(e => console.log("Esperando interacción para el audio"));

    surprise.classList.remove('hidden');
    btn.style.display = 'none';

    for(let i = 0; i < 15; i++) {
        createFallingLeaf();
    }
}

function createFallingLeaf() {
    const leaf = document.createElement('div');
    leaf.innerHTML = '🍃';
    leaf.style.position = 'fixed';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.top = '-5vh';
    leaf.style.zIndex = '1';
    leaf.style.fontSize = '25px';
    leaf.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 5000);
}

function showLeafLayer() {
    document.getElementById('leafLayer').classList.remove('hidden');
    document.getElementById('nextButton').style.display = 'none';
    const overlay = document.querySelector('.leaf-overlay');
    const icons = ['🌿', '🍃', '🍀'];

    for (let i = 0; i < 80; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'scratch-leaf';
        leaf.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        const clear = () => {
            if(!leaf.classList.contains('cleared')) {
                leaf.classList.add('cleared');
                checkProgress();
            }
        };
        
        leaf.addEventListener('mouseover', clear);
        leaf.addEventListener('touchstart', (e) => { e.preventDefault(); clear(); }, {passive: false});
        leaf.addEventListener('touchmove', (e) => {
            e.preventDefault();
            let touch = e.touches[0];
            let target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target && target.classList.contains('scratch-leaf')) {
                target.classList.add('cleared');
                checkProgress();
            }
        }, {passive: false});

        overlay.appendChild(leaf);
    }
}

function checkProgress() {
    const remaining = document.querySelectorAll('.scratch-leaf:not(.cleared)');
    if (remaining.length < 10) {
        const msg = document.getElementById('finalMessage');
        msg.style.opacity = '1';
        document.querySelector('.leaf-overlay').style.display = 'none';
        document.querySelector('.instruction').style.display = 'none';
    }
}
