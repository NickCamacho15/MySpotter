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
            const data = await response.json();
          
            // Close the modal
            var createWorkoutModal = new bootstrap.Modal(document.getElementById("createWorkoutModal"));
            createWorkoutModal.hide();
          
            // Insert the new workout card into the DOM
            const workoutsContainer = document.querySelector('.row.justify-content-center');
            const newCard = `
                <a href="/workouts/${data.id}" class="col-md-4 mb-4 text-decoration-none">
                    <div class="card shadow-sm rounded">
                        <div class="card-body text-center">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text"><small>Created by: ${data.username}</small></p>
                        </div>
                    </div>
                </a>
            `;
            location.reload();
          } else {
            alert('Failed to add workout');
          }                 
    }
    

const workoutForm = document.querySelector('.new-workout-form');
if (workoutForm) {
    workoutForm.addEventListener('submit', newFormHandler);
}
