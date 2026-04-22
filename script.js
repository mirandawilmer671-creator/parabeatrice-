function startMagic() {
    const surprise = document.getElementById('surpriseArea');
    const btn = document.getElementById('magicButton');
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

    for (let i = 0; i < 100; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'scratch-leaf';
        leaf.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        const clear = () => {
            leaf.classList.add('cleared');
            checkProgress();
        };
        
        leaf.addEventListener('mouseover', clear);
        leaf.addEventListener('touchstart', (e) => { e.preventDefault(); clear(); });
        overlay.appendChild(leaf);
    }
}

function checkProgress() {
    const remaining = document.querySelectorAll('.scratch-leaf:not(.cleared)');
    if (remaining.length < 15) {
        document.getElementById('finalMessage').style.display = 'block';
        document.querySelector('.instruction').style.display = 'none';
    }
}
