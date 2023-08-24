function editWorkout(workoutId) {
    window.location.href = `/edit-workout/${workoutId}`;
}

async function deleteWorkout(workoutId) {
    const response = await fetch(`/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        // Redirect to the updated workouts page (update the URL if needed)
        window.location.href = '/workouts';
    } else {
        alert('Failed to delete workout');
    }
}

document.getElementById("editWorkoutModal").addEventListener('show.bs.modal', (event) => {
    
    var button = event.relatedTarget.parentNode.parentNode; // Button that triggered the modal
    const workoutForm = document.querySelector('.edit-workout-form');
    workoutForm.addEventListener('submit', newFormHandler);
    
    
    async function newFormHandler(event){
        event.preventDefault();

        let name = document.getElementById("edit-exercise-name").value.trim();
        if(!name)
            name =  button.childNodes[3].getAttribute("value")

        let workoutId = document.getElementById("workoutId");
        workoutId = button.childNodes[1].getAttribute("value")

        console.log(workoutId);

        const response =  await fetch(`/api/workouts/${workoutId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        });
        if (response.ok) {
            location.reload();
    
        }
    }
    
});

    