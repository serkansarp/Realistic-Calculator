const numbers = document.querySelectorAll('.number');
const input = document.querySelector('#input');

let firstValue = null;
let selectedOperator = null;
let secondValue = null;
let newValue = false;

const operators = document.querySelectorAll('.operator');

let secondValueStarted = false;
let sonuc = null;

function numberInput(value) {
  let newValue;

  if (value === '.') {
    if (input.value.includes('.')) {
      return Number(input.value);
    }

    if (input.value === '0') {
      newValue = '0.';
    } else {
      newValue = input.value + '.';
    }
  } else if (input.value === '0') {
    newValue = value;
  } else {
    newValue = input.value + value;
  }

  let digitCount = newValue.replace(/[-.]/g, '').length;

  if (digitCount > 10) {
    return Number(input.value);
  }

  input.value = newValue;

  return Number(input.value);
}

function formatResult(value) {
  let roundedValue = Number(value.toPrecision(10));
  let text = String(roundedValue);
  let digits = text.replace(/[-.]/g, '');

  if (digits.length > 10) {
    let result = '';

    for (
      let i = 0;
      i < text.length && result.replace(/[-.]/g, '').length < 10;
      i++
    ) {
      result += text[i];
    }

    return result + '...';
  }

  return text;
}

// Numbers
numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    // İkinci değer
    if (selectedOperator !== null) {
      if (secondValueStarted === false) {
        input.value = '0';
        secondValue = numberInput(e.target.innerText);
        secondValueStarted = true;
      } else {
        secondValue = numberInput(e.target.innerText);
      }

      // Sonuçtan sonra yeni değer
    } else if (newValue === true) {
      // input.value = e.target.innerText;
      input.value = '0';
      //firstValue = Number(input.value);
      firstValue = numberInput(e.target.innerText);
      newValue = false;

      // İlk değer
    } else {
      firstValue = numberInput(e.target.innerText);
    }

    console.log(firstValue, selectedOperator, secondValue);
  });
});

// Operators
operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (e.target.classList.contains('clear')) {
      input.value = '0';

      firstValue = null;
      secondValue = null;
      selectedOperator = null;
      newValue = false;
      secondValueStarted = false;
      sonuc = null;

      return;
    }

    if (e.target.id === 'plus') {
      selectedOperator = 'plus';
    } else if (e.target.id === 'minus') {
      selectedOperator = 'minus';
    } else if (e.target.id === 'multiply') {
      selectedOperator = 'multiply';
    } else if (e.target.id === 'divide') {
      selectedOperator = 'divide';
    } else if (e.target.id === 'percent') {
      selectedOperator = 'percent';
    } else if (e.target.id === 'squareRoot' && firstValue > 0) {
      sonuc = Math.sqrt(firstValue);
      input.value = formatResult(sonuc);
      firstValue = sonuc;
      secondValue = null;
      secondValueStarted = false;
      newValue = true;
      selectedOperator = null;
    } else if (
      e.target.id === 'factorial' &&
      firstValue > 0 &&
      firstValue % 1 === 0
    ) {
      sonuc = 1;
      for (let i = 1; i <= firstValue; i++) {
        sonuc *= i;
      }
      input.value = formatResult(sonuc);
      firstValue = sonuc;
      secondValue = null;
      secondValueStarted = false;
      newValue = true;
      selectedOperator = null;
    }

    if (e.target.id === 'equal') {
      if (selectedOperator === 'plus') {
        sonuc = firstValue + secondValue;
      } else if (selectedOperator === 'minus') {
        sonuc = firstValue - secondValue;
      } else if (selectedOperator === 'multiply') {
        sonuc = firstValue * secondValue;
      } else if (selectedOperator === 'divide') {
        sonuc = firstValue / secondValue;
      } else if (selectedOperator === 'percent') {
        sonuc = (firstValue / 100) * secondValue;
      }

      input.value = formatResult(sonuc);

      firstValue = sonuc;
      secondValue = null;
      selectedOperator = null;
      secondValueStarted = false;
      newValue = true;

      console.log(sonuc);
    }

    newValue = true;

    console.log(firstValue);
    console.log(selectedOperator);
  });
});

// Keyboard - KeyDown
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    // Sayılar
    document.querySelectorAll('.number').forEach((number) => {
      if (number.innerText === e.key) {
        number.classList.add('key-active');
        number.click();
      }
    });
  }

  if (e.key === ',') {
    // Nokta
    let button = document.querySelector('.float');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === '/') {
    // Bölme
    let button = document.querySelector('#divide');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === '*') {
    // Çarpma
    let button = document.querySelector('#multiply');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === '-') {
    // Çıkarma
    let button = document.querySelector('#minus');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === '+') {
    // Toplama
    let button = document.querySelector('#plus');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === '%') {
    // Yüzde
    let button = document.querySelector('#percent');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === '!') {
    // Faktöriyel
    let button = document.querySelector('#factorial');
    button.classList.add('key-active');
    button.click();
  }

  if (e.key === 'Enter') {
    // Eşittir
    let button = document.querySelector('#equal');
    button.classList.add('key-active');
    button.click();
  }
});

// Keyboard - KeyUp
document.addEventListener('keyup', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    document.querySelectorAll('.number').forEach((number) => {
      if (number.innerText === e.key) {
        number.classList.remove('key-active');
      }
    });
  }

  if (e.key === ',') {
    document.querySelector('.float').classList.remove('key-active');
  }

  if (e.key === '/') {
    document.querySelector('#divide').classList.remove('key-active');
  }

  if (e.key === '*') {
    document.querySelector('#multiply').classList.remove('key-active');
  }

  if (e.key === '-') {
    document.querySelector('#minus').classList.remove('key-active');
  }

  if (e.key === '+') {
    document.querySelector('#plus').classList.remove('key-active');
  }

  if (e.key === '%') {
    document.querySelector('#percent').classList.remove('key-active');
  }

  if (e.key === '!') {
    document.querySelector('#factorial').classList.remove('key-active');
  }

  if (e.key === 'Enter') {
    document.querySelector('#equal').classList.remove('key-active');
  }
});
