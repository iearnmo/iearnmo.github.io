var seconds = 30;
      function countdown() {
        seconds--;
        if (seconds < 0) {
          window.location.href = "https://www.example.com";
        } else {
          document.getElementById("timer").innerHTML = "You will be redirected in " + seconds + " seconds.";
          setTimeout(countdown, 1000);
        }
      }
      countdown();
