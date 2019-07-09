let num1, num2, result;
let oper;

function NumberInput(message) {             // Функция ввода числа
let StrPromt;
let InputNumber;

  if (message === undefined) {
    message = 'Текст не передан!';
  }
  while (true) {
    StrPromt = prompt(message);
    if (StrPromt == null) {
      if (confirm('Завершмить работу?')) {
        InputNumber = null;
        break;
      } else {
        continue;
      }  
    } else if (StrPromt === '') {  
      alert('Число не введено!');
      continue;
    } else if (isNaN(StrPromt / 1)) {
      alert('Это не число!');
      continue;
    } else {
      InputNumber = StrPromt / 1;
      break;
    } 
  }  // while (true)
  return InputNumber;
}


function OperInput(message) {                 // Функция ввода знака арифметического действия
let StrPromt;
let InputOper;

  if (message === undefined) {
    message = 'Текст не передан!';
  }
  while (true) {
    StrPromt = prompt(message);
    if (StrPromt == null) {
      if (confirm('Завершмить работу?')) {
        InputOper = null;
        break;
      } else {
        continue;
      }  
    } else if (StrPromt === '') {  
      alert('Действие не введено!');
      continue;
    } else if (StrPromt === '+') {
      InputOper = StrPromt;
      break;
    } else if (StrPromt === '-') {
      InputOper = StrPromt;
      break;
    } else if (StrPromt === '*') {
      InputOper = StrPromt;
      break;
    } else if (StrPromt === '/') {
      InputOper = StrPromt;
      break;
    } else {
      alert('Некорректный ввод');
      continue;
    } 
  }  // while (true)
  return InputOper;
}



while (true) {
  num1 = NumberInput('Введите первое число:');
  if (num1 != null) {
    num2 = NumberInput('Введите второе число:');
  } else {
    break;
  }
  
  if (num2 != null) {
    oper = OperInput('Введите действие (+. -, *, /): ');  
  } else {
    break;
  }
  
  if (oper != null) {
    if (oper === '+') {
      result = num1 + num2;
    } else if (oper === '-') {
      result = num1 - num2;
    } else if (oper === '*') {
      result = num1 * num2;
    } else if (oper === '/') {
      result = num1 / num2;
    } else {
      alert('Невероятно!');
    } 
  } else {
    break;
  }

  alert(num1 + ' ' + oper + ' ' + num2 + '\n' + '------------\n' + 'Результат: ' + result);

  if (confirm('Продолжить работу?')) {
    continue;
  } else {
    break;
  }  
}

alert('Работа завершена!');


