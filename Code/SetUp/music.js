// Music
var gameBoyStartFinish =0;
var gameReadyToStart = 0;
// onloadeddata= "var gameBoyStartSound = this; setTimeout(function() { gameBoyStartSound.play(); }, 2000)"
function playGameBoyMusic()
{
  var gameBoyStartSound = document.getElementById('gameBoyStartSound');
  setTimeout(function() { gameBoyStartSound.play();  gameBoyStartFinish=1;}, 2000);
  setTimeout(function(){gameReadyToStart = 1},5500);
}
function playMarioMusic()
{
  if ( isInvincible )
  {
      document.getElementById('themeSong').pause();
      document.getElementById('funSong').pause();
      document.getElementById('rainbowRoad').pause();
      document.getElementById('starSong').play();
      if (isGameOver)
        {document.getElementById('starSong').pause();}
  }
  else if ( !isMusic || isGameOver )
  {
      document.getElementById('themeSong').pause();
      document.getElementById('funSong').pause();
      document.getElementById('rainbowRoad').pause();
      document.getElementById('starSong').pause();
  }
  else if( isMusic && !isInvincible && !isFun && !isGameOver)
  {
      document.getElementById('themeSong').play();
      document.getElementById('funSong').pause();
      document.getElementById('rainbowRoad').pause();
      document.getElementById('starSong').pause();
      document.getElementById('dieSound').pause();
  }
  else if ( isMusic && !isInvincible && isFun && !isGameOver)
  {
      document.getElementById('themeSong').pause();
      document.getElementById('funSong').play();
      document.getElementById('rainbowRoad').pause();
      document.getElementById('starSong').pause();
      document.getElementById('dieSound').pause();
  }
}

function playRegularMusic()
{
  if ( isMusic && !isFun )
  {
      document.getElementById('themeSong').pause();
      document.getElementById('funSong').pause();
      document.getElementById('rainbowRoad').play();
      document.getElementById('starSong').pause();
  }
  else if ( !isMusic )
  {
      document.getElementById('themeSong').pause();
      document.getElementById('funSong').pause();
      document.getElementById('rainbowRoad').pause();
      document.getElementById('starSong').pause();
  }
  else if ( isMusic && isFun )
  {
      document.getElementById('themeSong').pause();
      document.getElementById('funSong').play();
      document.getElementById('rainbowRoad').pause();
      document.getElementById('starSong').pause();
  }
}

function stopInvincibilityMusic()
{
  document.getElementById('starSong').pause();
  if( isMusic )
  {
      if( isFun )
      {
          document.getElementById('funSong').play();
      }
      else if( isMarioMode )
      {
          document.getElementById('themeSong').play();
      }
      else
      {
          document.getElementById('rainbowRoad').play();
      }
  }
}

function playCubeCrashMusic()
{
  document.getElementById('crashSound').currentTime = 0;
  document.getElementById('crashSound').play();
  explodeSound = true;
}
