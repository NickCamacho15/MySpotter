document.addEventListener("DOMContentLoaded", () => {
    const workoutForm = document.querySelector('.new-workout-form');
    if (workoutForm) {
        workoutForm.addEventListener('submit', newFormHandler);
    }

    async function newFormHandler(event) {
        event.preventDefault();
    
        const workoutName = document.querySelector('#workout-name').value;
    
        const response = await fetch(`/api/workouts/create`, {
            method: 'POST',
            body: JSON.stringify({
                name: workoutName
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            location.reload();
          } else {
            alert('Failed to add workout');
          }                 
    }
    


})