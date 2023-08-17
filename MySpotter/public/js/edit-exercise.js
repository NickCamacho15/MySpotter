function editExercise(exerciseId, name, weight, sets, reps) {
    // Populate the form with existing values
    document.querySelector('#edit-exercise-name').value = name;
    document.querySelector('#edit-weight').value = weight;
    document.querySelector('#edit-sets').value = sets;
    document.querySelector('#edit-reps').value = reps;

    // Open the modal
    var editModal = new bootstrap.Modal(document.getElementById("editExerciseModal"));
    editModal.show();

    // Event listener for form submission
    document.querySelector('.edit-exercise-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get updated values from the form
        const updatedName = document.querySelector('#edit-exercise-name').value;
        const updatedWeight = document.querySelector('#edit-weight').value;
        const updatedSets = document.querySelector('#edit-sets').value;
        const updatedReps = document.querySelector('#edit-reps').value;
        const workout_id = location.pathname.split('/')[2];

        // Make the PUT request
        const response = await fetch(`/api/workouts/${workout_id}/exercises/${exerciseId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: updatedName,
                weight: updatedWeight,
                sets: updatedSets,
                reps: updatedReps,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to edit exercise');
        }        
    });
}

