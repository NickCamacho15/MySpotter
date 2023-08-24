document.getElementById("editExerciseModal").addEventListener('show.bs.modal', (event) => {
    
    var button = event.relatedTarget.parentNode.parentNode; // Button that triggered the modal
    const workoutForm = document.querySelector('.edit-exercise-form');
    workoutForm.addEventListener('submit', newFormHandler);
    
    
    async function newFormHandler(event){
        event.preventDefault();
        
        
        let name = document.getElementById("edit-exercise-name").value.trim();
        if(!name)
            name =  button.childNodes[3].getAttribute("value")

        let weight = document.getElementById("edit-exercise-weight").value.trim();
        if(!weight)
            weight = button.childNodes[5].getAttribute("value")

        let sets = document.getElementById("edit-exercise-sets").value.trim();
        if(!sets)
            sets = button.childNodes[7].getAttribute("value")

        let reps = document.getElementById("edit-exercise-reps").value.trim();
        if(!reps)
            reps = button.childNodes[9].getAttribute("value")

        let exerciseId = document.getElementById("exerciseId");
        exerciseId = button.childNodes[1].getAttribute("value")

        
        let workoutId = document.getElementById("workoutId");
        workoutId  =  workoutId.getAttribute("value");


        console.log(exerciseId, workoutId);

        const response =  await fetch(`/api/workouts/${workoutId}/exercises/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, weight, sets, reps, exerciseId}),
        });
        if (response.ok) {
            location.reload();
    
        }
    }
    
});
document.getElementById("deleteExerciseModal").addEventListener('show.bs.modal', (event) => {
    
    let button = event.relatedTarget.parentNode.parentNode; // Button that triggered the modal
    console.log(button);
    
});