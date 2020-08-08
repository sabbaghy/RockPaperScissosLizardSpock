const getRemainTime = (futureDate) => {
   const now = new Date();
   const remainTime = (new Date(futureDate) - now + 2000) / 1000;
   const remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
   const remainMinutes = ('0' + Math.floor((remainTime / 60) % 60)).slice(-2);
   const remainHours = ('0' + Math.floor((remainTime / 3600) % 24)).slice(-2);
   const remainDays = Math.floor((remainTime / (3600 * 24)));
   return {remainTime, remainDays, remainHours, remainMinutes, remainSeconds}
}

const countdown = (deadline) =>{

   const hours = document.getElementById('hours');
   const minutes = document.getElementById('minutes');
   const seconds = document.getElementById('seconds');
   const finalMsg = document.getElementById('final-msg');
   
   const timerUpdate = setInterval(()=>{
      const t = getRemainTime(deadline);
      hours.innerHTML = `${t.remainHours}` 
      minutes.innerHTML = `${t.remainMinutes}` 
      seconds.innerHTML = `${t.remainSeconds}` 
   
      if(t.remainTime <= 1){
         clearInterval(timerUpdate);
         finalMsg.innerHTML = 'You lost, time is over'; 

      }
      }, 1000)
}