import {useNavigate} from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {
    const navigate = useNavigate()
    function createPost(project) {
        // initialize cos and service
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            // redirect
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projects", {state});
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Create a Project</h1>
            <p>Create your services then add it services</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />
        </div>
    )
}
export default NewProject