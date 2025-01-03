const targetDate = new Date(new Date().getFullYear(), 6, 25, 0, 0, 0); // July 25th
    const mainCountdownElement = document.getElementById('countdown');
    const finalCountdownElement = document.getElementById('final-countdown');
    const birthdayMessageElement = document.getElementById('birthday-message');
    const confettiContainer = document.getElementById('confetti-container');
    const balloonContainer = document.getElementById('balloon-container');

    function updateCountdown() {
      const now = new Date();
      const timeDiff = targetDate - now;

      if (timeDiff > 0) {
        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
      } else {
        clearInterval(countdownInterval);
        startFinalCountdown();
      }
    }

function startFinalCountdown() {
      mainCountdownElement.style.display = 'none';
      finalCountdownElement.parentElement.style.display = 'block';

      let countdown = 60;
      finalCountdownElement.textContent = countdown;

      const finalInterval = setInterval(() => {
        countdown--;
        finalCountdownElement.textContent = countdown;

        if (countdown <= 0) {
          clearInterval(finalInterval);
          finalCountdownElement.parentElement.style.display = 'none';
          birthdayMessageElement.style.display = 'block';
          launchConfetti();
          launchBalloons();
        }
      }, 1000);
    }

    function launchConfetti() {
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = randomColor();
        confettiContainer.appendChild(confetti);
      }
    }

    function randomColor() {
      const colors = ['#ff6a00', '#ee0979', '#fad0c4', '#ff0077', '#00c9ff'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function launchBalloons() {
      for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.textContent = '🎈';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDelay = Math.random() * 5 + 's';

        balloon.addEventListener('click', () => popBalloon(balloon));
        balloonContainer.appendChild(balloon);
      }
    }
function popBalloon(balloon) {
      const blast = document.createElement('div');
      blast.classList.add('blast');
      blast.textContent = '💥';
      blast.style.left = balloon.style.left;
      blast.style.top = balloon.getBoundingClientRect().top + 'px';

      document.body.appendChild(blast);

      balloon.remove();

      setTimeout(() => {
        blast.remove();
      }, 1000);
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
