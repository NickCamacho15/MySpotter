document.addEventListener("DOMContentLoaded", function() {
    // Create a reference to the modal outside of the newFormHandler
    var createExerciseModal = new bootstrap.Modal(document.getElementById("createExerciseModal"));

    async function newFormHandler(event) {
        event.preventDefault();
        console.log('Inside newFormHandler');

        const exercise_name = document.querySelector('#exercise-name').value;
        const weight = document.querySelector('#weight').value;
        const exercise_sets = document.querySelector('#sets').value;
        const exercise_reps = document.querySelector('#reps').value;

        const workoutId = location.pathname.split('/')[2]; // Extracts the workoutId from the current URL

        const response = await fetch(`/api/workouts/${workoutId}/exercises`, {
            method: 'POST',
            body: JSON.stringify({
                name: exercise_name,
                weight: weight,
                sets: exercise_sets,
                reps: exercise_reps,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            // Close the modal using the existing reference
            createExerciseModal.hide();

            // Insert the new exercise into the DOM
            const exercisesContainer = document.querySelector('.row.justify-content-center');
            const newExercise = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm rounded">
                        <div class="card-body text-center">
                            <p>Exercise Name: ${data.name}</p>
                            <p>Weight Used: ${data.weight}</p>
                            <p>Sets: ${data.sets}</p>
                            <p>Reps: ${data.reps}</p>
                        </div>
                    </div>
                </div>
            `;
            exercisesContainer.insertAdjacentHTML('beforeend', newExercise);
        } else {
            alert('Failed to add exercise');
        }
    }

    const exerciseForm = document.querySelector('.new-exercise-form');
    if (exerciseForm) {
        exerciseForm.addEventListener('submit', newFormHandler);
    }
});
