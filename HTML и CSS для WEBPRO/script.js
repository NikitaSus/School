let gameTime = 0; // Время игры
let timer = null; // Переменная для хранения таймера
let score = 0; // Переменная для подсчета очков

function startGame() {
  const startButton = document.getElementById('start');
  // блок игры
  const gameDiv = document.getElementById('game');
  // Получаем введенное пользователем время
  const gameTimeInput = document.getElementById('game-time');
  const timeHeader = document.getElementById('time-header');
  const timeDisplay = document.getElementById('time');
  const resultHeader = document.getElementById('result-header');

  // Сбрасываем счет
  score = 0;
  // Прячем результа
  resultHeader.classList.add('hide');

  // Устанавливаем время игры
  gameTime = parseFloat(gameTimeInput.value);
  timeDisplay.textContent = gameTime.toFixed(1);

  // Скрываем кнопку и показываем блок игры
  startButton.style.display = 'none';
  gameDiv.style.display = 'block';
  timeHeader.style.display = 'block';

  startTimer();

  createRect(gameDiv);
}

function startTimer() {
  const timeDisplay = document.getElementById('time');
  
  timer = setInterval(() => {
    gameTime -= 0.1; // Уменьшаем время на 0.1 секунды каждую 100 миллисекунд
    timeDisplay.textContent = gameTime.toFixed(1); // Обновляем отображение времени

    if (gameTime <= 0) {
      endGame(); // Завершаем игру, когда время истекает
    }
  }, 100); // Интервал в 100 миллисекунд для плавного уменьшения времени
}

function endGame() {
  clearInterval(timer); // Останавливаем таймер

  // Скрываем блок игры и показываем кнопку
  const startButton = document.getElementById('start');
  const gameDiv = document.getElementById('game');
  const timeHeader = document.getElementById('time-header');
  const resultHeader = document.getElementById('result-header');
  const resultDisplay = document.getElementById('result');
  
  startButton.style.display = 'inline-block';
  gameDiv.style.display = 'none';
  timeHeader.style.display = 'none';

  // Удаляем квадрат, если он существует
  const existingSquare = document.querySelector('.square');
  if (existingSquare) {
    existingSquare.remove();
  }

  // Показываем результат
  resultDisplay.textContent = score;
  // Отображаем результат
  resultHeader.classList.remove('hide'); 
}

function createRect(gameDiv) {
  // Удаляем предыдущий квадрат, если он существует
  const existingSquare = document.querySelector('.square');
  if (existingSquare) {
    existingSquare.remove();
  }

  // Создаем новый квадрат
  const square = document.createElement('div');
  square.classList.add('square'); // Добавляем класс для идентификации
  square.style.width = '100px';
  square.style.height = '100px';
  square.style.backgroundColor = 'blue';
  square.style.position = 'absolute';

  // Генерация случайной позиции для квадрата внутри блока gameDiv
  const maxWidth = gameDiv.clientWidth - 100; // Вычитание ширины квадрата
  const maxHeight = gameDiv.clientHeight - 100; // Вычитание высоты квадрата
  const randomX = Math.random() * maxWidth; // Случайная координата X
  const randomY = Math.random() * maxHeight; // Случайная координата Y

  square.style.left = `${randomX}px`;
  square.style.top = `${randomY}px`;

  // Добавляем обработчик события на клик по квадрату
  square.addEventListener('click', function() {
    score++; 
    createRect(gameDiv);
  });

  // Добавляем квадрат в gameDiv
  gameDiv.appendChild(square);
}
