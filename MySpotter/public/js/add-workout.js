    function createWorkoutCardElement(workoutName) {
        const workoutCard = document.createElement('div');
        workoutCard.classList.add('col-md-4', 'mb-4');
    
        const cardContent = `
            <div class="card shadow-sm rounded">
                <div class="card-body text-center">
                    <h5 class="card-title">${workoutName}</h5>
                    <p class="card-text"><small>Created by: {{../user.username}}</small></p>
                </div>
            </div>
        `;
    
        workoutCard.innerHTML = cardContent;
        return workoutCard;
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
            // Close the modal
            var createWorkoutModal = new bootstrap.Modal(document.getElementById("createWorkoutModal"));
            createWorkoutModal.hide();
    
            // Insert the new workout card into the DOM
            const workoutsContainer = document.querySelector('.row.justify-content-center');
            const newCard = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm rounded">
                        <div class="card-body text-center">
                            <h5 class="card-title">${workoutName}</h5>
                            <p class="card-text"><small>Created by: {{../user.username}}</small></p>
                        </div>
                    </div>
                </div>
            `;
            workoutsContainer.insertAdjacentHTML('beforeend', newCard);
        } else {
            alert('Failed to add workout');
        }
    }
    

const workoutForm = document.querySelector('.new-workout-form');
if (workoutForm) {
    workoutForm.addEventListener('submit', newFormHandler);
}
