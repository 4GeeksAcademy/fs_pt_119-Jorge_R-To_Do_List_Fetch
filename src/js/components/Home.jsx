import React, { useState, useEffect } from "react";

const Home = () => {
	const [lista, setLista] = useState([])
	const [tarea, setTarea] = useState("")

	useEffect(() => {

		console.log("Funcion del useEffect llamada");

		obtenerTarea();
		agregaUsuario();
	}, [])

	function obtenerTarea() {

		fetch('https://playground.4geeks.com/todo/users/JorgeCKR')

			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(data => {

				console.log(data.todos);
				setLista(data.todos)
			})

			.catch(error => {
				console.log(error);
			});

	}

	function agregaUsuario() {

		fetch('https://playground.4geeks.com/todo/users/JorgeCKR', {
			method: 'POST',
			headers: {
				'Content-Type': "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(data => {

				console.log(data);
				obtenerTarea();
			})
			.catch(error => {

				console.log(error);
			});
	}

	const agregaLista = (e) => {

		e.preventDefault()

		if (tarea.trim() === "") {
			return;
		}

		fetch('https://playground.4geeks.com/todo/todos/JorgeCKR', {
			method: "POST",
			body: JSON.stringify({
				label: tarea,
				is_done: false
			}),

			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				console.log();
			})
			.then(data => {

				console.log(data);
				obtenerTarea();
			})
			.catch(error => {

				console.log(error);
			});

		setTarea("");
	}

	const borraLista = (id) => {

		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			body: JSON.stringify({
				is_done: true
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {

				if (resp.status === 204) {
					return null;
				}

				return resp.json();
			})
			.then(data => {

				obtenerTarea();
			})
			.catch(error => {

				console.log(error);
			});
	};

	const actualizaTarea = (valorInput) => {

		setTarea(valorInput.target.value)
	}

	return (
		<form
			onSubmit={agregaLista}
			className=" ">
			<div className="card mx-auto">
				<div className="card-body">
					<h1>
						Lista To-Do
					</h1>
					<ul className="list-group list-group-flush">
						<li className="list-group-item d-flex align-items-center justify-content-between">
							<input
								onChange={actualizaTarea}
								value={tarea}
								type="text"
								className="PrimerValor input border-0 shadow-none"
								placeholder="Agrega tu tarea..."
							/>
						</li>
						{lista.length === 0 ? (
							<li className="TareaHTML list-group-item"></li>
						) : (
							lista.map((item) => (
								<li
									key={item.id}
									className="list-group-item d-flex justify-content-between align-items-center"
								>
									{item.label}
									<button
										type="button"
										className="btn-close"
										aria-label="Close"
										onClick={() => borraLista(item.id)}
									></button>
								</li>
							))
						)}
						<div className="card-footer text-body-secondary">
							Tienes {lista.length} por hacer
						</div>
					</ul>
				</div>
			</div>
		</form>
	);
};

export default Home;