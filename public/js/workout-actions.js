function openEditModal(element) {
    const workoutId = element.dataset.id;
    window.location.href = `/edit-workout/${workoutId}`;
}

// Export the function to make it accessible in other script files if needed
window.openEditModal = openEditModal;

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

// Export the function to make it accessible in other script files if needed
window.deleteWorkout = deleteWorkout;
