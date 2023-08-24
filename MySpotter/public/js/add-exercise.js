document.addEventListener("DOMContentLoaded", function() {
    var createExerciseModal = new bootstrap.Modal(document.getElementById("createExerciseModal"));

    async function newFormHandler(event) {
        event.preventDefault();

        const exercise_name = document.querySelector('#exercise-name').value;
        const weight = document.querySelector('#weight').value;
        const exercise_sets = document.querySelector('#sets').value;
        const exercise_reps = document.querySelector('#reps').value;
        const workoutId = location.pathname.split('/')[3];

        const response = await fetch(`/api/workouts/${workoutId}/exercises/`, {
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
            location.reload();
        } else {
            alert('Failed to add exercise');
        }
    }

    async function deleteExercise(exerciseId) {
        const response = await fetch(`/api/exercises/${exerciseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const exerciseElements = document.querySelectorAll('.col-md-4');
            exerciseElements.forEach(element => {
                if (element.querySelector(`button[onclick="deleteExercise(${exerciseId})"]`)) {
                    element.remove();
                }
            });
        } else {
            alert('Failed to delete exercise');
        }
    }

    window.deleteExercise = deleteExercise;

    const exerciseForm = document.querySelector('.new-exercise-form');
    if (exerciseForm) {
        exerciseForm.addEventListener('submit', newFormHandler);
    }
});
