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
        const newCard = createWorkoutCardElement(data.name, data.id, data.username);
        workoutsContainer.appendChild(newCard);
    } else {
        alert('Failed to add workout');
    }
}

function createWorkoutCardElement(workoutName, workoutId, username) {
    const workoutCard = document.createElement('a');
    workoutCard.href = `/workouts/${workoutId}`;
    workoutCard.classList.add('col-md-4', 'mb-4', 'text-decoration-none');
    
    const cardContent = `
        <div class="card shadow-sm rounded">
            <div class="card-body text-center">
                <h5 class="card-title">${workoutName}</h5>
                <p class="card-text"><small>Created by: ${username}</small></p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-outline-secondary btn-sm" onclick="editWorkout(${workoutId})">Edit</button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteWorkout(${workoutId})">
                    <i class="fa fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;

    workoutCard.innerHTML = cardContent;
    return workoutCard;
}

const workoutForm = document.querySelector('.new-workout-form');
if (workoutForm) {
    workoutForm.addEventListener('submit', newFormHandler);
}

