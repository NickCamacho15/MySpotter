async function newFormHandler(event) {
    event.preventDefault();

    const exercise_name = document.querySelector('#exercise-name').value;
    const exercise_description = document.querySelector('#exercise-description').value;
    const exercise_sets = document.querySelector('#exercise-sets').value;
    const exercise_reps = document.querySelector('#exercise-reps').value;
    const exerciseForm = document.querySelector('.new-exercise-form');

    if (exerciseForm) {
        exerciseForm.addEventListener('submit', newFormHandler);
    }

    const response = await fetch(`/api/dish`, {
        method: 'POST',
        body: JSON.stringify({
            exercise_name,
            exercise_description,
            exercise_sets,
            exercise_reps,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add exercise');
    }
}

const exerciseForm = document.querySelector('.new-exercise-form');
if (exerciseForm) {
    exerciseForm.addEventListener('submit', newFormHandler);
}

