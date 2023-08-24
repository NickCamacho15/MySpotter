async function deleteWorkout(workoutId) {
    
location.reload();
    const response = await fetch(window.location.pathname +`/${workoutId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    reponse.then(() => {
        location.reload();
    });
}
