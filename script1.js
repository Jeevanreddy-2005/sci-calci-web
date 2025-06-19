 let display = document.getElementById('display');
    let memory = 0;

    function press(value) {
      if (display.textContent === '0') display.textContent = '';
      display.textContent += value;
    }

    function calculate() {
      try {
        display.textContent = eval(display.textContent);
      } catch {
        display.textContent = 'Error';
      }
    }

    function clearAll() { display.textContent = '0'; }

    function backspace() {
      display.textContent = display.textContent.slice(0, -1) || '0';
    }

    function toggleSign() {
      if (display.textContent !== '0') {
        display.textContent = display.textContent.startsWith('-') ? display.textContent.slice(1) : '-' + display.textContent;
      }
    }

    function factorial() {
      let n = parseFloat(display.textContent);
      if (isNaN(n) || n < 0) { display.textContent = 'Error'; return; }
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      display.textContent = res;
    }
document.querySelectorAll('.btn-op').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-op').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
function flashResult() {
  display.classList.add('result-flash');
  setTimeout(() => display.classList.remove('result-flash'), 400);
}

    function clearMemory() { memory = 0; }
    function addMemory() { memory += parseFloat(display.textContent) || 0; }
    function subMemory() { memory -= parseFloat(display.textContent) || 0; }
    function recallMemory() { display.textContent = memory; }

 function toggleTheme() {
  document.body.classList.toggle("light");
}