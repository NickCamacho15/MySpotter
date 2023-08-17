async function editFormHandler(event) {
    event.preventDefault();

    const exercise_name = document.querySelector('#exercise-name').value;
    const weight = document.querySelector('#weight').value;
    const exercise_sets = document.querySelector('#sets').value;
    const exercise_reps = document.querySelector('#reps').value;
    const id = location.pathname.split('/')[3]; // Extracts the exerciseId from the current URL

    const response = await fetch(`/api/exercises/${id}`, {
        method: 'PUT',
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
        document.location.replace(`/exercise/${id}`);
    } else {
        alert('Failed to edit exercise');
    }
}


document
  .querySelector('.edit-exercise-form')
  .addEventListener('submit', editFormHandler);

