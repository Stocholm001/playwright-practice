export async function injectClickHighlight(page: any) {
    await page.addStyleTag({
      content: `
        .click-highlight {
          position: fixed;
          width: 30px;
          height: 30px;
          background: rgba(255, 0, 0, 0.5);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: click-fade 0.5s ease-out forwards;
          z-index: 99999;
        }
        @keyframes click-fade {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `
    });
  
    await page.addScriptTag({
      content: `
        document.addEventListener('click', (e) => {
          const dot = document.createElement('div');
          dot.className = 'click-highlight';
          dot.style.left = e.clientX + 'px';
          dot.style.top  = e.clientY + 'px';
          document.body.appendChild(dot);
          setTimeout(() => dot.remove(), 500);
        });
      `
    });
  }